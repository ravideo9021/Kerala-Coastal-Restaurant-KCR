# Kerala Coastal Restaurant (KCR)

Website for **Kerala Coastal Restaurant (KCR)**: authentic Kerala food in
Rajinder Nagar, New Delhi. Seafood, biryanis, parottas, appam and puttu, plus
North Indian and Chinese favourites. Dine-in, takeaway, delivery, parties and
catering.

Built with **Next.js 16** (App Router, static pages) and **React 19**, plain CSS,
and pre-optimised AVIF/WebP images.

**Live:** [kerala-coastal-restaurant.vercel.app](https://kerala-coastal-restaurant.vercel.app)

## What's new in version 2.1: the redesign

- **Header** with the phone number and an **Order online** button, like the
  Flavours of Punjab site; a full-screen menu on phones.
- **Hero**: four signature dishes (Kerala chicken biryani, kizhi parotta, fish
  fry, chilli paneer) as cut-outs over a blurred photo of the same dish, with
  a slowly turning ring of text around the plate, steam, and big Swiggy /
  Zomato buttons. Prev / next / pause controls.
- **New type**: Anek Malayalam (a Kerala type family, condensed) for headings,
  Yellowtail for script accents, Manrope for text. The Malayalam greeting
  (സ്വാഗതം) is set in the same family.
- **About**: the Kerala Coastal mural from the dining room in a gold frame,
  a kizhi parotta and a turning "KCR" seal, instead of the big circle behind
  the photo.
- **Dish cards** with cut-outs (no photo backgrounds), a kasavu stripe and the
  price from the menu file; a teal **biryani band** with every biryani and its
  price.
- **Order online**: order cards for WhatsApp / call, Swiggy and Zomato over an
  interactive **spice lattice** (the "matrix" effect from the old Flavours site,
  now with spice names; move the mouse, click or tap). It can be paused and
  stays still for "reduce motion".
- **Seafood** and **banana-leaf meal** banners with rotating text rings.
- **Menu** as a cream card with a gold **kasavu** border, like a Kerala mundu.
  Categories with one section now fill both columns.
- **Event form** fixed: the boxes no longer overlap on any screen size.
- Kept: the 3D gallery, the culinary journey, the events carousel, the order
  button animation, the ticker and the teal swirl. The "breathing" headings and
  moving borders are replaced by calmer static headings.
- New share image (WhatsApp / Instagram previews) and app icons in the new
  style.

Lighthouse (mobile, simulated slow 4G): **Performance 90–91**, LCP 3.4 s,
Accessibility 100, Best practices 100, SEO 100; page weight about 0.5 MB.
Desktop: 100 / 100 / 100 / 100.

## What's in version 2

**Speed (same look, same animations)**

- Every photo is pre-optimised into responsive **AVIF + WebP** sizes
  (`npm run images`). The photos used to be 2–4 MB PNGs (52 MB in total); a
  phone now downloads 10–80 KB per image, only the sizes it needs. Phones get a
  portrait crop of the storefront for the first hero slide.
- The 3D **gallery** ("A Feast for the Eyes"), the **culinary journey**, the
  **events carousel**, the **order buttons**, the moving borders, the breathing
  headings, the ticker and the teal swirl are all kept — with the same scroll
  choreography and spring settings — but no longer need an animation library
  (about 50 KB less JavaScript), and they only run while on screen.
- The swirling background renders at half resolution, 30 fps, starts after the
  page has loaded and pauses in background tabs (it used to draw ~3 million
  pixels 60 times a second on phones).
- The culinary journey no longer hijacks the mouse wheel or touch scrolling; it
  follows the normal page scroll.
- Fonts are self-hosted and subset (including the ₹ sign); no middleware, no
  runtime image optimiser, no unused libraries (gsap, lenis, framer-motion).

Lighthouse (mobile, simulated slow 4G) before → after: **Performance 39 → 90**,
LCP 190 s → 3.6 s, total blocking time 1,490 ms → 40 ms, page weight 49 MB →
0.6 MB, Accessibility 87 → 100, Best practices 96 → 100. Desktop: Performance 99.

**For guests**

- **Menu** with search (understands "prawns" for *chemmeen*, "fish" for *meen*…),
  Veg / Non-veg filter with **FSSAI-style marks**, and a printable full-menu page
  at `/menu`. Every price on the site comes from one menu file.
- **Order online** on Swiggy or Zomato, call or WhatsApp in one tap (sticky
  action bar on phones).
- **Events & catering** enquiry form that opens WhatsApp with the details filled
  in; banana-leaf meals for groups.
- Opening hours with live **open / closed** status in Indian time, directions,
  and a map that only loads when asked for.
- Reviews link to your real Google, Zomato and Tripadvisor pages.

**Behind the scenes**

- `Restaurant` + `Menu` structured data, sitemap, robots, web app manifest,
  favicon / app icons and a share image for WhatsApp/Instagram links.
- Security headers (CSP, HSTS, frame protection) in `next.config.mjs`; Next.js
  upgraded past the image-optimiser security fix.
- Accessible: one `h1` per page, real headings, skip link, pause control on the
  hero slideshow, keyboard focus styles, WCAG-checked contrast, "reduce motion"
  respected everywhere.

## Editing content

| What | Where |
|---|---|
| Phone, WhatsApp, address, **opening hours**, Swiggy/Zomato/Instagram links | `data/site.js` |
| Menu items, prices, veg / non-veg | `data/menu.js` |
| Guest reviews shown on the site | `data/reviews.js` (real reviews only) |
| Photos | `assets/photos/` then `npm run images` |

Dish cards and price lists (signatures, biryani, seafood) read their prices and
veg/non-veg marks from `data/menu.js`, so a price change is made once.

### Adding or replacing a photo

1. Put the image in `assets/photos/` named like `appam-stew.webp` (PNG/JPG work
   too).
2. Add it to the `IMAGES` list in `scripts/optimize-images.mjs` (`photo`, or
   `cutout` for transparent PNGs; hero backdrops use
   `{ preset: 'backdrop', source: 'dish-photo' }` to make a blurred copy).
3. Run `npm run images`: it writes the responsive files to `public/media/` and
   updates `data/images.json`. Unchanged photos are skipped.
4. Use it: `<Picture name="appam-stew" alt="…" sizes="…" />`.

## Development

```bash
npm install
npm run dev        # http://localhost:4174
npm run lint
npm run build && npm start
```

Requires Node.js 20.9 or newer.

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://www.yourdomain.in`) in your hosting
provider when you move to a custom domain; canonical URLs, the sitemap and
structured data use it.

## Project structure

```
app/
  layout.js          fonts, metadata, structured data, header/footer
  page.js            home page sections
  menu/page.js       full menu page (+ Menu structured data)
  globals.css        design system and all styles
  icon.svg, apple-icon.png, opengraph-image.jpg, manifest.js, robots.js, sitemap.js
components/          one file per section / UI piece (Hero, Gallery, Events…)
data/                site facts, menu, reviews, generated image manifest
lib/                 opening hours, springs for the scroll animations
assets/photos/       high-quality master photos (not served directly)
assets/fonts/        self-hosted font subsets (OFL / Apache 2.0)
scripts/             image pipeline and brand-asset generator
public/media/        generated AVIF/WebP files (content-hashed, cached forever)
```

## Restaurant info

- **Address:** 2/76, Ground Floor, Shankar Road, Opposite BSES Office, Rajinder
  Nagar, New Delhi 110060
- **Phone / WhatsApp:** +91 76330 19866
- **Order online:** [Swiggy](https://www.swiggy.com/menu/750696?source=sharing) ·
  [Zomato](https://zomato.onelink.me/xqzv/0lb6eb63)

## License

All rights reserved. This website and its content are the property of Kerala
Coastal Restaurant (KCR). Fonts are used under the SIL Open Font License and the
Apache License 2.0 (`assets/fonts/`); brand icons are from Simple Icons (CC0).
