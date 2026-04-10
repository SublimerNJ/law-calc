const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function runVerification() {
  const toolsDir = path.join(process.cwd(), 'src/app/tools');
  const actionDataPath = path.join(process.cwd(), 'src/lib/action-data.ts');
  
  const actionDataContent = fs.readFileSync(actionDataPath, 'utf-8');
  
  const keysMatch = [...actionDataContent.matchAll(/^\s*'([a-z0-9-]+)':\s*\{/gm)];
  const validKeys = new Set(keysMatch.map(m => m[1]));
  
  const results = {
    total: 0,
    missingComponent: [],
    missingDataKey: [],
    success: 0
  };

  walkDir(toolsDir, (filePath) => {
    if (!filePath.endsWith('page.tsx')) return;
    if (filePath.includes('[category]') || filePath.includes('[tool]')) return;

    results.total++;
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Normalize path separators to handle Windows/Unix
    const normalizedPath = filePath.replace(/\\/g, '/');
    const parts = normalizedPath.split('/');
    const toolId = parts[parts.length - 2];

    const hasComponent = /<ActionInsight/.test(content);
    const hasData = validKeys.has(toolId);

    if (!hasComponent) {
      results.missingComponent.push(toolId);
    }
    if (!hasData) {
      results.missingDataKey.push(toolId);
    }
    if (hasComponent && hasData) {
      results.success++;
    }
  });

  console.log(`Verification Results:`);
  console.log(`Total Calculators Checked: ${results.total}`);
  console.log(`Success: ${results.success}`);
  
  if (results.missingComponent.length > 0) {
    console.log(`\n❌ Missing <ActionInsight> component in:`);
    results.missingComponent.forEach(t => console.log(`  - ${t}`));
  }
  
  if (results.missingDataKey.length > 0) {
    console.log(`\n❌ Missing data key in action-data.ts for:`);
    results.missingDataKey.forEach(t => console.log(`  - ${t}`));
  }
  
  if (results.missingComponent.length === 0 && results.missingDataKey.length === 0) {
    console.log(`\n✅ All ${results.total} calculators have ActionInsight successfully integrated!`);
    process.exit(0);
  } else {
    console.log(`\n⚠️ Verification failed for some calculators.`);
    process.exit(1);
  }
}

runVerification();
