const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const failures = [];

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}

const data = read('src/lib/tools-data.ts');
const qualitySrc = read('src/lib/tool-quality.ts');
const layout = read('src/components/ui/CalculatorLayout.tsx');
const rootLayout = read('src/app/layout.tsx');
const privacy = read('src/app/privacy/page.tsx');
const terms = read('src/app/terms/page.tsx');
const parentalMeta = read('src/app/tools/labor/parental-leave/layout.tsx');

const toolIds = [...data.matchAll(/^\s+id: "([^"]+)"/gm)].map((m) => m[1]);
if (toolIds.length !== 55) failures.push(`expected 55 tools, found ${toolIds.length}`);

if (data.includes('<strong>4. 실무 활용 예시</strong>')) {
  failures.push('copied guide tails (section 4-6) are still in tools-data.ts');
}
if (data.includes('상한 월 150만') || data.includes('사후지급금(25%)')) {
  failures.push('stale parental-leave 150만/사후지급금 copy remains in tools-data.ts');
}
if (data.includes('2025년 최저임금은 시간급 10,030') || data.includes('코스피 0.03%') || data.includes('건강보험 3.545%')) {
  failures.push('stale 2024/2025 rate copy remains in tools-data.ts');
}
if (qualitySrc.includes('2024년 기준 코스피 0.03') || qualitySrc.includes('시간급 10,030원입니다')) {
  failures.push('stale rate copy remains in tool-quality.ts');
}
if (parentalMeta.includes('상한 월 150만') || parentalMeta.includes('사후지급금(25%)')) {
  failures.push('parental-leave metadata still describes the old 150만/25% rule');
}
const maternityMeta = read('src/app/tools/labor/maternity-leave/layout.tsx');
if (maternityMeta.includes('월 210만 원')) {
  failures.push('maternity-leave metadata still says 210만 while code uses 220만');
}
const securitiesMeta = read('src/app/tools/tax/securities-tax/layout.tsx');
if (securitiesMeta.includes('코스피 0.03%')) {
  failures.push('securities-tax metadata still uses 2024 rates');
}
if (rootLayout.includes('/og-image.png')) {
  failures.push('root layout still points OG image at missing /og-image.png');
}
if (!privacy.includes("canonical: 'https://law-calc.kr/privacy'")) {
  failures.push('privacy page is missing self-canonical');
}
if (!terms.includes("canonical: 'https://law-calc.kr/terms'")) {
  failures.push('terms page is missing self-canonical');
}
if (privacy.includes('어떠한 개인정보도 제3자에게 제공하거나 위탁하지 않습니다')) {
  failures.push('privacy still claims no third-party processing despite AdSense/Analytics');
}
if (!layout.includes('TOOL_QUALITY') || layout.includes('qualityContexts')) {
  failures.push('CalculatorLayout is not rendering per-tool quality blocks');
}

const runnable = qualitySrc
  .replace(/export interface[\s\S]*?\n}\n/g, '')
  .replace('export const TOOL_QUALITY: Record<string, ToolQuality> =', 'const TOOL_QUALITY =');
const sandbox = { TOOL_QUALITY: null };
vm.runInNewContext(`${runnable}\nthis.TOOL_QUALITY = TOOL_QUALITY;`, sandbox);
const TOOL_QUALITY = sandbox.TOOL_QUALITY;
if (!TOOL_QUALITY || typeof TOOL_QUALITY !== 'object') {
  failures.push('failed to parse TOOL_QUALITY');
}

const formulas = new Set();
for (const id of toolIds) {
  const q = TOOL_QUALITY?.[id];
  if (!q) {
    failures.push(`missing quality block for ${id}`);
    continue;
  }
  if (!q.formula || q.formula.length < 40) failures.push(`${id}: formula too short`);
  if (!Array.isArray(q.examples) || q.examples.length < 2) failures.push(`${id}: need 2 examples`);
  if ((q.examples || []).some((ex) => !ex.title || !ex.setup || !ex.result)) {
    failures.push(`${id}: incomplete example`);
  }
  if (!Array.isArray(q.sources) || q.sources.length < 1) failures.push(`${id}: missing official source`);
  if ((q.sources || []).some((s) => !/^https?:\/\//.test(s.url))) {
    failures.push(`${id}: source URL is not http(s)`);
  }
  if (!Array.isArray(q.limits) || q.limits.length < 1) failures.push(`${id}: missing limits`);
  if (!q.reviewedAt) failures.push(`${id}: missing reviewedAt`);
  if (formulas.has(q.formula)) failures.push(`${id}: formula duplicates another tool`);
  formulas.add(q.formula);
}

if (failures.length) {
  console.error('AdSense content quality verification failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `AdSense content quality verification passed: ${toolIds.length} unique calculator blocks, self-canonical privacy/terms, no copied tails.`,
);
