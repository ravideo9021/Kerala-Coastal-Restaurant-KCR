import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import MenuExplorer from './MenuExplorer';
import BreathingHeading from './BreathingHeading';
import { dishCount } from '@/data/menu';

export default function MenuSection() {
  return (
    <section id="menu" className="menu-section" aria-labelledby="menu-title">
      <div className="section-head">
        <p className="eyebrow reveal">Our menu</p>
        <div className="reveal">
          <BreathingHeading
            id="menu-title"
            lines={[
              { text: 'Explore the', size: 'sm', max: 800, duration: 2.5, step: 0.18 },
              { text: 'Flavours', size: 'lg', duration: 2, step: 0.2 },
            ]}
            tagline="From land & sea"
          />
        </div>
        <p className="menu-note reveal">
          {dishCount} dishes, veg and non-veg clearly marked. Prices in ₹ and may change; delivery-app prices can
          differ.
        </p>
      </div>

      <div className="menu-card reveal">
        <MenuExplorer mode="tabs" headingLevel={3} />
      </div>

      <p className="section-more reveal">
        <Link href="/menu" className="btn btn-coconut">
          See the full menu <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </p>
    </section>
  );
}
