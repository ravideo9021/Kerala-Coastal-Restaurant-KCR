'use client';
import { useState } from 'react';
import { menuCategories } from '@/data/menu';
import { AnimatedText } from '@/components/ui/animated-text';

export default function Menu() {
  const [active, setActive] = useState(menuCategories[0].key);
  const cat = menuCategories.find((c) => c.key === active);

  return (
    <section id="menu" className="menu-section">
      <div className="menu-top">
        <p className="eyebrow reveal">Our Menu</p>
        <div className="reveal">
          <AnimatedText
            text="Explore the"
            fontSize={42}
            minWeight={300}
            maxWeight={800}
            animationDuration={2.5}
            delayMultiplier={0.18}
          />
          <AnimatedText
            text="Flavours"
            fontSize={56}
            minWeight={300}
            maxWeight={900}
            animationDuration={2}
            delayMultiplier={0.2}
          />
          <em style={{ display: 'block', textAlign: 'center', fontFamily: 'var(--font-script)', fontSize: '20px', color: 'var(--coconut)', marginTop: '8px' }}>From land &amp; sea</em>
        </div>
        <p className="menu-note reveal">
          Prices are indicative and may vary. Please contact us for the latest menu.
        </p>
      </div>

      <div className="menu-tabs reveal" role="tablist">
        {menuCategories.map((c) => (
          <button
            key={c.key}
            role="tab"
            aria-selected={active === c.key}
            className={`menu-tab${active === c.key ? ' active' : ''}`}
            onClick={() => setActive(c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {menuCategories.map((c) => (
        <div
          key={c.key}
          role="tabpanel"
          className={`menu-panel${active === c.key ? ' active' : ''}`}
        >
          {c.sections.map((sec) => (
            <div key={sec.title}>
              <h3 className="cat-title">
                {sec.title}
                {sec.subtitle && <small> — {sec.subtitle}</small>}
              </h3>
              <ul className="menu-list">
                {sec.items.map((item) => (
                  <li key={item.name} className={item.highlight ? 'highlight' : ''}>
                    <span>{item.name}</span>
                    <em>{item.price}</em>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
