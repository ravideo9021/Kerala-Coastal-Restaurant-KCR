'use client';
import { useEffect } from 'react';

/**
 * Small page-wide helpers that don't belong to one section:
 *
 * - Looping decorations (moving borders, breathing headings, spinning rings,
 *   tickers) marked `data-play-when-visible` only animate while on screen.
 * - Section reveals are pure CSS (scroll-driven animations). Browsers without
 *   them get the same fade-up from an IntersectionObserver instead.
 * - Signature cards tilt towards the mouse on desktop.
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

    // 3D tilt on the signature cards (mouse, wide screens).
    if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1041px)').matches) {
      const cards = document.querySelectorAll('[data-tilt]');
      const tilt = (e) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
      };
      const reset = (e) => {
        e.currentTarget.style.transform = '';
      };
      cards.forEach((c) => {
        c.addEventListener('pointermove', tilt);
        c.addEventListener('pointerleave', reset);
      });
      cleanups.push(() =>
        cards.forEach((c) => {
          c.removeEventListener('pointermove', tilt);
          c.removeEventListener('pointerleave', reset);
        }),
      );
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
