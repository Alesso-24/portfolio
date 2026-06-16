import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dir = path.resolve('public/images');
const files = fs.readdirSync(dir).filter(f => /\.(jpe?g|png)$/i.test(f));

const MAX_WIDTH = 1920;

for (const file of files) {
  const full = path.join(dir, file);
  const meta = await sharp(full).metadata();
  const outName = file.replace(/\.(jpe?g|png)$/i, '.webp');
  const outPath = path.join(dir, outName);
  const beforeSize = fs.statSync(full).size;

  let pipeline = sharp(full);
  if (meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH });
  }
  await pipeline.webp({ quality: 82 }).toFile(outPath);

  const afterSize = fs.statSync(outPath).size;
  console.log(`${file} (${meta.width}x${meta.height}, ${(beforeSize/1024).toFixed(0)}KB) -> ${outName} (${(afterSize/1024).toFixed(0)}KB)`);
}
