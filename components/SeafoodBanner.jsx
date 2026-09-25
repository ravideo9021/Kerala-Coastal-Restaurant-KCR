import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import Picture from './Picture';
import DietMark from './DietMark';
import { formatRupees, getItem } from '@/data/menu';
import { site } from '@/data/site';

const FEATURED = [
  'kerala-fish-curry',
  'meen-pollichathu',
  'fish-moilee',
  'chemmeen-ularthiyathu',
  'karimeen-fry',
  'crab-roast',
];

export default function SeafoodBanner() {
  return (
    <section className="seafood" aria-labelledby="seafood-title">
      <div className="seafood-bg" aria-hidden="true">
        <Picture name="chilli-fish" alt="" sizes="(max-width: 1040px) 100vw, 64vw" blur={false} />
      </div>
      <div className="seafood-shade" aria-hidden="true" />

      <div className="container seafood-inner">
        <div className="seafood-copy reveal">
          <p className="eyebrow">From the coast</p>
          <h2 id="seafood-title">
            Seafood specials <em>Kerala style, fiery &amp; fragrant</em>
          </h2>
          <p className="lead">
            Fish curry soured with kodampuli, karimeen fried in masala, prawns roasted with shallots and pepper, and
            meen pollichathu cooked in a banana leaf: the flavours of the Malabar coast.
          </p>
          <ul className="price-list">
            {FEATURED.map((slug) => {
              const item = getItem(slug);
              return (
                <li key={slug}>
                  <DietMark diet={item.diet} size={14} />
                  <span>{item.name}</span>
                  <strong>{formatRupees(item.prices[0])}</strong>
                </li>
              );
            })}
          </ul>
          <div className="seafood-actions">
            <Link className="btn btn-gold" href="/menu#seafood">
              Seafood menu <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a className="btn btn-outline" href={site.phone.href}>
              <Phone size={17} aria-hidden="true" /> Call to order
            </a>
          </div>
        </div>

        <svg className="seafood-ring spin-ring" viewBox="0 0 220 220" aria-hidden="true">
          <defs>
            <path id="seafood-ring-path" d="M110,110 m-86,0 a86,86 0 1,1 172,0 a86,86 0 1,1 -172,0" />
          </defs>
          <circle cx="110" cy="110" r="104" />
          <text>
            <textPath href="#seafood-ring-path" textLength="534" lengthAdjust="spacing">
              FROM THE COAST • KERALA SEAFOOD • COCONUT &amp; SPICE •{' '}
            </textPath>
          </text>
        </svg>
      </div>
    </section>
  );
}
