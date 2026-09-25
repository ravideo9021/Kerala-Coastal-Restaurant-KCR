import Link from 'next/link';
import Picture from './Picture';
import DietMark from './DietMark';
import { formatRupees, menu } from '@/data/menu';

const biryanis = menu.find((c) => c.id === 'biryani').sections[0].items;

export default function RiceDelights() {
  return (
    <section className="rice-section" aria-labelledby="rice-title">
      <div className="rice-inner">
        <div className="rice-bowl rice-bowl--left" aria-hidden="true">
          <Picture name="kerala-chicken-biryani" alt="" sizes="(max-width: 1040px) 34vw, 400px" />
        </div>

        <div className="rice-content">
          <p className="rice-kicker reveal">Aromatic &amp; flavourful</p>
          <h2 id="rice-title" className="reveal">
            Kerala
            <br />
            Biryani
          </h2>
          <p className="rice-sub reveal">
            Chicken, mutton, prawns or fish, layered with whole spices and fried onions and slow-cooked the Kerala
            way, including a Thalassery biryani made the Malabar way.
          </p>
          <ul className="rice-list reveal">
            {biryanis.map((item) => (
              <li key={item.name}>
                <DietMark diet={item.diet} size={13} />
                <span>{item.name}</span>
                <span className="rice-list-price">{formatRupees(item.prices[0])}</span>
              </li>
            ))}
          </ul>
          <Link href="/menu#biryani" className="btn btn-white reveal">
            Explore the menu
          </Link>
        </div>

        <div className="rice-bowl rice-bowl--right" aria-hidden="true">
          <Picture name="chicken-fried-rice" alt="" sizes="(max-width: 1040px) 30vw, 340px" />
        </div>
      </div>
    </section>
  );
}
