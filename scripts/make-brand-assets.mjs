#!/usr/bin/env node
/**
 * One-off generator for the favicon / app icons and the social share image.
 *
 *   node scripts/make-brand-assets.mjs
 *
 * Outputs (committed, so builds don't need to run this):
 *   app/icon.svg, app/apple-icon.png, public/icon-192.png, public/icon-512.png,
 *   public/icon-maskable-512.png, app/opengraph-image.jpg (+ .alt.txt)
 *
 * The share image renders text with the brand fonts, so install Anek
 * Malayalam (condensed ExtraBold), Manrope and Yellowtail locally (Google
 * Fonts) before re-running.
 */
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const out = (p) => path.join(ROOT, p);

const GOLD = `<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="#F7E7A6"/><stop offset=".5" stop-color="#E8C547"/><stop offset="1" stop-color="#B8912A"/>
</linearGradient>`;

// "KCR" in Anek Malayalam ExtraBold Condensed (the site's display face),
// converted to outlines (units: 1/1000 em, baseline at y = 0) so the icon
// never depends on an installed font.
const KCR_PATH =
  'M450 0H286L202 -282H188V-372H202L282 -639H444L336 -325V-360ZM193 0H37V-639H193Z M695 11Q602 11 558 -46Q516 -102 516 -214V-428Q516 -538 560 -594Q605 -650 694 -650Q718 -650 738 -646Q757 -642 772 -636Q786 -630 796 -622L805 -482Q792 -491 777 -497Q762 -503 741 -503Q704 -503 690 -480Q676 -456 676 -414V-224Q676 -184 692 -161Q707 -138 746 -138Q767 -138 782 -144Q798 -150 809 -158L800 -16Q790 -10 774 -4Q758 3 738 7Q718 11 695 11Z M1284 0H1128L1122 -152Q1122 -172 1116 -185Q1111 -198 1100 -204Q1090 -210 1074 -210H1014V-339H1078Q1102 -339 1113 -354Q1124 -369 1124 -406V-438Q1124 -476 1114 -490Q1104 -506 1078 -506H1012V-639H1088Q1188 -639 1234 -594Q1280 -550 1280 -466V-447Q1280 -384 1250 -350Q1220 -318 1160 -316V-293L1128 -314Q1188 -310 1218 -291Q1247 -272 1258 -238Q1269 -204 1272 -156ZM1056 0H902V-639H1056V-300L1056 -235Z';
const KCR_BOX = { x: 37, y: -650, w: 1247.5, h: 661 };

