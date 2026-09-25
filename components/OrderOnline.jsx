import { ArrowUpRight, Phone } from 'lucide-react';
import SpiceMatrix from './SpiceMatrix';
import { SwiggyIcon, WhatsAppIcon, ZomatoIcon } from './BrandIcons';
import { site, whatsappLink } from '@/data/site';
import { dishCount } from '@/data/menu';

const roundedDishes = Math.floor(dishCount / 10) * 10;

export default function OrderOnline() {
  return (
    <section className="order section" id="order" aria-labelledby="order-title">
      <SpiceMatrix />
      <div className="container order-inner">
        <header className="section-head reveal">
          <p className="script">Hungry at home?</p>
          <h2 id="order-title">Order online</h2>
          <p className="lead">
            Hot Kerala food at your door. Order on your favourite app, or straight from our kitchen.
          </p>
        </header>

        <div className="order-grid">
          <div className="order-card order-card--direct reveal">
            <span className="order-card-icon">
              <WhatsAppIcon size={26} />
            </span>
            <h3>Order direct</h3>
            <p>Message or call us for takeaway and home delivery, no app needed.</p>
            <div className="order-card-actions">
              <a
                className="btn btn-whatsapp"
                href={whatsappLink('Hi KCR! I would like to place an order for delivery.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon size={18} /> WhatsApp
              </a>
              <a className="btn btn-outline" href={site.phone.href}>
                <Phone size={17} aria-hidden="true" /> Call
              </a>
            </div>
          </div>

          <a
            className="order-card order-card--swiggy reveal"
            href={site.order.swiggy}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="order-card-icon">
              <SwiggyIcon size={26} />
            </span>
            <h3>Swiggy</h3>
            <p>Track your order live and use your Swiggy offers.</p>
            <span className="order-card-cta">
              <span className="order-card-cta-long">Order on Swiggy</span>
              <span className="order-card-cta-short">Order now</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </span>
          </a>

          <a
            className="order-card order-card--zomato reveal"
            href={site.order.zomato}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="order-card-icon">
              <ZomatoIcon size={44} />
            </span>
            <h3>Zomato</h3>
            <p>Browse photos and reviews, and order in a few taps.</p>
            <span className="order-card-cta">
              <span className="order-card-cta-long">Order on Zomato</span>
              <span className="order-card-cta-short">Order now</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </span>
          </a>
        </div>

        <ul className="order-stats reveal" aria-label="At a glance">
          <li>
            <strong>{roundedDishes}+</strong>
            <span>Dishes</span>
          </li>
          <li>
            <strong>Veg &amp; non-veg</strong>
            <span>Marked on every dish</span>
          </li>
          <li>
            <strong>7 days</strong>
            <span>Lunch &amp; dinner</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
