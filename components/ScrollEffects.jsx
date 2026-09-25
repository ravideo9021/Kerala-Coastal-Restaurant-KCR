'use client';
import { useEffect } from 'react';

/**
 * Small page-wide helpers that don't belong to one section:
 *
 * - Looping decorations marked `data-play-when-visible` (the tickers) only
 *   animate while on screen.
 * - Section reveals are pure CSS (scroll-driven animations). Browsers without
 *   them get the same fade-up from an IntersectionObserver instead.
 */
export default function ScrollEffects() {
  useEffect(() => {
    const cleanups = [];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Pause looping animations off screen.
    const playObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('is-playing', e.isIntersecting)),
      { rootMargin: '120px 0px' },
    );
    document.querySelectorAll('[data-play-when-visible]').forEach((el) => playObserver.observe(el));
    cleanups.push(() => playObserver.disconnect());

    // Reveal fallback for browsers without scroll-driven animations.
    if (!reduceMotion && !CSS.supports('animation-timeline: view()')) {
      document.documentElement.classList.add('io-reveal');
      const revealObserver = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in-view');
              revealObserver.unobserve(e.target);
            }
          }),
        { rootMargin: '0px 0px -60px 0px', threshold: 0.12 },
      );
      document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
      cleanups.push(() => revealObserver.disconnect());
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
