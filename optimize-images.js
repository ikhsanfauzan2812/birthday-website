import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imagesDir = 'src/assets/images';

async function optimizeAll() {
  const files = fs.readdirSync(imagesDir);
  console.log('Optimizing all 10 images...');

  const filesToDelete = [];

  for (const file of files) {
    if (file.endsWith('.webp')) continue;

    const filePath = path.join(imagesDir, file);
    const stat = fs.statSync(filePath);
    const sizeBeforeMB = (stat.size / (1024 * 1024)).toFixed(2);

    const ext = path.extname(file);
    const baseName = path.basename(file, ext);
    const webpFile = path.join(imagesDir, `${baseName}.webp`);

    await sharp(filePath)
      .resize({ width: 1080, height: 1440, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(webpFile);

    const statAfter = fs.statSync(webpFile);
    const sizeAfterMB = (statAfter.size / (1024 * 1024)).toFixed(2);

    console.log(`✓ ${baseName}: ${sizeBeforeMB} MB -> ${sizeAfterMB} MB`);
    filesToDelete.push(filePath);
  }

  console.log('Done optimizing!');
}

optimizeAll().catch(err => {
  console.error(err);
  process.exit(1);
});
