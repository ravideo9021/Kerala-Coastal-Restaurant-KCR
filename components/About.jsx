import { ChefHat, Leaf, PartyPopper, UtensilsCrossed } from 'lucide-react';
import Picture from './Picture';
import { dishCount } from '@/data/menu';

const roundedDishes = Math.floor(dishCount / 10) * 10;

export default function About() {
  return (
    <section className="about section section--open" id="about" aria-labelledby="about-title">
      <div className="container about-grid">
        <div className="about-copy reveal">
          <p className="eyebrow">Our story</p>
          <h2 id="about-title">
            A taste of <em>God&apos;s own country</em>
          </h2>
          <p className="malayalam">
            <span lang="ml">സ്വാഗതം</span>
            <span className="malayalam-note">“Welcome”, the Kerala way</span>
          </p>
          <p className="lead">
            Born from the backwaters and spice hills of Kerala, KCR brings the food of coastal South India to Rajinder
            Nagar: coconut and curry leaves, kodampuli and black pepper, fish curry with appam, biryani and flaky
            parotta.
          </p>
          <p className="lead">
            It&apos;s the food Keralites miss when they are away from home, and a warm welcome for everyone else. Dine
            in with the family, pick up on the way home, or have us deliver to your door.
          </p>
          <ul className="about-points">
            <li>
              <Leaf size={22} aria-hidden="true" />
              <strong>Veg &amp; non-veg</strong>
              <span>Clearly marked on every dish</span>
            </li>
            <li>
              <UtensilsCrossed size={22} aria-hidden="true" />
              <strong>{roundedDishes}+ dishes</strong>
              <span>Kerala, North Indian &amp; Chinese</span>
            </li>
            <li>
              <ChefHat size={22} aria-hidden="true" />
              <strong>Dine-in &amp; takeaway</strong>
              <span>Plus home delivery</span>
            </li>
            <li>
              <PartyPopper size={22} aria-hidden="true" />
              <strong>Parties &amp; catering</strong>
              <span>Banana-leaf meals for groups</span>
            </li>
          </ul>
        </div>

        <div className="about-visual reveal">
          <div className="about-frame">
            <Picture
              name="interior-mural"
              alt="The Kerala Coastal mural in our dining room: a Kathakali dancer, palm trees, a houseboat and a Kerala feast"
              sizes="(max-width: 740px) 80vw, (max-width: 1040px) 440px, 420px"
            />
          </div>
          <div className="about-dish" aria-hidden="true">
            <Picture name="kizhi-parotta-cutout" alt="" sizes="(max-width: 740px) 40vw, 240px" />
          </div>
          <div className="about-seal" aria-hidden="true">
            <svg className="spin-ring" viewBox="0 0 300 300">
              <defs>
                <path id="about-ring-path" d="M150,150 m-112,0 a112,112 0 1,1 224,0 a112,112 0 1,1 -224,0" />
              </defs>
              <circle cx="150" cy="150" r="146" />
              <text>
                <textPath href="#about-ring-path" textLength="700" lengthAdjust="spacing">
                  AUTHENTIC • KERALA • KITCHEN • RAJINDER NAGAR • NEW DELHI •
                </textPath>
              </text>
            </svg>
            <span className="about-seal-mark">KCR</span>
          </div>
        </div>
      </div>
    </section>
  );
}