// Gold "KCR" over a double gold kasavu stripe, on the site's dark green-black.
const monogram = ({ radius = 14, scale = 1 } = {}) => {
  const inner = 44 * scale;
  const s = inner / KCR_BOX.w;
  const textH = KCR_BOX.h * s;
  const x = (64 - inner) / 2 - KCR_BOX.x * s;
  const y = 30 - textH / 2 - KCR_BOX.y * s;
  const stripeW = inner * 0.78;
  const sx = (64 - stripeW) / 2;
  const sy = 30 + textH / 2 + 5 * scale;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>${GOLD}</defs>
  <rect width="64" height="64" rx="${radius}" fill="#060D0A"/>
  <path transform="translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${s.toFixed(5)})" fill="url(#g)" d="${KCR_PATH}"/>
  <rect x="${sx.toFixed(2)}" y="${sy.toFixed(2)}" width="${stripeW.toFixed(2)}" height="${(1.2 * scale).toFixed(2)}" fill="#E8C547"/>
  <rect x="${sx.toFixed(2)}" y="${(sy + 2.6 * scale).toFixed(2)}" width="${stripeW.toFixed(2)}" height="${(2.6 * scale).toFixed(2)}" fill="#14A085"/>
</svg>`;
};

async function icons() {
  const svg = monogram();
  await writeFile(out('app/icon.svg'), `${svg}\n`);
  const square = Buffer.from(monogram({ radius: 0 }));
  const maskable = Buffer.from(monogram({ radius: 0, scale: 0.72 }));
  await sharp(square, { density: 600 }).resize(180, 180).png().toFile(out('app/apple-icon.png'));
  await sharp(Buffer.from(svg), { density: 600 }).resize(192, 192).png().toFile(out('public/icon-192.png'));
  await sharp(Buffer.from(svg), { density: 800 }).resize(512, 512).png().toFile(out('public/icon-512.png'));
  await sharp(maskable, { density: 800 }).resize(512, 512).png().toFile(out('public/icon-maskable-512.png'));
}

async function shareImage() {
  const W = 1200;
  const H = 630;
  // Same look as the hero: the dish, cut out, over a blurred photo of itself.
  const background = await sharp(out('assets/photos/kerala-chicken-biryani.webp'))
    .resize(W, H, { fit: 'cover' })
    .blur(18)
    .modulate({ brightness: 0.55 })
    .toBuffer();
  const dish = await sharp(out('assets/photos/kerala-chicken-biryani-cutout.webp')).resize({ width: 560 }).png().toBuffer();
  const { height: dishH } = await sharp(dish).metadata();
  const cx = 890;
  const cy = 315;
  const shade = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="s" x1="0" x2="1"><stop offset="0" stop-color="#060D0A" stop-opacity=".96"/><stop offset=".5" stop-color="#060D0A" stop-opacity=".78"/><stop offset="1" stop-color="#060D0A" stop-opacity=".25"/></linearGradient>
      <radialGradient id="glow"><stop offset="0" stop-color="#F0894A" stop-opacity=".38"/><stop offset=".5" stop-color="#E8C547" stop-opacity=".12"/><stop offset="1" stop-color="#E8C547" stop-opacity="0"/></radialGradient>
      <filter id="blur"><feGaussianBlur stdDeviation="18"/></filter>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#s)"/>
    <circle cx="${cx}" cy="${cy}" r="250" fill="url(#glow)"/>
    <circle cx="${cx}" cy="${cy}" r="272" fill="none" stroke="#E8C547" stroke-opacity=".45" stroke-width="2.5" stroke-dasharray="2 12" stroke-linecap="round"/>
    <ellipse cx="${cx}" cy="${cy + dishH / 2 - 10}" rx="230" ry="30" fill="#000" fill-opacity=".55" filter="url(#blur)"/>
  </svg>`);
  const text = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#D9B23C"/><stop offset=".48" stop-color="#F7E39A"/><stop offset="1" stop-color="#D9B23C"/></linearGradient>
      <linearGradient id="kasavu" x1="0" x2="1"><stop offset="0" stop-color="#A8842A"/><stop offset=".3" stop-color="#F0D67A"/><stop offset=".6" stop-color="#C9A43A"/><stop offset="1" stop-color="#A8842A"/></linearGradient>
    </defs>
    <text x="72" y="118" font-family="Anek Malayalam" font-weight="800" font-stretch="condensed" font-size="23" letter-spacing="4.6" fill="#F2D874">KERALA RESTAURANT · RAJINDER NAGAR, NEW DELHI</text>
    <text x="64" y="292" font-family="Anek Malayalam" font-weight="800" font-stretch="condensed" font-size="210" letter-spacing="6" fill="url(#gold)">KERALA</text>
    <text x="250" y="382" font-family="Yellowtail" font-size="118" fill="#F0EDE3">Coastal</text>
    <rect x="74" y="418" width="340" height="7" fill="url(#kasavu)"/>
    <rect x="74" y="430" width="340" height="2" fill="url(#kasavu)"/>
    <text x="72" y="490" font-family="Anek Malayalam" font-weight="800" font-stretch="condensed" font-size="30" letter-spacing="5" fill="#F0EDE3">SEAFOOD · BIRYANI · PAROTTA · APPAM</text>
    <text x="74" y="545" font-family="Manrope" font-weight="600" font-size="26" fill="#8FAE9F">Order on Swiggy &amp; Zomato · +91 76330 19866</text>
  </svg>`);
  await sharp(background)
    .composite([
      { input: shade },
      { input: dish, left: cx - 280, top: Math.round(cy - dishH / 2) },
      { input: text },
    ])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(out('app/opengraph-image.jpg'));
  await writeFile(
    out('app/opengraph-image.alt.txt'),
    'Kerala Coastal Restaurant, Rajinder Nagar: Kerala chicken biryani on a brass plate',
  );
}

await icons();
await shareImage();
console.log('Brand assets written.');
