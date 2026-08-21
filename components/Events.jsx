'use client';

import { AnimatedText } from '@/components/ui/animated-text';

const SERVICES = [
  {
    icon: '🎂',
    title: 'Birthday Parties',
    desc: 'Celebrate with a custom Kerala feast — decorated setup, personalised menu, and warm hospitality for your special day.',
  },
  {
    icon: '👯',
    title: 'Kitty Parties',
    desc: 'Perfect for your monthly get-togethers — special group menus, refreshments, and a cozy ambiance to catch up with friends.',
  },
  {
    icon: '🏢',
    title: 'Corporate Events',
    desc: 'Impress your team and clients — curated multi-course meals, meeting-friendly setups, and bulk order options.',
  },
  {
    icon: '🍽️',
    title: 'Catering Service',
    desc: 'Authentic Kerala catering at your doorstep — weddings, house parties, festive gatherings with banana leaf service.',
  },
];

export default function Events() {
  return (
    <section className="events-section" id="events">
      <div className="events-inner">
        <div className="events-header">
          <p className="eyebrow reveal">Services</p>
          <div className="reveal">
            <AnimatedText
              text="We Host"
              fontSize={46}
              minWeight={300}
              maxWeight={900}
              animationDuration={2.2}
              delayMultiplier={0.15}
            />
            <AnimatedText
              text="Your Joy"
              fontSize={46}
              minWeight={300}
              maxWeight={900}
              animationDuration={2.2}
              delayMultiplier={0.15}
            />
            <em style={{ display: 'block', textAlign: 'center', fontFamily: 'var(--font-script)', fontSize: '20px', color: 'var(--coconut)', marginTop: '8px' }}>
              Celebrations &amp; more
            </em>
          </div>
        </div>

        <div className="events-grid">
          {SERVICES.map((s, i) => (
            <div key={s.title} className="event-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <span className="event-card__icon">{s.icon}</span>
              <h3 className="event-card__title">{s.title}</h3>
              <p className="event-card__desc">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="events-cta reveal">
          <p>Planning an event? Let us make it memorable.</p>
          <a
            href="https://wa.me/917633019866?text=Hi%20KCR%2C%20I%27d%20like%20to%20enquire%20about%20hosting%20an%20event."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-coconut"
          >
            Enquire Now on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
