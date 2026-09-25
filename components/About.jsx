import { Clock, Leaf, UtensilsCrossed } from 'lucide-react';
import Picture from './Picture';
import MovingBorderCard from './MovingBorderCard';
import BreathingHeading from './BreathingHeading';
import { site } from '@/data/site';
import { formatTime } from '@/lib/hours';

export default function About() {
  const daily = site.hours.length === 1 && site.hours[0].days.length === 7;
  const hours = `${formatTime(site.hours[0].opens)} – ${formatTime(site.hours[0].closes)}`;

  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="about-bg" aria-hidden="true" />
      <div className="about-inner">
        <div className="about-copy">
          <p className="eyebrow reveal">Our story</p>
          <div className="reveal">
            <BreathingHeading
              id="about-title"
              align="start"
              lines={[
                { text: 'A Taste of', size: 'sm', max: 800, duration: 2.5, step: 0.18 },
                { text: 'Kerala', size: 'lg', max: 900, duration: 2, step: 0.2 },
              ]}
              tagline="God's Own Kitchen"
            />
          </div>
          <p className="lead reveal">
            Born from the backwaters and spice-laden hills of Kerala, KCR brings the flavours of coastal South
            India to Rajinder Nagar. Coconut, curry leaves, kodampuli and black pepper; fish curry and appam,
            biryani and parotta; the food Keralites miss when they are away from home.
          </p>
          <ul className="about-badges reveal">
            <li className="badge">
              <Leaf size={20} aria-hidden="true" />
              <strong>Veg &amp; non-veg</strong>
              <span>Clearly marked on the menu</span>
            </li>
            <li className="badge">
              <UtensilsCrossed size={20} aria-hidden="true" />
              <strong>Dine-in</strong>
              <span>Takeaway &amp; delivery</span>
            </li>
            <li className="badge">
              <Clock size={20} aria-hidden="true" />
              <strong>{daily ? 'Open daily' : 'Opening hours'}</strong>
              <span>{hours}</span>
            </li>
          </ul>
        </div>

        <div className="about-visual reveal">
          <div className="about-ring" data-play-when-visible="" aria-hidden="true">
            <svg viewBox="0 0 300 300">
              <defs>
                <path id="about-ring-path" d="M150,150m-120,0a120,120 0 1,1 240,0a120,120 0 1,1 -240,0" />
              </defs>
              <text>
                <textPath href="#about-ring-path">
                  KERALA COASTAL • COCONUT &amp; CURRY LEAVES • AUTHENTIC SPICES • TRADITIONAL RECIPES •
                </textPath>
              </text>
            </svg>
          </div>
          <MovingBorderCard radius={18} duration={5} color="var(--coconut)" glow={80} className="about-photo">
            <Picture
              name="interior"
              alt="Inside KCR: wooden tables and a hand-painted Kerala mural"
              sizes="(max-width: 1040px) 92vw, 560px"
            />
          </MovingBorderCard>
          <p className="about-caption">Our dining room in Rajinder Nagar</p>
        </div>
      </div>
    </section>
  );
}
