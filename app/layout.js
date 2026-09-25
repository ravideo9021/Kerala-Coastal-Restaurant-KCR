import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AmbientBackground from '@/components/AmbientBackground';
import ScrollEffects from '@/components/ScrollEffects';
import FloatingActions from '@/components/FloatingActions';
import MobileActionBar from '@/components/MobileActionBar';
import { SITE_URL, site } from '@/data/site';
import { openingHoursSpecification } from '@/lib/hours';

// Self-hosted, subsetted brand fonts (see assets/fonts/README.md): one small
// file per family, including the rupee sign.
const display = localFont({
  src: '../assets/fonts/AnekMalayalam-display.woff2',
  weight: '600 800',
  display: 'swap',
  variable: '--font-anek',
  fallback: ['Arial Narrow', 'Arial', 'sans-serif'],
});

const body = localFont({
  src: '../assets/fonts/Manrope-var.woff2',
  weight: '400 800',
  display: 'swap',
  variable: '--font-manrope',
  fallback: ['system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
});

const script = localFont({
  src: '../assets/fonts/Yellowtail-400.woff2',
  weight: '400',
  display: 'swap',
  variable: '--font-yellowtail',
  fallback: ['Brush Script MT', 'cursive'],
});

const title = 'Kerala Coastal Restaurant (KCR) | Authentic Kerala Food in Rajinder Nagar, Delhi';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: '%s | KCR Delhi' },
  description: site.description,
  applicationName: site.fullName,
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'website',
    siteName: site.fullName,
    title: 'Kerala Coastal Restaurant (KCR): authentic Kerala food in Delhi',
    description:
      'Kerala fish curry, meen pollichathu, Thalassery biryani, kizhi parotta and appam in Rajinder Nagar, New Delhi. Dine-in, takeaway, delivery and catering.',
    locale: 'en_IN',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kerala Coastal Restaurant (KCR)',
    description: 'Authentic Kerala food in Rajinder Nagar, New Delhi: seafood, biryani, parotta and more.',
  },
  category: 'restaurant',
};

export const viewport = {
  themeColor: '#060D0A',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Restaurant',
      '@id': `${SITE_URL}/#restaurant`,
      name: site.fullName,
      alternateName: [site.name, site.shortName],
      description: site.description,
      url: SITE_URL,
      image: [`${SITE_URL}/opengraph-image.jpg`],
      logo: `${SITE_URL}/icon.svg`,
      telephone: site.phone.e164,
      priceRange: site.priceRange,
      servesCuisine: site.cuisines,
      acceptsReservations: true,
      menu: `${SITE_URL}/menu`,
      hasMap: site.maps.place,
      address: {
        '@type': 'PostalAddress',
        streetAddress: `${site.address.street}, ${site.address.landmark}`,
        addressLocality: `${site.address.locality}, ${site.address.city}`,
        addressRegion: site.address.region,
        postalCode: site.address.postalCode,
        addressCountry: site.address.country,
      },
      geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
      openingHoursSpecification: openingHoursSpecification(),
      sameAs: [site.social.instagram, site.order.swiggy, site.order.zomato],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: site.fullName,
      publisher: { '@id': `${SITE_URL}/#restaurant` },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable} ${script.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          // JSON-LD must be inline; the content is static and escapes "<".
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <AmbientBackground />
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <FloatingActions />
        <MobileActionBar />
        <ScrollEffects />
      </body>
    </html>
  );
}
