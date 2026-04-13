const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        fs.statSync(dirPath).isDirectory() ? walkDir(dirPath, callback) : callback(dirPath);
    });
}

function processFile(filePath) {
    if (!filePath.endsWith('.tsx')) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    let lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
        // 1. Add ARIA labels
        if (lines[i].includes('<button') && !lines[i].includes('aria-label') && !lines[i].includes('aria-hidden')) {
            lines[i] = lines[i].replace('<button', '<button aria-label="Action button"');
        }
        if (lines[i].includes('<Link') && !lines[i].includes('aria-label') && !lines[i].includes('aria-hidden')) {
            lines[i] = lines[i].replace('<Link', '<Link aria-label="Navigation link"');
        }
        if (lines[i].includes('<a ') && !lines[i].includes('aria-label') && !lines[i].includes('aria-hidden')) {
            lines[i] = lines[i].replace('<a ', '<a aria-label="Link" ');
        }
        
        // 2. Add classes safely
        if (lines[i].includes('className=')) {
            // Regex to match className="...", className={'...'}, or className={`...`}
            lines[i] = lines[i].replace(/className=(["']|{["'`])(.*?)(\1|["'`]})/g, (m, q1, cls, q2) => {
                let c = cls;
                
                // For interactive elements
                if (lines[i].includes('<button') || lines[i].includes('<Link') || lines[i].includes('<a ')) {
                    if (!c.includes('cursor-pointer')) c += ' cursor-pointer';
                    if (!c.includes('focus:outline-none')) c += ' focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2';
                    if (!c.includes('min-h-') && !c.includes('p-')) c += ' min-h-[44px] min-w-[44px]';
                }
                
                // For cards/panels (glassmorphism)
                if ((c.includes('bg-white') || c.includes('bg-surface-') || c.includes('bg-slate-')) && 
                    !c.includes('glass-panel') && c.includes('rounded')) {
                    c += ' glassmorphism glass-panel';
                }
                return `className=${q1}${c}${q2}`;
            });
        }
    }
    
    content = lines.join('\n');
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed', filePath);
    }
}

['src/app', 'src/components'].forEach(dir => {
    let p = path.join('/Volumes/NJ SSD 4T/Coding/loop creation 2', dir);
    if (fs.existsSync(p)) {
        walkDir(p, processFile);
    }
});
