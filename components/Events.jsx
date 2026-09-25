'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { Briefcase, Cake, Heart, PartyPopper, Phone, Send, UtensilsCrossed } from 'lucide-react';
import Picture from './Picture';
import BreathingHeading from './BreathingHeading';
import { site, whatsappLink } from '@/data/site';
import { useReducedMotion } from '@/lib/useMediaQuery';

const SERVICES = [
  {
    id: 'birthday',
    label: 'Birthday parties',
    Icon: Cake,
    image: 'interior',
    alt: 'Our dining room decorated with balloons',
    description: 'Celebrate at KCR with a menu planned around your guests: veg, non-veg or both. Tell us the head-count and we’ll set the table.',
  },
  {
    id: 'kitty',
    label: 'Kitty parties',
    Icon: Heart,
    image: 'kitty-party',
    alt: 'Illustrated kitty party invitation with Kerala Coastal Restaurant as the venue',
    description: 'Monthly meet-ups made easy: a relaxed table for the group and a set menu that fits your budget.',
  },
  {
    id: 'corporate',
    label: 'Corporate events',
    Icon: Briefcase,
    image: 'banana-leaf-meal',
    alt: 'A long table set with banana-leaf meals for an office group',
    description: 'Team lunches, client dinners and office celebrations, including banana-leaf meals for the whole team.',
  },
  {
    id: 'festival',
    label: 'Festival feasts',
    Icon: PartyPopper,
    image: 'kizhi-parotta',
    alt: 'Kizhi parotta in a banana leaf',
    description: 'Onam, Vishu, Christmas, Eid or Diwali: celebrate with a proper Kerala spread, here or at home.',
  },
  {
    id: 'catering',
    label: 'Catering & bulk orders',
    Icon: UtensilsCrossed,
    image: 'kerala-chicken-biryani',
    alt: 'Kerala chicken biryani',
    description: 'Biryani, curries, parotta and more for house parties and functions, ordered in bulk and packed for you.',
  },
];

