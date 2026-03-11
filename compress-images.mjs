/**
 * compress-images.mjs
 * 
 * Converts all .jpg, .jpeg, and .png images in public/images/ to optimised WebP,
 * then updates all .astro files to reference the new .webp filenames.
 * 
 * Usage:
 *   cd ~/Documents/tomallen.com.au
 *   node compress-images.mjs
 */

import { readdir, readFile, writeFile, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import sharp from 'sharp';

const IMAGE_DIR = 'public/images';
const SRC_DIR = 'src';
const QUALITY = 80;
const MAX_WIDTH = 1920;

async function getAllFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getAllFiles(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

async function compressImages() {
  const imageFiles = (await getAllFiles(IMAGE_DIR))
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f));

  if (imageFiles.length === 0) {
    console.log('No .jpg, .jpeg or .png files found in public/images/');
    return [];
  }

  console.log(`Found ${imageFiles.length} images to compress:\n`);

  const renames = [];

  for (const filePath of imageFiles) {
    const ext = extname(filePath);
    const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const originalSize = (await stat(filePath)).size;

    await sharp(filePath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(webpPath);

    const newSize = (await stat(webpPath)).size;
    const savings = ((1 - newSize / originalSize) * 100).toFixed(0);

    console.log(
      `  ${basename(filePath)} → ${basename(webpPath)}` +
      `  (${formatBytes(originalSize)} → ${formatBytes(newSize)}, ${savings}% smaller)`
    );

    renames.push({
      from: filePath.replace('public', ''),
      to: webpPath.replace('public', ''),
    });
  }

  return renames;
}

async function updateAstroFiles(renames) {
  if (renames.length === 0) return;

  const astroFiles = (await getAllFiles(SRC_DIR))
    .filter(f => f.endsWith('.astro'));

  console.log(`\nUpdating ${astroFiles.length} .astro files...\n`);

  for (const file of astroFiles) {
    let content = await readFile(file, 'utf-8');
    let changed = false;

    for (const { from, to } of renames) {
      if (content.includes(from)) {
        content = content.replaceAll(from, to);
        changed = true;
      }
    }

    if (changed) {
      await writeFile(file, content, 'utf-8');
      console.log(`  Updated: ${file}`);
    }
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

async function main() {
  console.log('Compressing images to WebP...\n');

  try {
    const renames = await compressImages();
    await updateAstroFiles(renames);

    console.log('\nDone! You can now:');
    console.log('  1. Check the site looks right: npm run dev');
    console.log('  2. Delete the old .jpg/.png files if you like');
    console.log('  3. Push: git add . && git commit -m "Compress images to WebP" && git push');
  } catch (err) {
    if (err.code === 'ERR_MODULE_NOT_FOUND' || err.message?.includes('sharp')) {
      console.error('\nError: sharp is not installed. Run this first:\n');
      console.error('  npm install sharp --save-dev\n');
    } else {
      throw err;
    }
  }
}

main();
