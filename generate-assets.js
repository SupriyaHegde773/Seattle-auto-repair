const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const outputDir = path.join(__dirname, 'public', 'images', 'glass-sequence');
const frameCount = 180;

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const width = 1920;
const height = 1080;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

console.log(`Generating ${frameCount} frames...`);

for (let i = 1; i <= frameCount; i++) {
    // Clear background
    ctx.fillStyle = '#f0f9ff'; // Light blueish white
    ctx.fillRect(0, 0, width, height);

    // Draw a "crack" that heals
    const progress = (i - 1) / (frameCount - 1);
    const healFactor = Math.max(0, (progress - 0.2) / 0.6); // Heal from 20% to 80%

    // Draw crack
    ctx.strokeStyle = `rgba(0, 0, 0, ${1 - healFactor})`;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 100, height / 2 - 50);
    ctx.lineTo(width / 2, height / 2);
    ctx.lineTo(width / 2 + 80, height / 2 - 80);
    ctx.lineTo(width / 2 + 20, height / 2 + 100);
    ctx.stroke();

    // Draw "resin" filling
    if (progress > 0.1) {
        ctx.fillStyle = `rgba(59, 130, 246, ${Math.min(0.5, progress)})`; // Blue resin
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, 100 * progress, 0, Math.PI * 2);
        ctx.fill();
    }

    // Save
    const buffer = canvas.toBuffer('image/jpeg');
    fs.writeFileSync(path.join(outputDir, `${i}.jpg`), buffer);

    if (i % 10 === 0) process.stdout.write('.');
}

console.log('\nDone!');
