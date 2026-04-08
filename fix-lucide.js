const fs = require('fs');
const glob = require('glob');

async function fixLucide() {
    // We need to use glob locally if we installed it, or a simple recursive readdir
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

    const files = walkSync('src/app');

    const tsFiles = files.filter(f => f.endsWith('.ts'));
    const htmlFiles = files.filter(f => f.endsWith('.html'));

    for (const file of tsFiles) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Match import { A, B } from 'lucide-angular';
        const lucideImportRegex = /import\s+\{([^}]+)\}\s+from\s+'lucide-angular';/g;
        let match = lucideImportRegex.exec(content);
        if (match) {
            const icons = match[1].split(',').map(s => s.trim()).filter(Boolean);
            
            // replace import
            content = content.replace(lucideImportRegex, `import { LucideAngularModule, ${icons.join(', ')} } from 'lucide-angular';`);

            // replace in imports array
            // Find imports: [...]
            const importsArrayRegex = /imports\s*:\s*\[([\s\S]*?)\]/;
            const importsMatch = importsArrayRegex.exec(content);
            if (importsMatch) {
                let importsContent = importsMatch[1];
                let modifiedImports = importsContent;
                
                // remove standalone icon imports
                for (const icon of icons) {
                    const regex = new RegExp(`\\b${icon}\\b\\s*,?`, 'g');
                    modifiedImports = modifiedImports.replace(regex, '');
                }
                
                // add LucideAngularModule.pick({ ... })
                if (!modifiedImports.includes('LucideAngularModule.pick')) {
                    // avoid trailing commas issue
                    modifiedImports = modifiedImports.replace(/,\s*$/, '') + `, LucideAngularModule.pick({ ${icons.join(', ')} })`;
                }

                content = content.replace(importsArrayRegex, `imports: [${modifiedImports}]`);
            }

            fs.writeFileSync(file, content, 'utf8');
            console.log('Fixed imports in', file);
        }
        
        // Handle star import
        if (content.includes("import * as LucideIcons from 'lucide-angular';")) {
            content = content.replace("import * as LucideIcons from 'lucide-angular';", "import { LucideAngularModule, icons as LucideIconsMap } from 'lucide-angular';\nimport * as LucideIcons from 'lucide-angular';");
            
            const importsArrayRegex = /imports\s*:\s*\[([\s\S]*?)\]/;
            const importsMatch = importsArrayRegex.exec(content);
            if (importsMatch && !importsMatch[1].includes('LucideAngularModule.pick')) {
                // In services.component.ts it provides a big list of features
                // Wait, I will just pick everything
            }
        }
    }

    for (const file of htmlFiles) {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;

        // Replace <IconName /> with <lucide-icon name="icon-name"></lucide-icon>
        // Typical: <Sun *ngIf="..." class="..." />
        // Or <lucide-sparkles ... />
        
        // 1. Replace <lucide-xxx ... /> -> <lucide-icon name="xxx" ...></lucide-icon>
        content = content.replace(/<lucide-([a-zA-Z-]+)(\s[^>]*)?\/>/g, '<lucide-icon name="$1"$2></lucide-icon>');
        content = content.replace(/<lucide-([a-zA-Z-]+)(\s[^>]*)?>/g, '<lucide-icon name="$1"$2></lucide-icon>');

        // 2. Replace <IconName class=".."/> with <lucide-icon name="icon-name" class=".."></lucide-icon>
        // Let's manually map the known capital icons:
        const knownIcons = ['Sun', 'Moon', 'Menu', 'X', 'Mail', 'Phone', 'MapPin', 'Facebook', 'Instagram', 'Twitter', 'Linkedin', 'ArrowDown', 'Calendar', 'Clock', 'User', 'FileText', 'Sparkles', 'Heart', 'Award', 'Check', 'ChevronRight', 'Star', 'Crown', 'Gem', 'Shield'];
        
        for (const icon of knownIcons) {
            const kebabName = icon.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
            const regex1 = new RegExp(`<${icon}(\\s[^>]*)?\\/>`, 'g');
            content = content.replace(regex1, `<lucide-icon name="${kebabName}"$1></lucide-icon>`);
            
            const regex2 = new RegExp(`<${icon}([\\s>])`, 'g');
            // This is harder if it's not self closing. But the AI usually auto-closes it.
        }

        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed tags in', file);
    }
}

fixLucide().catch(console.error);
