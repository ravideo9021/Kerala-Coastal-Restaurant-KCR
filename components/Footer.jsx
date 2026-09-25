import Link from 'next/link';
import Logo from './Logo';
import { InstagramIcon, SwiggyIcon, WhatsAppIcon, ZomatoIcon } from './BrandIcons';
import { site, whatsappLink } from '@/data/site';
import { formatTime } from '@/lib/hours';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function hourRows() {
  return site.hours.map((slot) => ({
    days: slot.days.length === 7 ? 'Every day' : slot.days.map((d) => DAY_NAMES[d].slice(0, 3)).join(', '),
    time: `${formatTime(slot.opens)} – ${formatTime(slot.closes)}`,
  }));
}

export default function Footer() {
  const { address } = site;
  return (
    <footer className="site-footer">
      <div className="kasavu" aria-hidden="true" />
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>
            Authentic Kerala food from God&apos;s own country: seafood, biryani and parotta, plus North Indian and
            Chinese favourites, on Shankar Road, Rajinder Nagar.
          </p>
          <div className="footer-socials">
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="KCR on Instagram">
              <InstagramIcon size={20} />
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat with KCR on WhatsApp">
              <WhatsAppIcon size={20} />
            </a>
            <a href={site.order.swiggy} target="_blank" rel="noopener noreferrer" aria-label="Order on Swiggy">
              <SwiggyIcon size={20} />
            </a>
            <a href={site.order.zomato} target="_blank" rel="noopener noreferrer" aria-label="Order on Zomato">
              <ZomatoIcon size={34} />
            </a>
          </div>
        </div>

        <nav className="footer-col" aria-label="Footer">
          <h2>Explore</h2>
          <ul>
            <li>
              <Link href="/menu">Full menu</Link>
            </li>
            <li>
              <Link href="/#about">Our story</Link>
            </li>
            <li>
              <Link href="/#order">Order online</Link>
            </li>
            <li>
              <Link href="/#events">Events &amp; catering</Link>
            </li>
            <li>
              <Link href="/#gallery">Gallery</Link>
            </li>
            <li>
              <Link href="/#reviews">Reviews</Link>
            </li>
          </ul>
        </nav>

        <div className="footer-col">
          <h2>Visit</h2>
          <address>
            <p>
              {address.street}
              <br />
              {address.landmark}
              <br />
              {address.locality}, {address.city} {address.postalCode}
            </p>
            {hourRows().map((row) => (
              <p key={row.days}>
                {row.days}: <strong>{row.time}</strong>
              </p>
            ))}
          </address>
        </div>

        <div className="footer-col">
          <h2>Contact</h2>
          <p>
            <a className="footer-phone" href={site.phone.href}>
              {site.phone.display}
            </a>
          </p>
          <p>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              WhatsApp {site.whatsapp.display}
            </a>
          </p>
          <p>
            <a href={site.maps.directions} target="_blank" rel="noopener noreferrer">
              Get directions
            </a>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} {site.fullName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