const AUTOPLAY = 3000;
const ITEM_HEIGHT = 65;

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function EnquiryForm({ occasion, setOccasion }) {
  const id = useId();

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const service = SERVICES.find((s) => s.id === data.get('occasion'));
    const date = data.get('date')
      ? new Date(`${data.get('date')}T12:00:00`).toLocaleDateString('en-IN', {
          weekday: 'short',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : '';
    const lines = ['Hi KCR! I would like to enquire about an event booking.', ''];
    lines.push(`Occasion: ${service?.label ?? 'Something else'}`);
    if (date) lines.push(`Date: ${date}`);
    if (data.get('guests')) lines.push(`Guests: ${data.get('guests')}`);
    if (data.get('name')) lines.push(`Name: ${data.get('name')}`);
    if (data.get('notes')) lines.push(`Details: ${data.get('notes')}`);
    window.open(whatsappLink(lines.join('\n')), '_blank', 'noopener,noreferrer');
  };

  return (
    <form className="enquiry reveal" onSubmit={onSubmit} aria-labelledby={`${id}-title`}>
      <h3 id={`${id}-title`}>Plan your event</h3>
      <p className="enquiry-intro">Tell us a little about it. This opens WhatsApp with your details filled in.</p>
      <div className="enquiry-grid">
        <label className="field">
          <span>Occasion</span>
          <select name="occasion" value={occasion} onChange={(e) => setOccasion(e.target.value)}>
            {SERVICES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
            <option value="other">Something else</option>
          </select>
        </label>
        <label className="field">
          <span>Date</span>
          <input type="date" name="date" required onFocus={(e) => (e.currentTarget.min = todayISO())} />
        </label>
        <label className="field">
          <span>Guests</span>
          <input type="number" name="guests" min="1" max="2000" inputMode="numeric" placeholder="e.g. 25" required />
        </label>
        <label className="field">
          <span>Your name</span>
          <input type="text" name="name" autoComplete="name" placeholder="Optional" />
        </label>
        <label className="field field--wide">
          <span>Anything else?</span>
          <textarea name="notes" rows={2} placeholder="Veg / non-veg, budget, timing, venue…" />
        </label>
      </div>
      <div className="enquiry-actions">
        <button type="submit" className="btn btn-whatsapp">
          <Send size={17} aria-hidden="true" /> Send on WhatsApp
        </button>
        <a className="enquiry-call" href={site.phone.href}>
          <Phone size={16} aria-hidden="true" /> or call {site.phone.display}
        </a>
      </div>
    </form>
  );
}

export default function Events() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [occasion, setOccasion] = useState(SERVICES[0].id);
  const reduceMotion = useReducedMotion();
  const rootRef = useRef(null);

  const count = SERVICES.length;
  const current = ((step % count) + count) % count;

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    if (rootRef.current) io.observe(rootRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !inView || reduceMotion) return;
    const t = setInterval(() => {
      if (!document.hidden) setStep((s) => s + 1);
    }, AUTOPLAY);
    return () => clearInterval(t);
  }, [paused, inView, reduceMotion]);

  const select = (index) => {
    const diff = (index - current + count) % count;
    setStep((s) => s + (diff > count / 2 ? diff - count : diff));
    setOccasion(SERVICES[index].id);
  };

  const statusOf = (index) => {
    let d = index - current;
    if (d > count / 2) d -= count;
    if (d < -count / 2) d += count;
    return d === 0 ? 'active' : d === -1 ? 'prev' : d === 1 ? 'next' : 'hidden';
  };

  return (
    <section className="events-section" id="events" aria-labelledby="events-title">
      <div className="events-inner">
        <div className="section-head">
          <p className="eyebrow reveal">Events &amp; catering</p>
          <div className="reveal">
            <BreathingHeading
              id="events-title"
              lines={[
                { text: 'We Host', size: 'md', step: 0.15 },
                { text: 'Your Joy', size: 'md', step: 0.15 },
              ]}
              tagline="Celebrations & more"
            />
          </div>
        </div>

        <div
          ref={rootRef}
          className="fc-root reveal"
          onPointerEnter={(e) => e.pointerType === 'mouse' && setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setPaused(false)}
        >
          <div className="fc-container">
            <div className="fc-sidebar">
              <div className="fc-sidebar__fade fc-sidebar__fade--top" aria-hidden="true" />
              <div className="fc-sidebar__fade fc-sidebar__fade--bottom" aria-hidden="true" />
              <div className="fc-sidebar__list" role="group" aria-label="Choose an occasion">
                {SERVICES.map((s, index) => {
                  const distance = wrap(-count / 2, count / 2, index - current);
                  const isActive = index === current;
                  return (
                    <div
                      key={s.id}
                      className="fc-sidebar__item-wrap"
                      style={{
                        transform: `translateY(${distance * ITEM_HEIGHT}px)`,
                        opacity: 1 - Math.abs(distance) * 0.12,
                      }}
                    >
                      <button
                        type="button"
                        className={`fc-chip${isActive ? ' fc-chip--active' : ''}`}
                        aria-pressed={isActive}
                        onClick={() => select(index)}
                      >
                        <s.Icon size={18} strokeWidth={2} aria-hidden="true" />
                        <span className="fc-chip__label">{s.label}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="fc-stage">
              <div className="fc-stage__inner">
                {SERVICES.map((s, index) => {
                  const status = statusOf(index);
                  return (
                    <figure key={s.id} className={`fc-card is-${status}`} aria-hidden={status !== 'active'}>
                      <Picture
                        name={s.image}
                        alt={s.alt}
                        sizes="(max-width: 740px) 86vw, 420px"
                        className="fc-card__img"
                        blur={false}
                      />
                      <figcaption className="fc-card__overlay">
                        <span className="fc-card__badge">
                          {index + 1} • {s.label}
                        </span>
                        <span className="fc-card__desc">{s.description}</span>
                      </figcaption>
                      <span className="fc-card__live" aria-hidden="true">
                        <span className="fc-card__dot" />
                        <span className="fc-card__live-text">Now booking</span>
                      </span>
                    </figure>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <EnquiryForm occasion={occasion} setOccasion={setOccasion} />
      </div>
    </section>
  );
}
