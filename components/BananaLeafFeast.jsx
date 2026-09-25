import { Phone } from 'lucide-react';
import Picture from './Picture';
import { WhatsAppIcon } from './BrandIcons';
import { site, whatsappLink } from '@/data/site';

export default function BananaLeafFeast() {
  return (
    <section className="feast" aria-labelledby="feast-title">
      <div className="feast-photo">
        <Picture
          name="banana-leaf-meal"
          alt="A long table at KCR laid with banana-leaf meals: rice, curries, sides and payasam"
          sizes="(max-width: 1040px) 100vw, 50vw"
        />
      </div>
      <div className="feast-overlay" aria-hidden="true" />

      <div className="dish-rotor" data-play-when-visible="" aria-hidden="true">
        <svg viewBox="0 0 220 220">
          <circle cx="110" cy="110" r="100" />
          <defs>
            <path id="dish-path" d="M110,110m-80,0a80,80 0 1,1 160,0a80,80 0 1,1 -160,0" />
          </defs>
          <text>
            <textPath href="#dish-path">BANANA LEAF • KERALA MEALS • FEAST TOGETHER •</textPath>
          </text>
        </svg>
      </div>

      <div className="feast-content reveal">
        <p className="eyebrow">Feast together</p>
        <h2 id="feast-title">
          Banana Leaf
          <br />
          Meals
          <em>A Kerala feast for your group</em>
        </h2>
        <p>
          Rice with a spread of curries, sides, pickle and payasam, served the traditional way on a banana leaf.
          Made for family get-togethers, office lunches and festivals like Onam. Tell us your date and head-count
          and we&apos;ll plan the spread with you.
        </p>
        <div className="feast-actions">
          <a
            className="btn btn-coconut"
            href={whatsappLink('Hi KCR! I would like to book a banana leaf meal for a group.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={18} /> Plan a group meal
          </a>
          <a className="btn btn-outline" href={site.phone.href}>
            <Phone size={17} aria-hidden="true" /> {site.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
