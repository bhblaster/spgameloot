import fs from 'fs';
import path from 'path';

const outDir = 'C:\\Users\\Sharif\\.gemini\\antigravity\\scratch\\spgameloot\\out';
const maxCharsPerBatch = 20000;

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, file));
    }
  });

  return arrayOfFiles;
}

const allFiles = getAllFiles(outDir);
const textFiles = [];

for (const file of allFiles) {
  const ext = path.extname(file).toLowerCase();
  const relPath = path.relative(outDir, file).replace(/\\/g, '/');
  
  if (['.woff2', '.ico', '.png', '.jpg', '.jpeg', '.gif', '.txt'].includes(ext)) {
    continue;
  }
  
  const content = fs.readFileSync(file, 'utf8');
  textFiles.push({ path: relPath, content: content });
}

// Priority sorting
textFiles.sort((a, b) => {
  const getPriority = (p) => {
    if (p === '.nojekyll' || p === 'index.html' || p === '404.html') return 0;
    if (p.endsWith('.html') && !p.includes('/')) return 1;
    if (p.endsWith('.html')) return 2;
    return 3;
  };
  return getPriority(a.path) - getPriority(b.path);
});

let batchId = 1;
let currentBatch = [];
let currentBatchChars = 0;

for (const file of textFiles) {
  // If a single file is larger than the limit, we have to put it in its own batch
  // But to be safe, we'll try to just group them
  const fileChars = file.content.length;
  
  if (currentBatchChars + fileChars > maxCharsPerBatch && currentBatch.length > 0) {
    fs.writeFileSync(`batch_${batchId}.json`, JSON.stringify(currentBatch));
    console.log(`Created batch_${batchId}.json with ${currentBatch.length} files, length: ${currentBatchChars}`);
    batchId++;
    currentBatch = [];
    currentBatchChars = 0;
  }
  
  currentBatch.push(file);
  currentBatchChars += fileChars;
}

if (currentBatch.length > 0) {
  fs.writeFileSync(`batch_${batchId}.json`, JSON.stringify(currentBatch));
  console.log(`Created batch_${batchId}.json with ${currentBatch.length} files, length: ${currentBatchChars}`);
}

console.log(`Total batches: ${batchId}`);
