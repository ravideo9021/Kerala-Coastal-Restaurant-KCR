import { Playfair_Display, DM_Sans, Satisfy } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollEffects from '@/components/ScrollEffects';
import BackgroundGradient from '@/components/BackgroundGradient';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const satisfy = Satisfy({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-script',
  display: 'swap',
});

export const metadata = {
  title: 'Kerala Coastal Restaurant (KCR) | Authentic Kerala Cuisine in Delhi',
  description:
    'Experience the authentic flavours of Kerala at KCR. Fresh seafood, traditional sadyas, Kerala biryanis and coastal delicacies in the heart of Delhi.',
  keywords: [
    'Kerala restaurant',
    'KCR Delhi',
    'Kerala Coastal Restaurant',
    'Kerala food Delhi',
    'seafood Delhi',
    'Kerala biryani',
    'sadya Delhi',
    'South Indian restaurant',
    'coastal cuisine',
    'appam',
    'fish curry',
  ],
  openGraph: {
    title: 'Kerala Coastal Restaurant (KCR) | Authentic Kerala Cuisine',
    description:
      'Fresh seafood, traditional sadyas, Kerala biryanis and coastal delicacies.',
    url: 'https://kerala-coastal-restaurant.vercel.app',
    siteName: 'Kerala Coastal Restaurant',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kerala Coastal Restaurant (KCR)',
    description: 'Authentic Kerala Cuisine in Delhi',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Kerala Coastal Restaurant (KCR)',
    servesCuisine: ['Kerala', 'South Indian', 'Seafood', 'Coastal'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2/76, Ground Floor, Shankar Road, Opposite BSES Office',
      addressLocality: 'Rajinder Nagar, New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110060',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.6364417,
      longitude: 77.1841909,
    },
    url: 'https://kerala-coastal-restaurant.vercel.app',
    telephone: '+917633019866',
    priceRange: '₹₹',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '11:00',
        closes: '23:00',
      },
    ],
  };

  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${satisfy.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <BackgroundGradient />
        <Header />
        <main style={{ position: 'relative', zIndex: 1 }}>{children}</main>
        <Footer />
        <ScrollEffects />
      </body>
    </html>
  );
}
