'use client';
import { useState, useEffect, useCallback } from 'react';
import { Phone, ArrowRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <button
        className={`mobile-toggle${mobileOpen ? ' active' : ''}`}
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Toggle navigation"
      >
        <span />
        <span />
        <span />
      </button>

      <a href="#home" className="logo" onClick={closeMobile}>
        <div>
          <div className="logo-main">KCR</div>
          <div className="logo-main logo-sub">Kerala Coastal</div>
        </div>
      </a>

      <nav className={`nav${mobileOpen ? ' open' : ''}`}>
        {NAV_LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className={activeSection === l.href.slice(1) ? 'active' : ''}
            onClick={closeMobile}
          >
            {l.label}
          </a>
        ))}
      </nav>

      <a href="tel:+917633019866" className="header-cta">
        <span className="cta-dot" />
        <span className="cta-label">
          <Phone size={16} />
          <span>Call Now</span>
        </span>
        <span className="cta-hover">
          <Phone size={16} />
          <span>+91 76330 19866</span>
        </span>
      </a>
    </header>
  );
}
