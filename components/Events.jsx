'use client';

import { AnimatedText } from '@/components/ui/animated-text';
import FeatureCarousel from '@/components/ui/feature-carousel';

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

        <FeatureCarousel />

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
