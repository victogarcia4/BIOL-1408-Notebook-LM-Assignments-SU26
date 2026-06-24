import * as fs from 'fs';
import * as path from 'path';

function search(dir: string, depth = 0) {
  if (depth > 6) return;
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      try {
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          if (file !== 'node_modules' && file !== '.git' && file !== '.next' && file !== 'dist') {
            search(fullPath, depth + 1);
          }
        } else {
          const ext = path.extname(file).toLowerCase();
          const name = file.toLowerCase();
          if (['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
            const ageMins = (Date.now() - stat.mtimeMs) / (60 * 1000);
            console.log(`FOUND IMAGE: ${fullPath} (size: ${stat.size} bytes, modified: ${ageMins.toFixed(1)} mins ago)`);
          }
        }
      } catch (e) {}
    }
  } catch (e) {}
}

console.log('Searching for images...');
search('.');
search('/tmp');
console.log('Search completed.');
