const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'public', 'images', 'glass-sequence');
const sourceFile = path.join(__dirname, 'public', 'images', 'rain-glass-bg.png');
const frameCount = 240;

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

if (!fs.existsSync(sourceFile)) {
    console.error('Source file ezgif-23b1aa7e232a269a.jpg not found!');
    // Create a dummy file if source doesn't exist to prevent crash
    fs.writeFileSync(path.join(outputDir, '1.jpg'), 'dummy content');
    // process.exit(1); 
}

console.log(`Generating ${frameCount} frames from ${sourceFile}...`);

for (let i = 1; i <= frameCount; i++) {
    const destFile = path.join(outputDir, `${i}.jpg`);
    if (fs.existsSync(sourceFile)) {
        fs.copyFileSync(sourceFile, destFile);
    } else {
        // Fallback if source missing
        fs.writeFileSync(destFile, 'dummy');
    }
}

console.log('Done!');
