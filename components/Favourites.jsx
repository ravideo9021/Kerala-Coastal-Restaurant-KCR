import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import DishCard from './DishCard';

const SIZES = '(max-width: 740px) 62vw, (max-width: 1040px) 45vw, 280px';

export default function Favourites() {
  return (
    <section className="favourites section" aria-labelledby="favourites-title">
      <div className="container">
        <header className="section-head reveal">
          <p className="script">Beyond Kerala</p>
          <h2 id="favourites-title">Something for everyone</h2>
          <p className="lead">
            Friends who want butter chicken, kids who only eat fried rice? Our kitchen cooks North Indian and
            Indo-Chinese favourites too.
          </p>
        </header>
        <div className="dish-grid dish-grid--4">
          <DishCard
            compact
            slug="chicken-curry"
            image="chicken-curry-cutout"
            alt="Chicken curry with coriander in a white bowl"
            description="Tender chicken in a rich, well-spiced onion and tomato gravy. Perfect with parotta."
            sizes={SIZES}
          />
          <DishCard
            compact
            slug="paneer-tikka"
            image="paneer-tikka-cutout"
            alt="Char-grilled paneer tikka skewers with lemon"
            description="Smoky char-grilled paneer, onion and capsicum on skewers, with mint chutney."
            sizes={SIZES}
          />
          <DishCard
            compact
            slug="chilli-chicken"
            image="chilli-chicken-cutout"
            alt="Glossy chilli chicken with scallions"
            description="Crisp chicken tossed hot with green chillies, scallions and a glossy, spicy sauce."
            sizes={SIZES}
          />
          <DishCard
            compact
            slug="falooda"
            image="falooda-cutout"
            alt="A tall glass of falooda topped with ice cream and pistachios"
            description="Rose syrup, vermicelli, basil seeds and ice cream, layered tall. The sweetest way to finish."
            sizes={SIZES}
          />
        </div>
        <p className="section-more reveal">
          <Link href="/menu#curries" className="text-link">
            See all curries, starters &amp; Chinese <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </p>
      </div>
    </section>
  );
}
