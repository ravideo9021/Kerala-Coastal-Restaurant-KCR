#!/usr/bin/env node
/**
 * Image pipeline for the site.
 *
 *   npm run images
 *
 * Reads the high-quality masters in `assets/photos/` and writes small,
 * responsive AVIF + WebP files to `public/media/`, plus a manifest in
 * `data/images.json` that the <Picture> component uses to build srcsets.
 *
 * Everything is generated ahead of time and served as plain static files, so
 * the site never depends on a runtime image optimiser (no per-image quota,
 * no cold-start resizing, works on any host).
 *
 * To add a photo: drop a PNG/JPG/WebP into assets/photos/, give it a preset in
 * IMAGES below, run `npm run images`, then use <Picture name="your-slug" />.
 */
import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile, mkdir, unlink } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SRC_DIR = path.join(ROOT, 'assets/photos');
const OUT_DIR = path.join(ROOT, 'public/media');
const MANIFEST = path.join(ROOT, 'data/images.json');

// Quality values were checked by eye on zoomed crops: at these settings the
// spice texture and herb detail survive, and the files are 20-50x smaller than
// the original PNGs. `alpha` is the WebP transparency quality.
const PRESETS = {
  // Photos are used everywhere from full-screen hero slides down to the small
  // gallery and journey cards, so they get a wide range of widths.
  photo: { widths: [320, 480, 640, 960, 1280, 1600, 1920], avif: 52, webp: 70 },
  // Transparent food cut-outs.
  cutout: { widths: [320, 480, 640, 960, 1280], avif: 60, webp: 78, alpha: 80 },
};

// Large variants are seen at a lower pixel density (full-screen hero slides,
// mostly under a dark overlay), so they take a slightly lower quality; side by
// side at 100% the difference is not visible, and they are ~30% smaller.
const QUALITY_STEP = [
  [960, -8],
  [640, -3],
];
const qualityFor = (base, width) => base + (QUALITY_STEP.find(([min]) => width >= min)?.[1] ?? 0);
const PIPELINE_VERSION = 2;

const IMAGES = {
  // The restaurant
  storefront: 'photo',
  // Portrait crop of the storefront for phones (hero slide one): phones only
  // ever show this part of the wide photo, so they download half the bytes.
  'storefront-portrait': 'photo',
  interior: 'photo',
  'banana-leaf-meal': 'photo',
  'kitty-party': 'photo',

  // Dishes
  'kizhi-parotta': 'photo',
  'kizhi-parcel': 'cutout',
  'kerala-chicken-biryani': 'photo',
  'chilli-chicken': 'photo',
  'chilli-fish': 'photo',
  'chicken-curry': 'photo',
  'naan-basket': 'photo',
  'paneer-tikka': 'photo',
  'chilli-paneer': 'photo',
  'chicken-fried-rice': 'photo',
  falooda: 'photo',
  'gobi-matar': 'photo',
};

const GENERATED = /^[a-z0-9-]+\.[0-9a-f]{8}-\d+\.(avif|webp)$/;

async function build() {
  await mkdir(OUT_DIR, { recursive: true });
  const sources = new Map();
  for (const file of await readdir(SRC_DIR)) {
    if (/\.(png|jpe?g|webp|avif)$/i.test(file)) sources.set(file.replace(/\.[^.]+$/, ''), file);
  }

  const manifest = {};
  const keep = new Set();
  const existing = new Set(await readdir(OUT_DIR));

  for (const [slug, presetName] of Object.entries(IMAGES)) {
    const file = sources.get(slug);
    if (!file) throw new Error(`Missing master for "${slug}" in assets/photos/`);
    const preset = PRESETS[presetName];
    const input = await readFile(path.join(SRC_DIR, file));
    const meta = await sharp(input).metadata();
    const { isOpaque } = await sharp(input).stats();
    const hash = createHash('sha1')
      .update(input)
      .update(JSON.stringify({ preset, QUALITY_STEP, PIPELINE_VERSION }))
      .digest('hex')
      .slice(0, 8);

    // Never upscale: keep widths the master can actually fill, and always
    // include the master's own width if it is smaller than the largest preset.
    let widths = preset.widths.filter((w) => w <= meta.width);
    if (!widths.length || (widths.at(-1) < meta.width && meta.width < preset.widths.at(-1))) {
      widths = [...widths, meta.width];
    }

    for (const w of widths) {
      const name = `${slug}.${hash}-${w}`;
      keep.add(`${name}.avif`).add(`${name}.webp`);
      // Skip work when this exact master + preset was already encoded.
      if (existing.has(`${name}.avif`) && existing.has(`${name}.webp`)) continue;
      const resized = sharp(input).resize({ width: w, withoutEnlargement: true });
      const base = path.join(OUT_DIR, name);
      await resized.clone().avif({ quality: qualityFor(preset.avif, w), effort: 4 }).toFile(`${base}.avif`);
      await resized
        .clone()
        .webp({
          quality: qualityFor(preset.webp, w),
          alphaQuality: preset.alpha ?? 100,
          effort: 5,
          smartSubsample: true,
        })
        .toFile(`${base}.webp`);
    }

    const entry = { w: meta.width, h: meta.height, hash, widths, alpha: !isOpaque };
    if (isOpaque) {
      // Tiny blurred preview shown while the real image loads.
      const tiny = await sharp(input).resize({ width: 20 }).webp({ quality: 40 }).toBuffer();
      entry.blur = `data:image/webp;base64,${tiny.toString('base64')}`;
    }
    manifest[slug] = entry;
    console.log(`${slug.padEnd(24)} ${presetName.padEnd(8)} ${widths.join(', ')}`);
  }

  // Remove variants that are no longer referenced.
  for (const file of await readdir(OUT_DIR)) {
    if (GENERATED.test(file) && !keep.has(file)) await unlink(path.join(OUT_DIR, file));
  }

  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`\nWrote ${keep.size} files and data/images.json`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
