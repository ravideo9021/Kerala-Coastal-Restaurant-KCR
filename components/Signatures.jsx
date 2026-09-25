import Picture from './Picture';
import DietMark from './DietMark';
import MovingBorderCard from './MovingBorderCard';
import BreathingHeading from './BreathingHeading';
import { getItem, priceFrom } from '@/data/menu';

const DISHES = [
  {
    slug: 'kizhi-parotta',
    image: 'kizhi-parotta',
    alt: 'Kizhi parotta: a parcel of parotta and chicken masala in a charred banana leaf',
    name: 'Kizhi Parotta',
    tag: 'Kerala street classic',
    description: 'Flaky parotta and chicken masala tied up in a banana leaf and roasted, so every layer soaks up the spice.',
    color: 'var(--teal-light)',
  },
  {
    slug: 'kerala-chicken-dum-biryani',
    image: 'kerala-chicken-biryani',
    alt: 'Kerala chicken biryani with lime and fried onions',
    name: 'Kerala Chicken Biryani',
    tag: 'Slow-cooked on dum',
    description: 'Chicken and rice layered with whole spices and fried onions, sealed and slow-cooked: fragrant rather than fiery.',
    color: 'var(--coconut)',
  },
  {
    slug: 'chilli-chicken',
    image: 'chilli-chicken',
    alt: 'Glossy chilli chicken with scallions and green chillies',
    name: 'Chilli Chicken',
    tag: 'Wok-tossed',
    description: 'Crisp chicken tossed hot with green chillies, scallions and our house spice blend.',
    color: 'var(--teal-light)',
  },
];

export default function Signatures() {
  return (
    <section id="signatures" className="signatures" aria-labelledby="signatures-title">
      <div className="section-head">
        <p className="eyebrow reveal">Our signatures</p>
        <div className="reveal">
          <BreathingHeading
            id="signatures-title"
            lines={[
              { text: 'Coastal', size: 'md', step: 0.2 },
              { text: 'Classics', size: 'md', step: 0.2 },
            ]}
            tagline="Handcrafted with love"
          />
        </div>
      </div>
      <div className="sig-grid">
        {DISHES.map((d, i) => {
          const item = getItem(d.slug);
          return (
            <div key={d.slug} className="reveal">
              <MovingBorderCard radius={14} duration={3.5 + i * 0.8} color={d.color} glow={110}>
                <article className="sig-card" data-tilt="">
                  <div className="sig-img">
                    <Picture name={d.image} alt={d.alt} sizes="(max-width: 740px) 92vw, (max-width: 1040px) 46vw, 380px" />
                  </div>
                  <div className="sig-body">
                    <div className="sig-meta">
                      <DietMark diet={item.diet} size={16} />
                      <span className="sig-tag">{d.tag}</span>
                    </div>
                    <h3>{d.name}</h3>
                    <p>{d.description}</p>
                    <p className="sig-price">{priceFrom(item)}</p>
                  </div>
                </article>
              </MovingBorderCard>
            </div>
          );
        })}
      </div>
    </section>
  );
}
