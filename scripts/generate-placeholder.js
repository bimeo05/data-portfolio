const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Create a profile image placeholder with initials
function generateProfilePlaceholder() {
  const width = 500;
  const height = 600;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#1a1a1c';
  ctx.fillRect(0, 0, width, height);

  // Add some subtle gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#1a1a1c');
  gradient.addColorStop(1, '#28282c');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Add subtle pattern for texture
  ctx.fillStyle = '#222224';
  for (let i = 0; i < 300; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() * 3 + 1;
    ctx.fillRect(x, y, size, size);
  }

  // Initials text
  const initials = 'AP';  // Change to your initials
  
  ctx.font = 'bold 160px Monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Text shadow for depth
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.fillText(initials, width / 2 + 4, height / 2 + 4);
  
  // Main text
  ctx.fillStyle = '#ffffff';
  ctx.fillText(initials, width / 2, height / 2);

  // Draw a subtle border
  ctx.strokeStyle = '#333336';
  ctx.lineWidth = 10;
  ctx.strokeRect(5, 5, width - 10, height - 10);

  // Save the image
  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(publicDir, 'profile.jpg'), buffer);
  
  console.log('Profile placeholder image generated successfully at public/profile.jpg');
}

generateProfilePlaceholder(); 