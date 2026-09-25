import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import MenuExplorer from './MenuExplorer';
import { dishCount } from '@/data/menu';

export default function MenuSection() {
  return (
    <section className="menu-section section section--open" id="menu" aria-labelledby="menu-title">
      <div className="container">
        <div className="menu-card">
          <header className="section-head reveal">
            <p className="script">Our menu</p>
            <h2 id="menu-title">From land &amp; sea</h2>
            <p className="menu-note">
              {dishCount} dishes, veg and non-veg clearly marked · Prices in ₹, subject to change
            </p>
          </header>
          <MenuExplorer mode="tabs" headingLevel={3} />
          <div className="menu-card-foot">
            <Link className="btn btn-dark" href="/menu">
              See the full menu <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link className="btn btn-outline-dark" href="/#order">
              Order online
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
