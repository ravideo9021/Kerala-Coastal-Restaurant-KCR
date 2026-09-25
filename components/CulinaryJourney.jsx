'use client';
import { useEffect, useRef } from 'react';
import Picture from './Picture';
import { Spring, clamp01, createLoop, lerp, mapRange } from '@/lib/spring';

const CARDS = [
  { image: 'kerala-chicken-biryani', label: 'Kerala Biryani' },
  { image: 'kizhi-parotta', label: 'Kizhi Parotta' },
  { image: 'chilli-chicken', label: 'Chilli Chicken' },
  { image: 'chilli-fish', label: 'Fish Fry' },
  { image: 'chicken-curry', label: 'Chicken Curry' },
  { image: 'paneer-tikka', label: 'Paneer Tikka' },
  { image: 'naan-basket', label: 'Fresh Naan' },
  { image: 'falooda', label: 'Falooda' },
  { image: 'chilli-paneer', label: 'Chilli Paneer' },
  { image: 'chicken-fried-rice', label: 'Fried Rice' },
  { image: 'kizhi-parcel', label: 'Kizhi Parcel' },
  { image: 'gobi-matar', label: 'Veg Curries' },
  { image: 'storefront', label: 'Our Restaurant' },
  { image: 'interior', label: 'Dine With Us' },
];

const N = CARDS.length;

// Where card i sits in each phase, relative to the centre of the stage.
function scatter(i) {
  return {
    x: (((i * 7 + 3) % 13) / 13 - 0.5) * 1500,
    y: (((i * 11 + 5) % 13) / 13 - 0.5) * 1000,
    r: (((i * 5 + 2) % 13) / 13 - 0.5) * 180,
    s: 0.6,
    o: 0,
  };
}

function line(i) {
  return { x: i * 70 - (N * 70) / 2, y: 0, r: 0, s: 1, o: 1 };
}

function circle(i, w, h) {
  const radius = Math.min(Math.min(w, h) * 0.35, 350);
  const angle = (i / N) * 360;
  const rad = (angle * Math.PI) / 180;
  return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius, r: angle + 90, s: 1, o: 1 };
}

function arc(i, w, h, rotate, parallax) {
  const mobile = w < 768;
  const arcRadius = Math.min(w, h * 1.5) * (mobile ? 1.4 : 1.1);
  const centerY = h * (mobile ? 0.35 : 0.25) + arcRadius;
  const spread = mobile ? 100 : 130;
  const step = spread / (N - 1);
  const angle = -90 - spread / 2 + i * step - clamp01(rotate / 360) * spread * 0.8;
  const rad = (angle * Math.PI) / 180;
  return {
    x: Math.cos(rad) * arcRadius + parallax,
    y: Math.sin(rad) * arcRadius + centerY,
    r: angle + 90,
    s: mobile ? 1.4 : 1.8,
    o: 1,
  };
}

function place(i, intro, morph, rotate, parallax, w, h) {
  // intro: 0 = scattered, 1 = in a line, 2 = in a circle
  const a = intro <= 1 ? scatter(i) : line(i);
  const b = intro <= 1 ? line(i) : circle(i, w, h);
  const t = intro <= 1 ? intro : intro - 1;
  const start = { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), r: lerp(a.r, b.r, t), s: lerp(a.s, b.s, t), o: lerp(a.o, b.o, clamp01(t)) };
  if (morph <= 0) return start;
  const end = arc(i, w, h, rotate, parallax);
  return {
    x: lerp(start.x, end.x, morph),
    y: lerp(start.y, end.y, morph),
    r: lerp(start.r, end.r, morph),
    s: lerp(start.s, end.s, morph),
    o: lerp(start.o, end.o, morph),
  };
}

/**
 * The dishes fly in, line up and form a circle; scrolling on then fans them
 * out into an arc and turns it. The old version hijacked the mouse wheel and
 * touch scrolling inside the section; this one follows the page scroll (the
 * stage stays pinned while you scroll past it), so it never traps anyone.
 * Same springs as before, without the animation library.
 */
