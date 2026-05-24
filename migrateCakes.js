const fs = require('fs');
const path = require('path');

const rootCakesDir = path.join(__dirname, 'cakes');
const frontendPublicAssetsDir = path.join(__dirname, 'frontend', 'public');
const newCatalogFile = path.join(__dirname, 'frontend', 'src', 'lib', 'newCakesCatalog.ts');

let allCakes = [];

function parseAndMove(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            parseAndMove(fullPath);
        } else if (file.endsWith('.ts')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            
            // Extract the object data
            const match = content.match(/const\s+\w+\s*=\s*(\{[\s\S]*?\});/);
            if (match) {
                try {
                    let objStr = match[1];
                    let obj;
                    eval('obj = ' + objStr);
                    
                    if (obj && obj.image) {
                        allCakes.push(obj);
                        
                        // Move the image
                        const pngFile = fullPath.replace(/\.ts$/, '.png');
                        if (fs.existsSync(pngFile)) {
                            // obj.image starts with /assets/... we remove the leading slash so path.join works correctly
                            const destPath = path.join(frontendPublicAssetsDir, obj.image.replace(/^\//, ''));
                            const destDir = path.dirname(destPath);
                            
                            if (!fs.existsSync(destDir)) {
                                fs.mkdirSync(destDir, { recursive: true });
                            }
                            
                            // Copy the file
                            fs.copyFileSync(pngFile, destPath);
                            console.log(`Copied ${file.replace('.ts', '.png')} to ${obj.image}`);
                        } else {
                            console.log(`Warning: Image not found for ${file}: ${pngFile}`);
                        }
                    }
                } catch(e) {
                    console.log(`Failed to parse ${file}: ${e.message}`);
                }
            }
        }
    }
}

console.log("Starting migration...");
parseAndMove(rootCakesDir);

// Sort by ID
allCakes.sort((a, b) => a.id - b.id);

const outputTS = `export interface NewCake {
  id: number;
  slug: string;
  name: string;
  category: string;
  image: string;
  price: number;
  baseWeight?: string;
  shortDescription?: string;
  description: string;
  flavorProfile?: string;
  includes?: string[];
  customizable?: boolean;
  egglessAvailable?: boolean;
  featured?: boolean;
}

export const NEW_CAKE_CATALOG: NewCake[] = ${JSON.stringify(allCakes, null, 2)};
`;

fs.writeFileSync(newCatalogFile, outputTS);
console.log(`Successfully generated catalog with ${allCakes.length} cakes at ${newCatalogFile}.`);
