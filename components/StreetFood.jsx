'use client';
import { AnimatedText } from '@/components/ui/animated-text';

const ITEMS = [
  {
    img: '/media/Indian Chicken Curry Bowl.png',
    name: 'Kerala Chicken Curry',
    desc: 'Rich, coconut-based chicken curry with aromatic spices and curry leaves.',
    price: '₹349',
  },
  {
    img: '/media/Naan Basket.png',
    name: 'Naan Basket',
    desc: 'Assorted freshly baked naans — butter, garlic and plain, straight from the tandoor.',
    price: '₹199',
  },
  {
    img: '/media/Spicy Grilled Paneer Tikka Skewers.png',
    name: 'Paneer Tikka',
    desc: 'Smoky grilled paneer skewers marinated in Kerala spice blend with mint chutney.',
    price: '₹299',
  },
  {
    img: '/media/Chilli Paneer Gravy Feast.png',
    name: 'Chilli Paneer',
    desc: 'Indo-Chinese style paneer tossed in a fiery gravy with peppers and onions.',
    price: '₹279',
  },
];

function TickerStrip({ reverse }) {
  const text = 'APPAM • PUTTU • BIRYANI • FISH CURRY • PAROTTA • DOSA • PAYASAM • STEW • ';
  return (
    <div className={`ticker-strip${reverse ? ' ticker-reverse' : ''}`}>
      <div className="ticker-track">
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}

export default function StreetFood() {
  return (
    <>
      <TickerStrip />
      <section className="street-food">
        <div className="sf-header">
          <p className="eyebrow reveal">Kerala Specials</p>
          <div className="reveal">
            <AnimatedText
              text="Traditional"
              fontSize={46}
              minWeight={300}
              maxWeight={900}
              animationDuration={2.2}
              delayMultiplier={0.15}
            />
            <AnimatedText
              text="Favourites"
              fontSize={46}
              minWeight={300}
              maxWeight={900}
              animationDuration={2.2}
              delayMultiplier={0.15}
            />
            <em style={{ display: 'block', textAlign: 'center', fontFamily: 'var(--font-script)', fontSize: '20px', color: 'var(--coconut)', marginTop: '8px' }}>From the backwaters</em>
          </div>
        </div>
        <div className="sf-grid">
          {ITEMS.map((item) => (
            <div key={item.name} className="sf-card reveal">
              <div className="sf-img-wrap">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="sf-body">
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
                <span className="sf-price">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <TickerStrip reverse />
    </>
  );
}
