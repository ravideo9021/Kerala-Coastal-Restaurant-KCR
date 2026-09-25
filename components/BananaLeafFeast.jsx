import { Phone } from 'lucide-react';
import Picture from './Picture';
import { WhatsAppIcon } from './BrandIcons';
import { site, whatsappLink } from '@/data/site';

const SPREAD = ['Rice', 'Curries', 'Sides', 'Pickle', 'Payasam'];

export default function BananaLeafFeast() {
  return (
    <section className="feast section" aria-labelledby="feast-title">
      <div className="container feast-grid">
        <div className="feast-visual reveal">
          <div className="feast-frame">
            <Picture
              name="banana-leaf-meal"
              alt="A long table at KCR laid with banana-leaf meals: rice, curries, sides and payasam"
              sizes="(max-width: 740px) 84vw, (max-width: 1040px) 460px, 440px"
            />
          </div>
          <svg className="feast-ring spin-ring" viewBox="0 0 220 220" aria-hidden="true">
            <defs>
              <path id="feast-ring-path" d="M110,110 m-86,0 a86,86 0 1,1 172,0 a86,86 0 1,1 -172,0" />
            </defs>
            <circle cx="110" cy="110" r="104" />
            <text>
              <textPath href="#feast-ring-path" textLength="534" lengthAdjust="spacing">
                BANANA LEAF • KERALA MEALS • FEAST TOGETHER •{' '}
              </textPath>
            </text>
          </svg>
        </div>

        <div className="feast-copy reveal">
          <p className="eyebrow">Feast together</p>
          <h2 id="feast-title">
            Banana leaf meals <em>A Kerala feast for your group</em>
          </h2>
          <p className="lead">
            A proper Kerala spread, served the traditional way on a banana leaf. Made for family get-togethers, office
            lunches and festivals like Onam. Tell us your date and head-count and we&apos;ll plan it with you.
          </p>
          <ul className="feast-spread" aria-label="On the leaf">
            {SPREAD.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="feast-actions">
            <a
              className="btn btn-gold"
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
      </div>
    </section>
  );
}
