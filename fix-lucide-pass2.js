const fs = require('fs');
const path = require('path');

function walkSync(dir, filelist = []) {
    fs.readdirSync(dir).forEach(file => {
        const filepath = path.join(dir, file);
        if (fs.statSync(filepath).isDirectory()) {
            filelist = walkSync(filepath, filelist);
        } else {
            filelist.push(filepath);
        }
    });
    return filelist;
}

const tsFiles = walkSync('src/app').filter(f => f.endsWith('.ts'));

let allUsedIcons = new Set();

for (const file of tsFiles) {
    let content = fs.readFileSync(file, 'utf8');

    // Remove .pick({ ... }) from imports arrays
    let pickRegex = /LucideAngularModule\.pick\(\{\s*([\s\S]*?)\s*\}\)/g;
    let match;
    while ((match = pickRegex.exec(content)) !== null) {
        // Find icons used in .pick({ A, B }) or .pick({ Sparkles: LucideIcons.Sparkles })
        const inner = match[1];
        const parts = inner.split(',');
        for (const part of parts) {
            const p = part.trim();
            if (!p) continue;
            if (p.includes(':')) {
                allUsedIcons.add(p.split(':')[0].trim());
            } else {
                allUsedIcons.add(p);
            }
        }
    }
    
    // Replace the pick with just LucideAngularModule
    if (content.includes('LucideAngularModule.pick')) {
        content = content.replace(/LucideAngularModule\.pick\(\{\s*[\s\S]*?\s*\}\)/g, 'LucideAngularModule');
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed imports array in', file);
    }
}

// Now update app.config.ts
const appConfigPath = path.join('src', 'app', 'app.config.ts');
let appConfig = fs.readFileSync(appConfigPath, 'utf8');
const usedIconsArray = Array.from(allUsedIcons);

if (!appConfig.includes('import { LucideAngularModule }')) {
    const iconImports = usedIconsArray.length > 0 ? `, ${usedIconsArray.join(', ')}` : '';
    const importStatement = `import { LucideAngularModule${iconImports} } from 'lucide-angular';\n`;
    
    // Add import statement
    appConfig = importStatement + appConfig;
    
    // Add importProvidersFrom
    const providersInsert = `importProvidersFrom(LucideAngularModule.pick({ ${usedIconsArray.join(', ')} })),`;
    
    // find providers: [
    appConfig = appConfig.replace(/providers:\s*\[/, `providers: [\n    ${providersInsert}`);
    
    fs.writeFileSync(appConfigPath, appConfig, 'utf8');
    console.log('Updated app.config.ts');
}
