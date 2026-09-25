import { ArrowRight } from 'lucide-react';
import { SwiggyIcon, ZomatoIcon } from './BrandIcons';
import { site } from '@/data/site';

const BRANDS = {
  swiggy: { name: 'Swiggy', href: site.order.swiggy, Icon: SwiggyIcon, iconSize: 20 },
  zomato: { name: 'Zomato', href: site.order.zomato, Icon: ZomatoIcon, iconSize: 38 },
};

/**
 * The animated order pill: on hover (or keyboard focus) the brand colour
 * floods out from the logo, the label slides away and "Order now →" slides
 * in. Touch screens get the plain pill.
 */
export default function OrderButton({ brand, className = '' }) {
  const { name, href, Icon, iconSize } = BRANDS[brand];
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
        <span className="order-btn-logo">
          <Icon size={iconSize} />
        </span>
        <span>
          <span className="order-btn-prefix">Order on </span>
          {name}
        </span>
      </span>
      <span className="order-btn-hover" aria-hidden="true">
        Order now <ArrowRight size={17} />
      </span>
    </a>
  );
}
