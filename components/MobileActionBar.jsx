import Link from 'next/link';
import { Navigation, Phone, ShoppingBag } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';
import { site, whatsappLink } from '@/data/site';

/** Thumb-reach actions on phones: call, WhatsApp, order, directions. */
export default function MobileActionBar() {
  return (
    <nav className="action-bar" aria-label="Quick actions">
      <a href={site.phone.href}>
        <Phone size={20} aria-hidden="true" />
        <span>Call</span>
      </a>
      <a href={whatsappLink('Hi KCR!')} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon size={20} />
        <span>WhatsApp</span>
      </a>
      <Link href="/#order" className="action-bar-primary">
        <ShoppingBag size={20} aria-hidden="true" />
        <span>Order</span>
      </Link>
      <a href={site.maps.directions} target="_blank" rel="noopener noreferrer">
        <Navigation size={20} aria-hidden="true" />
        <span>Directions</span>
      </a>
    </nav>
  );
}
