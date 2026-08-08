#!/usr/bin/env node
/**
 * Compress everything under public/photos so straight-from-the-phone files
 * don't land in the build at 3-4MB each.
 *
 *   npm run optimize-photos           # rewrite oversized photos in place
 *   npm run optimize-photos -- --dry  # report what would change
 *
 * Safe to re-run: a photo already within its size budget is left alone, and a
 * re-encode that comes out no smaller than the original is discarded.
 */
import { readdir, stat, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const PHOTOS_DIR = 'public/photos';
const DRY_RUN = process.argv.includes('--dry');

// The hero is full-bleed, so it keeps more pixels than the gallery shots.
// Magazine scans keep their resolution entirely — they carry page detail that
// people zoom into in the lightbox — and are only recompressed.
const RULES = [
  { match: (p) => p.endsWith('banner.jpg'), maxDim: 2560, quality: 82 },
  { match: (p) => p.includes(`${path.sep}MXA${path.sep}`), maxDim: Infinity, quality: 85 },
  { match: () => true, maxDim: 2000, quality: 82 },
];

// Below this, re-encoding costs more quality than it saves bytes.
const MIN_BYTES = 300 * 1024;

// A photo that is already within its dimension budget AND this lean per pixel
// has been through here before. Skipping it keeps repeat runs from re-encoding
// the same files and losing a little quality each pass. Straight-from-the-phone
// JPEGs land around 0.45 bytes/px; output of this script lands around 0.22.
const OPTIMIZED_BYTES_PER_PIXEL = 0.3;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

const fmt = (bytes) => `${(bytes / 1048576).toFixed(2)}MB`;

let before = 0;
let after = 0;
let changed = 0;

for await (const file of walk(PHOTOS_DIR)) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue;

  const original = (await stat(file)).size;
  before += original;

  if (original < MIN_BYTES) {
    after += original;
    continue;
  }

  const rule = RULES.find((r) => r.match(file));
  const input = await readFile(file);
  const { width, height } = await sharp(input).metadata();

  const withinMaxDim = Math.max(width, height) <= rule.maxDim;
  if (withinMaxDim && original / (width * height) < OPTIMIZED_BYTES_PER_PIXEL) {
    after += original;
    continue;
  }

  let pipeline = sharp(input).rotate(); // bake in EXIF orientation before resizing
  if (Math.max(width, height) > rule.maxDim) {
    // Constrain both axes rather than picking one from the metadata dimensions:
    // for an EXIF-rotated photo those are the pre-rotation values, so choosing
    // an axis here would constrain the wrong one and leave the photo full size.
    pipeline = pipeline.resize({
      width: rule.maxDim,
      height: rule.maxDim,
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  const output = await pipeline
    .jpeg({ quality: rule.quality, progressive: true, mozjpeg: true })
    .toBuffer();

  // Require a real saving before rewriting. Without this, a file hovering just
  // above the skip threshold gets re-encoded on every run, shaving a sliver of
  // quality each time and never settling.
  if (output.length >= original * 0.9) {
    after += original;
    continue;
  }

  const meta = await sharp(output).metadata();
  console.log(
    `${fmt(original).padStart(7)} -> ${fmt(output.length).padStart(7)}  ` +
      `${meta.width}x${meta.height}  ${path.relative(PHOTOS_DIR, file)}`
  );

  if (!DRY_RUN) await writeFile(file, output);
  after += output.length;
  changed++;
}

console.log(
  `\n${changed} file(s) ${DRY_RUN ? 'would be' : ''} optimized: ` +
    `${fmt(before)} -> ${fmt(after)}${DRY_RUN ? '  (dry run, nothing written)' : ''}`
);
