# Argos QA - Monitor de Performance em Tempo Real
# Uso: .\tests\k6\run-monitor.ps1

$ErrorActionPreference = 'Stop'
$env:PATH = [System.Environment]::GetEnvironmentVariable("PATH","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH","User")

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$root      = Resolve-Path (Join-Path $scriptDir "../../")
$envFile   = Join-Path $root ".env"

Write-Host ""
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "   Argos QA - Monitor de Performance            " -ForegroundColor Cyan
Write-Host "   Dashboard -> http://localhost:8080           " -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Le variaveis do .env
$envVars = @{}
if (Test-Path $envFile) {
  Get-Content $envFile | ForEach-Object {
    if ($_ -match '^([A-Z_][A-Z0-9_]*)=(.*)$') {
      $envVars[$Matches[1]] = $Matches[2].Trim()
    }
  }
}

# 2. Resolve token
$token       = $envVars['K6_MONITOR_TOKEN']
$accountUuid = if ($envVars['K6_ACCOUNT_UUID']) { $envVars['K6_ACCOUNT_UUID'] } else { '9b8af98e-0407-49a2-bce9-3620f29c513a' }

if ($token) {
  Write-Host "[1/4] Token carregado do .env (longa duracao)" -ForegroundColor Green
} else {
  Write-Host "[1/4] K6_MONITOR_TOKEN ausente - buscando token fresco..." -ForegroundColor Yellow
  $tokenScript = Join-Path $scriptDir "get-token.mjs"
  $token = node $tokenScript 2>&1
  if ($LASTEXITCODE -ne 0 -or -not $token) {
    Write-Host "ERRO ao obter token: $token" -ForegroundColor Red
    exit 1
  }
  $accountUuid = '9b8af98e-73f4-4fe9-b33b-7aa47b0369bf'
  Write-Host "  Token obtido: $($token.Substring(0,20))..." -ForegroundColor Green
}

# 3. Inicia k6 em background com REST API
Write-Host ""
Write-Host "[2/4] Iniciando k6 (REST API em 127.0.0.1:6565)..." -ForegroundColor Yellow

# Limpa arquivo de amostras ao vivo da sessão anterior
$liveFile = Join-Path $scriptDir "live.jsonl"
if (Test-Path $liveFile) { Remove-Item $liveFile -Force }

$k6Script = Join-Path $scriptDir "monitor.js"
$k6Args = @(
  "-a", "127.0.0.1:6565",
  "run",
  "--out", "json=$liveFile",
  "-e", "BEARER_TOKEN=$token",
  "-e", "API_URL=https://foundation-api.poli.digital",
  "-e", "ACCOUNT_UUID=$accountUuid",
  "-e", "CHAT_UUID=5c12ea50-1bdd-11f1-a609-021f6d257969",
  $k6Script
)

$k6Process = Start-Process -FilePath "k6" -ArgumentList $k6Args -PassThru -NoNewWindow

Write-Host "  Aguardando k6 iniciar..." -ForegroundColor Gray
$ready = $false
for ($i = 0; $i -lt 15; $i++) {
  Start-Sleep -Seconds 1
  try {
    $null = Invoke-RestMethod "http://127.0.0.1:6565/v1/status" -TimeoutSec 1 -ErrorAction Stop
    $ready = $true
    break
  } catch { }
}

if (-not $ready) {
  Write-Host "AVISO: k6 demorou para iniciar. O dashboard pode mostrar erro por alguns segundos." -ForegroundColor Yellow
}

# 4. Inicia dashboard server
Write-Host "[3/4] Iniciando dashboard em localhost:8080..." -ForegroundColor Yellow
$serverScript = Join-Path $scriptDir "monitor-server.mjs"
$srvProcess   = Start-Process -FilePath "node" -ArgumentList $serverScript -PassThru -NoNewWindow

Start-Sleep -Seconds 2

# 5. Abre browser
Write-Host "[4/4] Abrindo browser em http://localhost:8080 ..." -ForegroundColor Yellow
Start-Process "http://localhost:8080"

# 6. Aguarda Ctrl+C
Write-Host ""
Write-Host "Monitor rodando. Ctrl+C para parar." -ForegroundColor Green
Write-Host "  k6 PID     : $($k6Process.Id)" -ForegroundColor Gray
Write-Host "  Server PID : $($srvProcess.Id)" -ForegroundColor Gray
Write-Host ""

try {
  $k6Process.WaitForExit()
} finally {
  Write-Host ""
  Write-Host "Encerrando processos..." -ForegroundColor Yellow
  if (-not $srvProcess.HasExited) { Stop-Process -Id $srvProcess.Id -Force -ErrorAction SilentlyContinue }
  if (-not $k6Process.HasExited)  { Stop-Process -Id $k6Process.Id  -Force -ErrorAction SilentlyContinue }
  Write-Host "Monitor encerrado." -ForegroundColor Green
}
