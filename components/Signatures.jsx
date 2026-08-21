'use client';
import { MovingBorderCard } from '@/components/ui/moving-border';
import { AnimatedText } from '@/components/ui/animated-text';

const DISHES = [
  {
    img: '/media/Charred Banana Leaf Kizhi Parotta.png',
    tag: 'Chef Special',
    name: 'Kizhi Parotta',
    desc: 'Charred banana leaf wrapped parotta with succulent chicken masala — a Kerala street legend.',
    price: '₹349',
    color: 'var(--teal-light)',
  },
  {
    img: '/media/Glossy Chili Chicken with Scallions.png',
    tag: 'Bestseller',
    name: 'Chilli Chicken',
    desc: 'Glossy, wok-tossed chicken tossed with scallions, green chillies and our signature Kerala spice blend.',
    price: '₹329',
    color: 'var(--coconut)',
  },
  {
    img: '/media/Steaming Chicken Kizhi Parotta Parcel.png',
    tag: 'Must Try',
    name: 'Chicken Kizhi Parcel',
    desc: 'Steaming hot chicken parcel wrapped in layers of flaky Kerala parotta — spiced to perfection.',
    price: '₹349',
    color: 'var(--teal-light)',
  },
];

export default function Signatures() {
  return (
    <section id="signatures" className="signatures">
      <div className="sig-header">
        <p className="eyebrow reveal">Our Signatures</p>
        <div className="reveal">
          <AnimatedText
            text="Coastal"
            fontSize={50}
            minWeight={300}
            maxWeight={900}
            animationDuration={2.2}
            delayMultiplier={0.2}
          />
          <AnimatedText
            text="Classics"
            fontSize={50}
            minWeight={300}
            maxWeight={900}
            animationDuration={2.2}
            delayMultiplier={0.2}
          />
          <em style={{ display: 'block', textAlign: 'center', fontFamily: 'var(--font-script)', fontSize: '20px', color: 'var(--coconut)', marginTop: '8px' }}>Handcrafted with love</em>
        </div>
      </div>
      <div className="sig-grid">
        {DISHES.map((d, i) => (
          <div key={d.name} className="reveal" style={{ transitionDelay: `${i * 0.12}s` }}>
            <MovingBorderCard
              borderRadius="14px"
              duration={3500 + i * 800}
              borderColor={d.color}
              glowSize={100}
            >
              <div className="sig-card">
                <div className="sig-img">
                  <img src={d.img} alt={d.name} />
                </div>
                <div className="sig-body">
                  <span className="sig-tag">{d.tag}</span>
                  <h3>{d.name}</h3>
                  <p>{d.desc}</p>
                  <span className="sig-price">{d.price}</span>
                </div>
              </div>
            </MovingBorderCard>
          </div>
        ))}
      </div>
    </section>
  );
}
