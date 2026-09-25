import Link from 'next/link';
import { InstagramIcon, WhatsAppIcon } from './BrandIcons';
import { fullAddress, site, whatsappLink } from '@/data/site';
import { formatTime } from '@/lib/hours';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function hourRows() {
  return site.hours.map((slot) => ({
    days:
      slot.days.length === 7
        ? 'Monday – Sunday'
        : slot.days.map((d) => DAY_NAMES[d].slice(0, 3)).join(', '),
    time: `${formatTime(slot.opens)} – ${formatTime(slot.closes)}`,
  }));
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="kasavu" aria-hidden="true" />
      <div className="footer-inner">
        <div className="footer-brand">
          <p className="footer-name">Kerala Coastal Restaurant</p>
          <p>
            Authentic Kerala cuisine in Rajinder Nagar, New Delhi: seafood, biryanis and parottas from God&apos;s
            Own Country, plus North Indian and Chinese favourites. Dine in or order online.
          </p>
          <p className="footer-address">{fullAddress}</p>
          <div className="footer-social">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="KCR on Instagram"
            >
              <InstagramIcon size={20} />
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Chat with KCR on WhatsApp"
            >
              <WhatsAppIcon size={20} />
            </a>
          </div>
        </div>

        <nav className="footer-links" aria-label="Footer">
          <p className="footer-heading">Quick links</p>
          <Link href="/#about">About</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/#events">Events &amp; catering</Link>
          <Link href="/#gallery">Gallery</Link>
          <Link href="/#reviews">Reviews</Link>
          <Link href="/#visit">Visit us</Link>
          <a href={site.order.swiggy} target="_blank" rel="noopener noreferrer">
            Order on Swiggy
          </a>
          <a href={site.order.zomato} target="_blank" rel="noopener noreferrer">
            Order on Zomato
          </a>
        </nav>

        <div className="footer-hours">
          <p className="footer-heading">Opening hours</p>
          {hourRows().map((row) => (
            <p key={row.days}>
              {row.days}
              <strong>{row.time}</strong>
            </p>
          ))}
          <p className="footer-phone">
            <a href={site.phone.href}>{site.phone.display}</a>
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
