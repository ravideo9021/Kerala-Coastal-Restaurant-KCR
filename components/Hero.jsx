'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import Picture from './Picture';
import OrderButton from './OrderButton';
import { useReducedMotion } from '@/lib/useMediaQuery';

const SLIDES = [
  {
    bg: 'hero-bg-biryani',
    food: 'kerala-chicken-biryani-cutout',
    alt: 'Kerala chicken biryani on a brass plate with lime, mint and fried onions',
    kicker: 'Slow-cooked on dum',
    title: ['Kerala', 'Chicken', 'Biryani'],
    sub: 'Fragrant rice, whole spices & fried onions',
  },
  {
    bg: 'hero-bg-kizhi',
    food: 'kizhi-parcel',
    alt: 'Kizhi parotta: parotta and chicken masala in an opened banana-leaf parcel',
    kicker: 'A Kerala street classic',
    title: ['Chicken', 'Kizhi', 'Parotta'],
    sub: 'Parotta & chicken masala, roasted in banana leaf',
  },
  {
    bg: 'hero-bg-fish',
    food: 'chilli-fish-cutout',
    alt: 'Crisp fried fish with curry leaves and red peppers',
    kicker: 'Straight from the coast',
    title: ['Coastal', 'Fish', 'Fry'],
    sub: 'Chilli, pepper & curry leaves, fried crisp',
  },
  {
    bg: 'hero-bg-paneer',
    food: 'chilli-paneer-cutout',
    alt: 'Chilli paneer with peppers and onions in a black bowl',
    kicker: 'For our veg friends',
    title: ['Fiery', 'Chilli', 'Paneer'],
    sub: 'Wok-tossed with peppers, onion & chilli',
  },
];

const INTERVAL = 6000;
const FOOD_SIZES = '(max-width: 740px) 66vw, (max-width: 1040px) 430px, 560px';

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(null);
  const [userPaused, setUserPaused] = useState(false);
  const [hold, setHold] = useState(false);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const [interacted, setInteracted] = useState(false);
  // Slides are fetched one step ahead of the one on screen, not all at once.
  const [loadedUpTo, setLoadedUpTo] = useState(0);
  const reduceMotion = useReducedMotion();
  const rootRef = useRef(null);

  // Start the slideshow only after the page (and the first dish) has loaded.
  useEffect(() => {
    const start = () => {
      const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1200));
      idle(() => {
        setReady(true);
        setLoadedUpTo(1);
      });
    };
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });
    return () => window.removeEventListener('load', start);
  }, []);

  useEffect(() => {
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    if (rootRef.current) io.observe(rootRef.current);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      io.disconnect();
    };
  }, []);

  const goTo = useCallback(
    (index) => {
      const next = (index + SLIDES.length) % SLIDES.length;
      if (next === current) return;
      setPrevious(current);
      setCurrent(next);
      setInteracted(true);
      setLoadedUpTo((n) => Math.max(n, Math.min(next + 1, SLIDES.length - 1)));
    },
    [current],
  );

  const playing = ready && !userPaused && !hold && inView && pageVisible && !reduceMotion;

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => goTo(current + 1), INTERVAL);
    return () => clearTimeout(timer);
  }, [playing, current, goTo]);

  const slide = SLIDES[current];

  return (
    <section
      ref={rootRef}
      className="hero"
      aria-roledescription="carousel"
      aria-label="Signature dishes"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHold(true)}
      onPointerLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHold(false)}
    >
      <div className="hero-bgs" aria-hidden="true">
        {SLIDES.map((s, i) =>
          i <= loadedUpTo ? (
            <div key={s.bg} className={`hero-bg${i === current ? ' is-active' : ''}`}>
              <Picture
                name={s.bg}
                alt=""
                sizes="100vw"
                priority={i === 0}
                fetchPriority={i === 0 ? 'high' : 'low'}
                blur={false}
              />
            </div>
          ) : null,
        )}
      </div>
      <div className="hero-shade" aria-hidden="true" />

      <div className="hero-inner">
        <div className="hero-visual">
          <div className="hero-glow" aria-hidden="true" />
          <svg className="hero-ring" viewBox="0 0 400 400" aria-hidden="true">
            <defs>
              <path id="hero-ring-path" d="M200,200 m-180,0 a180,180 0 1,1 360,0 a180,180 0 1,1 -360,0" />
            </defs>
            <circle cx="200" cy="200" r="197" />
            <text>
              <textPath href="#hero-ring-path" textLength="1122" lengthAdjust="spacing">
                KERALA COASTAL RESTAURANT • AUTHENTIC KERALA CUISINE • RAJINDER NAGAR • NEW DELHI •
              </textPath>
            </text>
          </svg>
          <div className="hero-steam" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          {SLIDES.map((s, i) => {
            if (i > loadedUpTo) return null;
            const state =
              i === current ? (interacted ? 'is-entering' : 'is-active') : i === previous ? 'is-leaving' : '';
            return (
              <div key={s.food} className={`hero-plate ${state}`} aria-hidden={i !== current}>
                <Picture
                  name={s.food}
                  alt={i === current ? s.alt : ''}
                  sizes={FOOD_SIZES}
                  priority={i === 0}
                  fetchPriority={i === 0 ? 'high' : 'low'}
                />
              </div>
            );
          })}
        </div>

        <div className="hero-copy">
          <h1 className="hero-eyebrow">Kerala restaurant · Rajinder Nagar, New Delhi</h1>
          <div
            key={current}
            className={`hero-slide-text${interacted ? ' is-changing' : ''}`}
            aria-live={playing ? 'off' : 'polite'}
          >
            <p className="hero-kicker">{slide.kicker}</p>
            <p className="hero-title">
              {slide.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
            <p className="hero-sub">{slide.sub}</p>
          </div>

          <div className="hero-actions">
            <OrderButton brand="swiggy" />
            <OrderButton brand="zomato" />
          </div>
          <div className="hero-meta">
            <Link href="/menu" className="hero-menu-link">
              See the full menu
            </Link>
          </div>
        </div>
      </div>

      <div className="hero-controls">
        <button type="button" className="hero-arrow" onClick={() => goTo(current - 1)} aria-label="Previous dish">
          <ChevronLeft size={22} aria-hidden="true" />
        </button>
        <div className="hero-dots">
          {SLIDES.map((s, i) => (
            <button
              key={s.food}
              type="button"
              className={`hero-dot${i === current ? ' is-active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Show ${s.title.join(' ')}`}
              aria-current={i === current ? 'true' : undefined}
            />
          ))}
        </div>
        <button type="button" className="hero-arrow" onClick={() => goTo(current + 1)} aria-label="Next dish">
          <ChevronRight size={22} aria-hidden="true" />
        </button>
        {!reduceMotion && (
          <button
            type="button"
            className="hero-arrow hero-pause"
            onClick={() => setUserPaused((v) => !v)}
            aria-label={userPaused ? 'Play slideshow' : 'Pause slideshow'}
          >
            {userPaused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
          </button>
        )}
      </div>
    </section>
  );
}
