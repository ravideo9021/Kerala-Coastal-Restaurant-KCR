'use client';
import { useEffect, useId, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone } from 'lucide-react';
import OrderButton from './OrderButton';
import { WhatsAppIcon } from './BrandIcons';
import { site, whatsappLink } from '@/data/site';
import { hoursSummary } from '@/lib/hours';

const NAV = [
  { href: '/#about', id: 'about', label: 'About' },
  { href: '/menu', id: 'menu', label: 'Menu' },
  { href: '/#events', id: 'events', label: 'Events' },
  { href: '/#gallery', id: 'gallery', label: 'Gallery' },
  { href: '/#visit', id: 'visit', label: 'Visit' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [sectionInView, setSectionInView] = useState(null);
  const navId = useId();

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setScrolled(window.scrollY > 60);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the section in the middle of the screen (home page).
  useEffect(() => {
    if (pathname !== '/') return;
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    const visible = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        setSectionInView(NAV.find((n) => visible.has(n.id))?.id ?? null);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  // Mobile drawer: lock page scroll and close on Escape.
  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add('nav-open');
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.classList.remove('nav-open');
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const close = () => setOpen(false);
  const active = pathname === '/' ? sectionInView : pathname.startsWith('/menu') ? 'menu' : null;

  return (
    <header className={`site-header${scrolled || open ? ' is-solid' : ''}`}>
      <button
        type="button"
        className={`nav-toggle${open ? ' is-open' : ''}`}
        aria-expanded={open}
        aria-controls={navId}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      <Link href="/" className="logo" onClick={close}>
        <span className="logo-main">KCR</span>{' '}
        <span className="logo-sub">Kerala Coastal</span>
      </Link>

      <nav id={navId} className={`site-nav${open ? ' is-open' : ''}`} aria-label="Main">
        <ul className="nav-links">
          {NAV.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className={active === item.id ? 'is-active' : undefined}
                aria-current={active === item.id && pathname !== '/' ? 'page' : undefined}
                onClick={close}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-drawer-extras">
          <p className="nav-drawer-label">Order online</p>
          <div className="nav-drawer-order">
            <OrderButton brand="swiggy" />
            <OrderButton brand="zomato" />
          </div>
          <div className="nav-drawer-contact">
            <a href={site.phone.href}>
              <Phone size={18} aria-hidden="true" /> {site.phone.display}
            </a>
            <a
              href={whatsappLink('Hi KCR! I would like to book a table.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={18} /> WhatsApp us
            </a>
          </div>
          <p className="nav-drawer-hours">{hoursSummary()}</p>
        </div>
      </nav>

      <a href={site.phone.href} className="header-cta" aria-label={`Call ${site.phone.display}`}>
        <span className="cta-dot" aria-hidden="true" />
        <span className="cta-label" aria-hidden="true">
          <Phone size={16} />
          <span>Call now</span>
        </span>
        <span className="cta-hover" aria-hidden="true">
          <Phone size={16} />
          <span>{site.phone.display}</span>
        </span>
      </a>
    </header>
  );
}
