import * as fs from 'fs';
import * as path from 'path';

function search(dir: string, depth = 0) {
  if (depth > 4) return;
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (file === 'node_modules' || file === '.git' || file === '.next' || file === 'proc' || file === 'sys' || file === 'dev') continue;
      try {
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          search(fullPath, depth + 1);
        } else {
          // Check if file was modified recently or has image-like names
          const ageMinutes = (Date.now() - stat.mtimeMs) / (60 * 1000);
          if (ageMinutes < 15 || file.toLowerCase().includes('png') || file.toLowerCase().includes('jpg') || file.toLowerCase().includes('linkedin') || file.toLowerCase().includes('vhgm')) {
            console.log(`FOUND: ${fullPath} (size: ${stat.size}, modified: ${ageMinutes.toFixed(1)} mins ago)`);
          }
        }
      } catch (e) {}
    }
  } catch (e) {}
}

console.log('Searching recent and match files in / ...');
search('.');
search('/tmp');
search('/home');
search('/workspace');
console.log('Search done.');
