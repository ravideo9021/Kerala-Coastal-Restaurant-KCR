import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Picture from './Picture';
import DietMark from './DietMark';
import { formatRupees, menu } from '@/data/menu';

const biryanis = menu.find((c) => c.id === 'biryani').sections[0].items;

export default function RiceDelights() {
  return (
    <section className="rice section" aria-labelledby="rice-title">
      <div className="rice-bowl rice-bowl--left" aria-hidden="true">
        <Picture
          name="kerala-chicken-biryani-cutout"
          alt=""
          sizes="(max-width: 740px) 46vw, (max-width: 1040px) 34vw, 420px"
        />
      </div>
      <div className="rice-bowl rice-bowl--right" aria-hidden="true">
        <Picture
          name="chicken-fried-rice-cutout"
          alt=""
          sizes="(max-width: 740px) 40vw, (max-width: 1040px) 28vw, 340px"
        />
      </div>

      <div className="rice-content reveal">
        <p className="rice-kicker">Chicken • Mutton • Prawns • Fish • Veg</p>
        <h2 id="rice-title">
          Biryani,
          <br />
          the Kerala way
        </h2>
        <p className="rice-sub">
          Layered with whole spices and fried onions and slow-cooked on dum, including a Thalassery biryani made the
          Malabar way.
        </p>
        <ul className="rice-list">
          {biryanis.map((item) => (
            <li key={item.name}>
              <DietMark diet={item.diet} size={14} />
              <span>{item.name}</span>
              <strong>{formatRupees(item.prices[0])}</strong>
            </li>
          ))}
        </ul>
        <Link className="btn btn-white" href="/menu#biryani">
          Explore rice &amp; biryani <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
