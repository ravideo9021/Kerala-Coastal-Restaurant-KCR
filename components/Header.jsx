'use client';
import { useEffect, useId, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu as MenuIcon, Phone, X } from 'lucide-react';
import Logo from './Logo';
import { SwiggyIcon, WhatsAppIcon, ZomatoIcon } from './BrandIcons';
import { site, whatsappLink } from '@/data/site';
import { hoursSummary } from '@/lib/hours';

const NAV = [
  { href: '/#about', id: 'about', label: 'About' },
  { href: '/menu', id: 'menu', label: 'Menu' },
  { href: '/#events', id: 'events', label: 'Events' },
  { href: '/#reviews', id: 'reviews', label: 'Reviews' },
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
      setScrolled(window.scrollY > 24);
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
      <div className="header-inner">
        <Logo onClick={close} />

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
              <a
                className="brand-btn brand-btn--swiggy"
                href={site.order.swiggy}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SwiggyIcon size={18} /> Swiggy
              </a>
              <a
                className="brand-btn brand-btn--zomato"
                href={site.order.zomato}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ZomatoIcon size={50} /> <span className="sr-only">Zomato</span>
              </a>
            </div>
            <div className="nav-drawer-contact">
              <a href={site.phone.href}>
                <Phone size={18} aria-hidden="true" /> {site.phone.display}
              </a>
              <a href={whatsappLink('Hi KCR! I would like to book a table.')} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={18} /> WhatsApp us
              </a>
            </div>
            <p className="nav-drawer-hours">{hoursSummary()}</p>
          </div>
        </nav>

        <div className="header-actions">
          <a className="header-call" href={site.phone.href} aria-label={`Call ${site.phone.display}`}>
            <Phone size={17} aria-hidden="true" />
            <span>{site.phone.display}</span>
          </a>
          <Link className="btn btn-red header-order" href="/#order" onClick={close}>
            Order online
          </Link>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls={navId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={26} aria-hidden="true" /> : <MenuIcon size={26} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}
