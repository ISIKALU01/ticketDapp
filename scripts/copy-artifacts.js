const fs = require('fs');
const path = require('path');

// Create public/contracts directory if it doesn't exist
const publicContractsDir = path.join(__dirname, '../public/contracts');
if (!fs.existsSync(publicContractsDir)) {
  fs.mkdirSync(publicContractsDir, { recursive: true });
}

// Copy all JSON artifacts
const artifactsDir = path.join(__dirname, '../artifacts/contracts');
const artifactFiles = [];

function findArtifactFiles(dir) {
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      findArtifactFiles(fullPath);
    } else if (item.endsWith('.json')) {
      artifactFiles.push(fullPath);
    }
  });
}

findArtifactFiles(artifactsDir);

artifactFiles.forEach(file => {
  const dest = path.join(publicContractsDir, path.basename(file));
  fs.copyFileSync(file, dest);
  console.log(`Copied: ${file} → ${dest}`);
});

console.log('Artifacts copied successfully!');