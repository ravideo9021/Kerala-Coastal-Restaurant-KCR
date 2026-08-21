'use client';
import { useEffect } from 'react';

export default function ScrollEffects() {
  useEffect(() => {
    document.body.classList.add('js-reveal');

    const revealObs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in-view'); }),
      { rootMargin: '0px 0px -60px 0px', threshold: 0.15 }
    );
    document.querySelectorAll('.reveal').forEach((el) => revealObs.observe(el));

    const menuObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const items = e.target.querySelectorAll('li');
            items.forEach((li, i) => setTimeout(() => li.classList.add('stagger-in'), i * 40));
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.menu-list').forEach((el) => menuObs.observe(el));

    const galleryObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const items = e.target.querySelectorAll('.gallery-item');
            items.forEach((el, i) => setTimeout(() => el.classList.add('gallery-in'), i * 80));
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.gallery-grid').forEach((el) => galleryObs.observe(el));

    const onScroll = () => {
      const sy = window.scrollY;
      document.querySelectorAll('.svg-spin').forEach((el) => {
        el.style.transform = el.classList.contains('about-ring')
          ? `translate(-50%,-50%) rotate(${sy * 0.04}deg)`
          : `rotate(${sy * 0.04}deg)`;
      });
      document.querySelectorAll('.parallax-up').forEach((el) => {
        el.style.transform = `translateY(${-sy * 0.04}px)`;
      });
      document.querySelectorAll('.parallax-down').forEach((el) => {
        el.style.transform = `translateY(${sy * 0.03}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const btt = document.createElement('button');
    btt.className = 'back-to-top';
    btt.innerHTML = '↑';
    btt.setAttribute('aria-label', 'Back to top');
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.body.appendChild(btt);

    const bttCheck = () => {
      btt.classList.toggle('visible', window.scrollY > 600);
    };
    window.addEventListener('scroll', bttCheck, { passive: true });
    bttCheck();

    const cards = document.querySelectorAll('.sig-card');
    const tilt = (e) => {
      if (window.innerWidth < 1040) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      e.currentTarget.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    };
    const resetTilt = (e) => {
      e.currentTarget.style.transform = '';
    };
    cards.forEach((c) => {
      c.addEventListener('mousemove', tilt);
      c.addEventListener('mouseleave', resetTilt);
    });

    const counters = document.querySelectorAll('.counter');
    const counterObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          const target = parseInt(el.dataset.target, 10);
          if (isNaN(target)) return;
          let current = 0;
          const step = Math.max(1, Math.floor(target / 60));
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = current;
          }, 20);
          counterObs.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => counterObs.observe(c));

    return () => {
      revealObs.disconnect();
      menuObs.disconnect();
      galleryObs.disconnect();
      counterObs.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', bttCheck);
      btt.remove();
      cards.forEach((c) => {
        c.removeEventListener('mousemove', tilt);
        c.removeEventListener('mouseleave', resetTilt);
      });
    };
  }, []);

  return null;
}
