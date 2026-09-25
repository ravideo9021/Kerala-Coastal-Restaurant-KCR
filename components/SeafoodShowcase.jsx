import Link from 'next/link';
import Picture from './Picture';
import DietMark from './DietMark';
import { formatRupees, getItem } from '@/data/menu';

const FEATURED = ['kerala-fish-curry', 'meen-pollichathu', 'fish-moilee', 'chemmeen-ularthiyathu', 'karimeen-fry', 'crab-roast'];

export default function SeafoodShowcase() {
  return (
    <section className="showcase" aria-labelledby="seafood-title">
      <div className="showcase-visual">
        <div className="showcase-photo">
          <Picture
            name="chilli-fish"
            alt="Spicy fried fish with curry leaves and red peppers on a banana leaf"
            sizes="(max-width: 1040px) 100vw, 55vw"
          />
        </div>
        <div className="showcase-badge" data-play-when-visible="" aria-hidden="true">
          <svg viewBox="0 0 180 180">
            <defs>
              <path id="badge-ring" d="M90,90m-70,0a70,70 0 1,1 140,0a70,70 0 1,1 -140,0" />
            </defs>
            <text>
              <textPath href="#badge-ring">FROM THE COAST • KERALA SEAFOOD • COCONUT &amp; SPICE •</textPath>
            </text>
          </svg>
        </div>
      </div>
      <div className="showcase-content">
        <p className="eyebrow reveal">From the coast</p>
        <h2 id="seafood-title" className="reveal">
          Seafood
          <br />
          Specials
          <em>Kerala style, fiery &amp; fragrant</em>
        </h2>
        <p className="lead reveal">
          Kerala fish curry, karimeen fried in masala, prawns roasted with shallots and pepper, meen pollichathu
          cooked in a banana leaf, crab roast and more: the flavours of the Malabar coast, cooked the Kerala way.
        </p>
        <ul className="showcase-list reveal">
          {FEATURED.map((slug) => {
            const item = getItem(slug);
            return (
              <li key={slug}>
                <DietMark diet={item.diet} size={13} />
                <span>{item.name}</span>
                <span className="showcase-price">{formatRupees(item.prices[0])}</span>
              </li>
            );
          })}
        </ul>
        <Link href="/menu#seafood" className="btn btn-teal reveal">
          View seafood menu
        </Link>
      </div>
    </section>
  );
}
