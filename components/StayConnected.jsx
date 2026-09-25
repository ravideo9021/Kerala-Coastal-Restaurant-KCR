import { InstagramIcon, WhatsAppIcon } from './BrandIcons';
import { site, whatsappLink } from '@/data/site';

/**
 * Replaces the old e-mail sign-up, whose addresses were only kept in server
 * memory and lost on every restart. WhatsApp and Instagram reach diners where
 * they already are.
 */
export default function StayConnected() {
  return (
    <section className="newsletter" aria-labelledby="connect-title">
      <div className="newsletter-inner reveal">
        <p className="script">Stay connected</p>
        <h2 id="connect-title">
          Offers &amp;
          <br />
          festival specials
        </h2>
        <p>Be the first to hear about new dishes, Onam and festival feasts and special offers. No spam, just good food.</p>
        <div className="connect-actions">
          <a
            className="btn btn-whatsapp"
            href={whatsappLink('Hi KCR! Please add me to your offers and updates list.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={18} /> Get offers on WhatsApp
          </a>
          <a className="btn btn-outline" href={site.social.instagram} target="_blank" rel="noopener noreferrer">
            <InstagramIcon size={18} /> Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
