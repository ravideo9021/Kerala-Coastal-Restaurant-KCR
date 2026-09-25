import Link from 'next/link';
import { Phone } from 'lucide-react';
import MenuExplorer from '@/components/MenuExplorer';
import PrintButton from '@/components/PrintButton';
import OrderButton from '@/components/OrderButton';
import { menu, dishCount } from '@/data/menu';
import { SITE_URL, site } from '@/data/site';

export const metadata = {
  title: 'Menu: Kerala Seafood, Biryani, Parotta & More',
  description: `The full Kerala Coastal Restaurant menu: ${dishCount} dishes with prices. Kerala fish curry, meen pollichathu, prawns, Thalassery biryani, kizhi parotta, appam and puttu, plus North Indian and Chinese. Veg and non-veg clearly marked.`,
  alternates: { canonical: '/menu' },
  openGraph: { url: '/menu' },
};

const menuStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Menu',
  '@id': `${SITE_URL}/menu#menu`,
  name: `${site.fullName} menu`,
  url: `${SITE_URL}/menu`,
  inLanguage: 'en-IN',
  hasMenuSection: menu.map((category) => ({
    '@type': 'MenuSection',
    name: category.label,
    hasMenuSection: category.sections.map((section) => ({
      '@type': 'MenuSection',
      name: section.title,
      hasMenuItem: section.items.map((item) => ({
        '@type': 'MenuItem',
        name: item.name,
        ...(item.diet === 'veg' && { suitableForDiet: 'https://schema.org/VegetarianDiet' }),
        ...(item.prices.length > 0 && {
          offers: item.prices.map((price) => ({ '@type': 'Offer', price: String(price), priceCurrency: 'INR' })),
        }),
      })),
    })),
  })),
};

export default function MenuPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuStructuredData).replace(/</g, '\\u003c') }}
      />
      <section className="menu-page">
        <div className="container">
          <header className="menu-page-head">
            <p className="script">Our menu</p>
            <h1>From land &amp; sea</h1>
            <p className="lead">
              {dishCount} dishes from our Kerala kitchen, plus North Indian and Chinese favourites. Prices in ₹ and
              subject to change; delivery-app prices can differ.
            </p>
            <div className="menu-page-actions">
              <OrderButton brand="swiggy" />
              <OrderButton brand="zomato" />
              <a className="btn btn-outline" href={site.phone.href}>
                <Phone size={17} aria-hidden="true" /> {site.phone.display}
              </a>
              <PrintButton />
            </div>
          </header>

          <div className="menu-card menu-card--page">
            <MenuExplorer mode="full" headingLevel={2} />
          </div>

          <p className="menu-page-back">
            <Link href="/">← Back to home</Link>
          </p>
        </div>
      </section>
    </>
  );
}
