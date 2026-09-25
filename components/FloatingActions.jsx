'use client';
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';
import { whatsappLink } from '@/data/site';

/**
 * WhatsApp and back-to-top buttons for larger screens (phones get the action
 * bar instead). They appear once the hero has scrolled away, so they never sit
 * on top of the hero text.
 */
export default function FloatingActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
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

  const toTop = () =>
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });

  return (
    <div className={`floating-actions${visible ? ' is-visible' : ''}`}>
      <a
        href={whatsappLink("Hi KCR, I'd like to know more!")}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat with us on WhatsApp"
        tabIndex={visible ? undefined : -1}
      >
        <WhatsAppIcon size={28} color="#fff" />
        <span className="whatsapp-float__pulse" aria-hidden="true" />
        <span className="whatsapp-float__tip" aria-hidden="true">
          Chat with us
        </span>
      </a>
      <button
        type="button"
        className="back-to-top"
        aria-label="Back to top"
        tabIndex={visible ? undefined : -1}
        onClick={toTop}
      >
        <ArrowUp size={20} aria-hidden="true" />
      </button>
    </div>
  );
}
