'use client';
import { MovingBorderCard } from '@/components/ui/moving-border';
import { AnimatedText } from '@/components/ui/animated-text';

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about-bg" />
      <div className="about-inner">
        <div>
          <p className="eyebrow reveal">Our Story</p>
          <div className="reveal">
            <AnimatedText
              text="A Taste of"
              fontSize={42}
              minWeight={300}
              maxWeight={800}
              animationDuration={2.5}
              delayMultiplier={0.18}
            />
            <AnimatedText
              text="Kerala"
              fontSize={56}
              minWeight={300}
              maxWeight={900}
              animationDuration={2}
              delayMultiplier={0.2}
            />
            <em style={{ display: 'block', textAlign: 'center', fontFamily: 'var(--font-script)', fontSize: '22px', color: 'var(--coconut)', marginTop: '8px' }}>God&apos;s Own Kitchen</em>
          </div>
          <p className="lead reveal">
            Born from the backwaters and spice-laden hills of Kerala, KCR brings
            the authentic flavours of coastal South India to your table. Every dish
            is a celebration of fresh seafood, coconut, curry leaves, and the
            time-honoured recipes passed down through generations.
          </p>
          <div className="about-badges reveal">
            <div className="badge">
              <strong className="counter" data-target="150">0</strong>
              <span>+ Dishes</span>
            </div>
            <div className="badge">
              <strong>Veg & Non-Veg</strong>
              <span>Both Available</span>
            </div>
            <div className="badge">
              <strong>Dine-In</strong>
              <span>& Delivery</span>
            </div>
          </div>
        </div>
        <div className="about-visual reveal">
          <div className="about-ring svg-spin">
            <svg viewBox="0 0 300 300">
              <defs>
                <path id="ring" d="M150,150m-120,0a120,120 0 1,1 240,0a120,120 0 1,1 -240,0" />
              </defs>
              <text>
                <textPath href="#ring">
                  KERALA COASTAL • FRESH SEAFOOD • AUTHENTIC SPICES • TRADITIONAL RECIPES •
                </textPath>
              </text>
            </svg>
          </div>
          <MovingBorderCard
            borderRadius="16px"
            duration={5000}
            borderColor="var(--coconut)"
            glowSize={70}
          >
            <img
              src="/media/plate design for fecoration.png"
              alt="KCR Platter"
              className="about-img"
              style={{ filter: 'drop-shadow(0 30px 40px rgba(0,0,0,.45))', maxWidth: '520px', margin: '0 auto' }}
            />
          </MovingBorderCard>
          <img
            src="/media/tomato_for_decoration.png"
            alt=""
            className="about-decor d1"
          />
          <img
            src="/media/for_decoration.png"
            alt=""
            className="about-decor d2"
          />
        </div>
      </div>
    </section>
  );
}
