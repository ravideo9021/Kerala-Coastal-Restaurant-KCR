import Link from 'next/link';
import { Bike, Phone, ShoppingBag } from 'lucide-react';
import KineticDots from './KineticDots';
import OrderButton from './OrderButton';
import { site } from '@/data/site';
import { hoursSummary } from '@/lib/hours';

export default function OrderOnline() {
  return (
    <section id="order" className="order-online" aria-labelledby="order-title">
      <KineticDots />
      <div className="order-online-inner">
        <p className="script reveal">Hungry at home?</p>
        <h2 id="order-title" className="reveal">
          Order online
        </h2>
        <ul className="order-facts reveal">
          <li>
            <Bike size={22} aria-hidden="true" />
            <strong>Delivery</strong>
            <span>on Swiggy &amp; Zomato</span>
          </li>
          <li>
            <ShoppingBag size={22} aria-hidden="true" />
            <strong>Takeaway</strong>
            <span>call ahead, we&apos;ll pack it</span>
          </li>
          <li>
            <Phone size={22} aria-hidden="true" />
            <strong>{site.phone.display}</strong>
            <span>{hoursSummary()}</span>
          </li>
        </ul>
        <div className="order-online-actions reveal">
          <OrderButton brand="swiggy" />
          <OrderButton brand="zomato" />
        </div>
        <Link href="/menu" className="btn btn-teal reveal">
          View full menu
        </Link>
      </div>
    </section>
  );
}
