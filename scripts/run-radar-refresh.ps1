# Argos Radar — Atualiza cache de dados (Jira + GitHub)
# Uso: .\scripts\run-radar-refresh.ps1 [DAYS=14]
#
# Requer no .env:
#   JIRA_EMAIL=seu@email.com
#   JIRA_API_TOKEN=<token de https://id.atlassian.com/manage-profile/security/api-tokens>
#   GH_TOKEN=<github token>

param([int]$Days = 14)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)

node "$root\scripts\refresh-radar.mjs" $Days
