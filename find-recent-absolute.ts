import * as fs from 'fs';
import * as path from 'path';

function scanAll(dir: string, depth = 0) {
  if (depth > 5) return;
  try {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      if (['proc', 'sys', 'dev', 'var', 'lib', 'usr', 'etc', 'boot', 'sys'].includes(file)) continue;
      const fullPath = path.join(dir, file);
      try {
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          scanAll(fullPath, depth + 1);
        } else {
          const ageMinutes = (Date.now() - stat.mtimeMs) / (60 * 1000);
          if (ageMinutes < 10) {
            console.log(`RECENT: ${fullPath} (${stat.size} bytes, modified ${ageMinutes.toFixed(1)}m ago)`);
          }
        }
      } catch (e) {}
    }
  } catch (e) {}
}

console.log('Scanning all directories for files modified in last 10m...');
scanAll('/');
console.log('Completed.');
