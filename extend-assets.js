const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'images', 'glass-sequence');
const sourceFile = path.join(dir, '150.jpg');

if (!fs.existsSync(sourceFile)) {
    console.error('Source file 150.jpg not found!');
    process.exit(1);
}

console.log('Extending assets from 151 to 180...');

for (let i = 151; i <= 180; i++) {
    const destFile = path.join(dir, `${i}.jpg`);
    fs.copyFileSync(sourceFile, destFile);
}

console.log('Done!');
