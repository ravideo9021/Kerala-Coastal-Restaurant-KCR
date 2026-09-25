'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import Picture from './Picture';
import OrderButton from './OrderButton';
import { useReducedMotion } from '@/lib/useMediaQuery';

// Portrait screens only see a narrow slice of the wide storefront photo, so
// they get a portrait crop of it (half the bytes for the first paint).
const PORTRAIT = '(max-aspect-ratio: 3/4)';

const SLIDES = [
  {
    image: 'storefront',
    alt: 'The Kerala Coastal Restaurant signboard on Shankar Road',
    art: { name: 'storefront-portrait', media: PORTRAIT, sizes: '100vw' },
    portrait: '30% 50%',
  },
  { image: 'kizhi-parotta', alt: 'Kizhi parotta wrapped in a charred banana leaf' },
  { image: 'kerala-chicken-biryani', alt: 'Kerala chicken biryani with lime and fried onions' },
  { image: 'chilli-chicken', alt: 'Glossy chilli chicken with scallions' },
  { image: 'interior', alt: 'Our dining room with its Kerala mural', portrait: '28% 50%' },
  { image: 'chilli-fish', alt: 'Spicy fried fish with curry leaves on a banana leaf' },
  { image: 'chicken-curry', alt: 'Chicken curry in a white bowl' },
];

const INTERVAL = 4500;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hold, setHold] = useState(false);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [ready, setReady] = useState(false);
  // Slides are fetched one step ahead of the one on screen, not all at once.
  const [loadedUpTo, setLoadedUpTo] = useState(0);
  const reduceMotion = useReducedMotion();
  const rootRef = useRef(null);

  // Start the slideshow only after the page (and the first photo) has loaded.
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
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    if (rootRef.current) io.observe(rootRef.current);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      io.disconnect();
    };
  }, []);

  const goTo = useCallback((index) => {
    const next = (index + SLIDES.length) % SLIDES.length;
    setCurrent(next);
    setLoadedUpTo((n) => Math.max(n, Math.min(next + 1, SLIDES.length - 1)));
  }, []);

  const playing = ready && !userPaused && !hold && inView && pageVisible && !reduceMotion;

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => goTo(current + 1), INTERVAL);
    return () => clearTimeout(timer);
  }, [playing, current, goTo]);

  return (
    <section
      id="home"
      ref={rootRef}
      className="kcr-hero"
      aria-label="Welcome to Kerala Coastal Restaurant"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHold(true)}
      onPointerLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHold(false)}
    >
      <div className="kcr-hero__container">
        <div className="kcr-hero__slides" aria-roledescription="carousel" aria-label="Photos of KCR and our food">
          {SLIDES.map((s, i) =>
            i <= loadedUpTo ? (
              <div
                key={s.image}
                className={`kcr-hero__slide${i === current ? ' is-active' : ''}`}
                aria-hidden={i !== current}
                style={s.portrait ? { '--pos-portrait': s.portrait } : undefined}
              >
                <Picture
                  name={s.image}
                  alt={s.alt}
                  art={s.art}
                  sizes={`${PORTRAIT} 150vh, 100vw`}
                  priority={i === 0}
                  fetchPriority={i === 0 ? 'high' : 'low'}
                  blur={false}
                />
              </div>
            ) : null,
          )}
        </div>
        <div className="kcr-hero__noise" aria-hidden="true" />
        <div className="kcr-hero__gradient" aria-hidden="true" />

        <div className="kcr-hero__content">
          <div className="kcr-hero__grid">
            <div className="kcr-hero__left">
              <p className="kcr-hero__greeting" lang="ml-Latn">
                Swaagatham
              </p>
              <h1 className="kcr-hero__title">
                <span className="kcr-hero__word">Kerala</span>
                <span className="kcr-hero__word">Coastal</span>
                <span className="sr-only"> Restaurant (KCR)</span>
              </h1>
              <p className="kcr-hero__tagline">Authentic Kerala cuisine in Delhi</p>
            </div>

            <div className="kcr-hero__right">
              <p className="kcr-hero__desc">
                Kerala fish curry, meen pollichathu, Thalassery biryani, kizhi parotta and appam, cooked the way
                they are back home, right here in Rajinder Nagar.
              </p>
              <div className="kcr-hero__cta-row">
                <OrderButton brand="swiggy" />
                <OrderButton brand="zomato" />
              </div>
            </div>
          </div>
        </div>

        <div className="kcr-hero__controls">
          <div className="kcr-hero__dots">
            {SLIDES.map((s, i) => (
              <button
                key={s.image}
                type="button"
                className={`kcr-hero__dot${i === current ? ' is-active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Show photo ${i + 1} of ${SLIDES.length}`}
                aria-current={i === current ? 'true' : undefined}
              />
            ))}
          </div>
          {!reduceMotion && (
            <button
              type="button"
              className="kcr-hero__pause"
              onClick={() => setUserPaused((v) => !v)}
              aria-label={userPaused ? 'Play slideshow' : 'Pause slideshow'}
            >
              {userPaused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
