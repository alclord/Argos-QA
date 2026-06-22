const path = require('path');
const fs = require('fs');

const ROOT_DIR = path.resolve(__dirname, '..', '..');

function daysAgoISO(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

function startOfDayISO(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().replace(/\.\d{3}Z$/, '+0000');
}

function daysBetween(iso1, iso2) {
  const d1 = new Date(iso1);
  const d2 = new Date(iso2);
  return Math.abs(d2 - d1) / 86400000;
}

function hoursBetween(iso1, iso2) {
  const d1 = new Date(iso1);
  const d2 = new Date(iso2);
  return Math.abs(d2 - d1) / 3600000;
}

function todayISO() {
  return new Date().toISOString();
}

function todayYYYYMMDD() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function yesterdayYYYYMMDD() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function formatDateBR(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch {
    return iso;
  }
}

function formatDateTimeBR(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  } catch {
    return iso;
  }
}

function decodeJql(jql) {
  return encodeURIComponent(jql);
}

function shuffleEntropy(files) {
  let total = 0;
  for (const f of files) total += (f.additions || 0) + (f.deletions || 0);
  if (total === 0) return 0;
  let entropy = 0;
  for (const f of files) {
    const changes = (f.additions || 0) + (f.deletions || 0);
    const p = changes / total;
    if (p > 0) entropy -= p * Math.log2(p);
  }
  return Math.round(entropy * 10) / 10;
}

function decayFactor(ageDays, factors = [1.0, 0.8, 0.6, 0.4]) {
  if (ageDays < 7) return factors[0];
  if (ageDays < 30) return factors[1];
  if (ageDays < 90) return factors[2];
  return factors[3];
}

function median(arr) {
  if (!arr || arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function avg(arr) {
  if (!arr || arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function loadJsonSafe(filePath) {
  try {
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return null;
  }
}

function saveJsonSafe(filePath, data) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (e) {
    console.error(`Erro ao salvar ${filePath}:`, e.message);
    return false;
  }
}

function saveFileSafe(filePath, content) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(filePath, content, 'utf-8');
    return true;
  } catch (e) {
    console.error(`Erro ao salvar ${filePath}:`, e.message);
    return false;
  }
}

module.exports = {
  ROOT_DIR,
  daysAgoISO,
  startOfDayISO,
  daysBetween,
  hoursBetween,
  todayISO,
  todayYYYYMMDD,
  yesterdayYYYYMMDD,
  formatDateBR,
  formatDateTimeBR,
  decodeJql,
  shuffleEntropy,
  decayFactor,
  median,
  avg,
  loadJsonSafe,
  saveJsonSafe,
  saveFileSafe,
};
