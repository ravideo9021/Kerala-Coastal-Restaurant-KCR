import { ArrowRight } from 'lucide-react';
import { SwiggyIcon, ZomatoIcon } from './BrandIcons';
import { site } from '@/data/site';

const BRANDS = {
  swiggy: { name: 'Swiggy', href: site.order.swiggy, logo: <SwiggyIcon size={17} color="#FC8019" /> },
  zomato: { name: 'Zomato', href: site.order.zomato, logo: <ZomatoIcon size={40} color="#E23744" /> },
};

/**
 * The animated order pill: on hover (or keyboard focus) the brand colour
 * floods out from the dot, the label slides away and "Order now →" slides in.
 * Touch screens get the plain pill.
 */
export default function OrderButton({ brand, className = '' }) {
  const { name, href, logo } = BRANDS[brand];
  return (
    <a
      className={`order-btn order-btn--${brand} ${className}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Order on ${name}`}
    >
      <span className="order-btn-dot" aria-hidden="true" />
      <span className="order-btn-label" aria-hidden="true">
        <span className={`order-logo order-logo--${brand}`}>{logo}</span>
        <span>Order on {name}</span>
      </span>
      <span className="order-btn-hover" aria-hidden="true">
        Order now <ArrowRight size={16} />
      </span>
    </a>
  );
}
