const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(path.join(__dirname, '../src/app/tools'));

const replacements = [
  { from: /\bbg-\[\#0d1424\]/g, to: 'bg-white' },
  { from: /\bborder-\[\#1e2d4a\]/g, to: 'border-slate-200' },
  { from: /\btext-white\b/g, to: 'text-slate-900' },
  { from: /\btext-gray-400\b/g, to: 'text-slate-600' },
  { from: /\btext-gray-300\b/g, to: 'text-slate-600' },
  { from: /\btext-gray-200\b/g, to: 'text-slate-700' },
  { from: /\bbg-\[\#1e2d4a\]/g, to: 'bg-slate-100' },
  { from: /\bfocus:border-\[\#f59e0b\]/g, to: 'focus:border-blue-600' },
  { from: /\bfocus:border-\[\#3b82f6\]/g, to: 'focus:border-blue-600' },
  { from: /\bbg-\[\#f59e0b\]/g, to: 'bg-blue-600' },
  { from: /\btext-black\b/g, to: 'text-white' },
  { from: /\bbg-gray-800\b/g, to: 'bg-slate-100' },
  { from: /\bbg-gray-900\b/g, to: 'bg-white' },
];

let changedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;

  replacements.forEach(({ from, to }) => {
    newContent = newContent.replace(from, to);
  });

  // Smart revert for primary buttons that use transition-opacity hover:opacity-90
  // since they usually have a colored background (category.color or specific bg)
  newContent = newContent.replace(/text-slate-900 transition-opacity hover:opacity-90/g, 'text-white transition-opacity hover:opacity-90');
  
  // Smart revert for tabs that have text-slate-900 but also bg-blue-600
  // e.g. activeTab === '...' ? 'bg-blue-600 text-slate-900' -> we want text-white
  newContent = newContent.replace(/bg-blue-600 text-slate-900/g, 'bg-blue-600 text-white');
  newContent = newContent.replace(/bg-\[\#f59e0b\] text-slate-900/g, 'bg-blue-600 text-white');

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    changedCount++;
  }
});

console.log(`Migration complete. Changed ${changedCount} files.`);
