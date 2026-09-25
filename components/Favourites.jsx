import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import DishCard from './DishCard';
import BreathingHeading from './BreathingHeading';

const SIZES = '(max-width: 740px) 72vw, (max-width: 1040px) 44vw, 280px';

const DISHES = [
  {
    slug: 'chicken-curry',
    image: 'chicken-curry',
    alt: 'Chicken curry with coriander in a white bowl',
    description: 'Tender chicken in a rich, well-spiced onion and tomato gravy. Perfect with parotta.',
  },
  {
    slug: 'paneer-tikka',
    image: 'paneer-tikka',
    alt: 'Skewers of char-grilled paneer tikka with lemon',
    description: 'Smoky char-grilled paneer, onion and capsicum on skewers, with mint chutney.',
  },
  {
    slug: 'chilli-paneer',
    image: 'chilli-paneer',
    alt: 'Chilli paneer tossed with peppers and onions in a black bowl',
    description: 'Indo-Chinese style paneer tossed with peppers and onions in a fiery, glossy sauce.',
  },
  {
    slug: 'chicken-fried-rice',
    image: 'chicken-fried-rice',
    alt: 'A plate of chicken fried rice with spring onions',
    description: 'Wok-tossed rice with chicken and spring onion. Pairs with anything from the Chinese menu.',
  },
];

export default function Favourites() {
  return (
    <section className="favourites" aria-labelledby="favourites-title">
      <div className="section-head">
        <p className="eyebrow reveal">Beyond Kerala</p>
        <div className="reveal">
          <BreathingHeading
            id="favourites-title"
            lines={[
              { text: 'Something for', size: 'sm', step: 0.15 },
              { text: 'Everyone', size: 'md', step: 0.15 },
            ]}
            tagline="North Indian & Chinese favourites"
          />
        </div>
        <p className="lead reveal">
          Coming with friends who want butter chicken, or kids who only eat fried rice? Our kitchen cooks North
          Indian and Indo-Chinese classics too.
        </p>
      </div>
      <div className="dish-row">
        {DISHES.map((d) => (
          <DishCard key={d.slug} sizes={SIZES} {...d} />
        ))}
      </div>
      <p className="section-more reveal">
        <Link href="/menu#curries" className="text-link">
          See all curries, starters &amp; Chinese <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </p>
    </section>
  );
}
