# Kerala Coastal Restaurant (KCR)

Official website for Kerala Coastal Restaurant (KCR) — serving authentic Kerala cuisine in Rajinder Nagar, New Delhi.

**Live:** [kerala-coastal-restaurant.vercel.app](https://kerala-coastal-restaurant.vercel.app)

## Tech Stack

- **Framework:** Next.js 15 (App Router, React 19)
- **Styling:** Plain CSS with custom properties
- **Animations:** Framer Motion, CSS keyframes
- **Fonts:** Playfair Display, DM Sans, Satisfy (via `next/font/google`)
- **Deployment:** Vercel

## Features

- Responsive design (mobile-first, 375px to 2560px+)
- Hero section with slideshow, floating food decorations, and animated greeting
- Interactive food showcase with scroll-morph animation
- Masonry photo gallery with hover effects
- Events & catering section
- Menu with categorized dishes
- Customer reviews carousel
- Contact section with embedded Google Maps
- WhatsApp floating button for instant orders
- Swiggy & Zomato order integration
- Newsletter subscription

## Performance & SEO

- Optimized images (AVIF/WebP via Next.js Image)
- Lazy loading for below-fold content
- Google Fonts with `display: swap`
- Structured data (JSON-LD Restaurant schema)
- Open Graph & Twitter Card meta tags
- Canonical URL
- Semantic HTML with ARIA labels
- `robots.txt` friendly

## Security

- Content Security Policy (CSP)
- HTTP Strict Transport Security (HSTS)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy (camera, microphone, geolocation, payment)
- No `X-Powered-By` header

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deployment

Deployed on Vercel. Push to `main` triggers automatic deployment.

## Contact

- **Phone:** +91 7633019866
- **Address:** 2/76, Ground Floor, Shankar Road, Opposite BSES Office, Rajinder Nagar, New Delhi - 110060
- **Hours:** 11:00 AM - 11:00 PM (All days)

## License

All rights reserved. Kerala Coastal Restaurant (KCR).