export default function CulinaryJourney() {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const titleRef = useRef(null);
  const hintRef = useRef(null);
  const contentRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const cards = cardRefs.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const intro = new Spring({ stiffness: 40, damping: 15, mass: 1, restDelta: 0.001, restSpeed: 0.001 });
    const morph = new Spring({ stiffness: 40, damping: 20, mass: 1, restDelta: 0.001, restSpeed: 0.001 });
    const rotate = new Spring({ stiffness: 40, damping: 20, mass: 1, restDelta: 0.05, restSpeed: 0.05 });
    const parallax = new Spring({ stiffness: 30, damping: 20, mass: 1, restDelta: 0.05, restSpeed: 0.05 });
    const springs = [intro, morph, rotate, parallax];
    let w = stage.clientWidth;
    let h = stage.clientHeight;

    const render = () => {
      const m = reduceMotion ? 0 : morph.value;
      for (let i = 0; i < N; i++) {
        const p = place(i, intro.value, m, rotate.value, parallax.value, w, h);
        const el = cards[i];
        el.style.transform = `translate(-50%, -50%) translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px) rotate(${p.r.toFixed(2)}deg) scale(${p.s.toFixed(3)})`;
        el.style.opacity = p.o.toFixed(3);
      }
      const titleOpacity = clamp01((intro.value - 1.4) * 1.7) * clamp01(1 - m * 2);
      titleRef.current.style.opacity = titleOpacity;
      hintRef.current.style.opacity = reduceMotion ? 0 : titleOpacity * 0.6;
      const content = reduceMotion ? 1 : mapRange(m, 0.8, 1, 0, 1);
      contentRef.current.style.opacity = content;
      contentRef.current.style.transform = `translateY(${(1 - content) * 20}px)`;
    };

    const loop = createLoop((dt) => {
      let moving = false;
      for (const s of springs) moving = s.step(dt) || moving;
      render();
      return moving;
    });

    const progress = () => {
      const rect = track.getBoundingClientRect();
      return Math.min(Math.max(-rect.top / Math.max(1, rect.height - window.innerHeight), 0), 1);
    };

    const onScroll = () => {
      const p = progress();
      morph.target = mapRange(p, 0, 0.25, 0, 1);
      rotate.target = mapRange(p, 0.25, 1, 0, 360);
      loop.wake();
    };

    if (reduceMotion) intro.set(2);
    render();

    const ro = new ResizeObserver(() => {
      w = stage.clientWidth;
      h = stage.clientHeight;
      render();
    });
    ro.observe(stage);

    // Fly-in, played the first time the section comes into view.
    let introTimer = 0;
    const introObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || reduceMotion) return;
        introObserver.disconnect();
        intro.target = 1;
        loop.wake();
        introTimer = setTimeout(() => {
          intro.target = 2;
          loop.wake();
        }, 2000);
      },
      { threshold: 0.3 },
    );
    introObserver.observe(stage);

    // Follow the scroll only while the section is near the screen.
    let listening = false;
    const scrollObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !listening) {
          listening = true;
          window.addEventListener('scroll', onScroll, { passive: true });
        } else if (!entry.isIntersecting && listening) {
          listening = false;
          window.removeEventListener('scroll', onScroll);
        }
        onScroll();
      },
      { rootMargin: '200px 0px' },
    );
    scrollObserver.observe(track);

    // Gentle mouse parallax on the arc (mouse users only).
    const onMove = (e) => {
      const rect = stage.getBoundingClientRect();
      parallax.target = (((e.clientX - rect.left) / rect.width) * 2 - 1) * 100;
      loop.wake();
    };
    const mouse = !reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (mouse) stage.addEventListener('pointermove', onMove);

    return () => {
      loop.stop();
      ro.disconnect();
      introObserver.disconnect();
      scrollObserver.disconnect();
      clearTimeout(introTimer);
      window.removeEventListener('scroll', onScroll);
      stage.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <section className="journey" id="journey" aria-labelledby="journey-title">
      <div ref={trackRef} className="journey-track">
        <div ref={stageRef} className="journey-stage">
          <div className="journey-intro" aria-hidden="true">
            <p ref={titleRef} className="journey-title" style={{ opacity: 0 }}>
              A Culinary Journey Awaits
            </p>
            <p ref={hintRef} className="journey-hint" style={{ opacity: 0 }}>
              Scroll to explore
            </p>
          </div>

          <div ref={contentRef} className="journey-content" style={{ opacity: 0 }}>
            <h2 id="journey-title">Celebrate with KCR</h2>
            <p>
              From birthday dinners to office lunches, kitty parties to festive feasts: bring your people, we&apos;ll
              bring Kerala to the table.
            </p>
          </div>

          <div className="journey-cards" aria-hidden="true">
            {CARDS.map((card, i) => {
              const p = place(i, 0, 0, 0, 0, 1200, 800);
              return (
                <div
                  key={card.image}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="journey-card"
                  style={{
                    transform: `translate(-50%, -50%) translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px) rotate(${p.r.toFixed(2)}deg) scale(${p.s})`,
                    opacity: 0,
                  }}
                >
                  <div className="journey-card-inner">
                    <div className="journey-card-front">
                      <Picture name={card.image} alt="" sizes="(max-width: 767px) 90px, 110px" blur={false} />
                    </div>
                    <div className="journey-card-back">
                      <span>Explore</span>
                      <strong>{card.label}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
