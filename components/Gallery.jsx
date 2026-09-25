'use client';
import { useEffect, useRef } from 'react';
import Picture from './Picture';
import { Spring, createLoop, mapRange } from '@/lib/spring';

const GALLERY = [
  { image: 'kizhi-parotta', alt: 'Kizhi parotta in a charred banana leaf' },
  { image: 'kerala-chicken-biryani', alt: 'Kerala chicken biryani' },
  { image: 'paneer-tikka', alt: 'Paneer tikka skewers' },
  { image: 'chicken-curry', alt: 'Chicken curry' },
  { image: 'naan-basket', alt: 'A basket of naan' },
  { image: 'chilli-chicken', alt: 'Chilli chicken with scallions' },
  { image: 'falooda', alt: 'Falooda with rose syrup' },
  { image: 'chilli-paneer', alt: 'Chilli paneer' },
  { image: 'kizhi-parcel', alt: 'Chicken kizhi parotta parcel' },
  { image: 'chicken-fried-rice', alt: 'Chicken fried rice' },
  { image: 'chilli-fish', alt: 'Fried fish with curry leaves on a banana leaf' },
  { image: 'gobi-matar', alt: 'Gobi matar curry' },
  { image: 'storefront', alt: 'The KCR storefront on Shankar Road' },
  { image: 'interior', alt: 'Inside KCR, with the Kerala mural' },
];

// Each column shows its photos twice so it never runs out while it slides.
const COLUMNS = [0, 1, 2, 3].map((c) => {
  const base = GALLERY.filter((_, i) => i % 4 === c);
  return [...base.map((g) => ({ ...g, copy: false })), ...base.map((g) => ({ ...g, copy: true }))];
});

// Vertical travel of each column (in % of its height) while the wall unfurls.
const COLUMN_Y = [
  [0, -40],
  [-40, 10],
  [0, -40],
  [-30, 20],
];

const SIZES = '(max-width: 740px) 200px, 22vw';

function ImageCard({ image, alt, copy }) {
  return (
    <div className="parallax-gallery__card">
      <Picture name={image} alt={copy ? '' : alt} sizes={SIZES} className="parallax-gallery__img" blur={false} />
    </div>
  );
}

/**
 * "A Feast for the Eyes": the framed banner opens up to full screen, then a
 * tilted wall of photos unfurls and straightens as you scroll.
 *
 * Same scroll choreography and spring as before (stiffness 100, damping 20,
 * mass 0.5), now driven by a few lines of code instead of an animation
 * library, and only while the gallery is on screen. The 14 photos used to be
 * full-size PNGs (about 35 MB); each card now loads a small AVIF/WebP.
 */
export default function Gallery() {
  const trackRef = useRef(null);
  const bannerRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const colRefs = useRef([]);

  useEffect(() => {
    const track = trackRef.current;
    const banner = bannerRef.current;
    const title = titleRef.current;
    const grid = gridRef.current;
    const cols = colRefs.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const spring = new Spring({ stiffness: 100, damping: 20, mass: 0.5, restDelta: 0.0002, restSpeed: 0.0005 });

    // 0 when the track's top reaches the top of the screen, 1 when its bottom reaches the bottom.
    const progress = () => {
      const rect = track.getBoundingClientRect();
      return Math.min(Math.max(-rect.top / Math.max(1, rect.height - window.innerHeight), 0), 1);
    };

    const apply = (p) => {
      banner.style.width = `${mapRange(p, 0, 0.15, 90, 100)}vw`;
      banner.style.height = `${mapRange(p, 0, 0.15, 80, 100)}vh`;
      banner.style.borderRadius = `${mapRange(p, 0, 0.15, 48, 0)}px`;
      banner.style.borderWidth = `${mapRange(p, 0, 0.15, 4, 0)}px`;
      title.style.opacity = mapRange(p, 0, 0.1, 1, 0);
      const z = mapRange(p, 0.15, 1, -800, 0);
      const rx = mapRange(p, 0.15, 1, 25, 4);
      const ry = mapRange(p, 0.15, 1, -45, -8);
      const rz = mapRange(p, 0.15, 1, 15, 2);
      grid.style.transform = `translateZ(${z}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`;
      cols.forEach((col, i) => {
        col.style.transform = `translateY(${mapRange(p, 0.15, 1, COLUMN_Y[i][0], COLUMN_Y[i][1])}%)`;
      });
    };

    const loop = createLoop((dt) => {
      const moving = spring.step(dt);
      apply(spring.value);
      return moving;
    });

    const onScroll = () => {
      if (reduceMotion) {
        spring.set(progress());
        apply(spring.value);
        return;
      }
      spring.target = progress();
      loop.wake();
    };

    spring.set(progress());
    apply(spring.value);

    // Only follow the scroll while the gallery is near the screen.
    let listening = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !listening) {
          listening = true;
          window.addEventListener('scroll', onScroll, { passive: true });
        } else if (!entry.isIntersecting && listening) {
          listening = false;
          window.removeEventListener('scroll', onScroll);
        }
        onScroll();
      },
      { rootMargin: '200px 0px' },
    );
    io.observe(track);
    window.addEventListener('resize', onScroll);

    return () => {
      io.disconnect();
      loop.stop();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section id="gallery" aria-labelledby="gallery-title">
      <div ref={trackRef} className="parallax-gallery__track">
        <div className="parallax-gallery__sticky">
          <div
            ref={bannerRef}
            className="parallax-gallery__banner"
            style={{ width: '90vw', height: '80vh', borderRadius: 48, borderWidth: 4 }}
          >
            <div ref={titleRef} className="parallax-gallery__title-overlay">
              <p className="eyebrow">Gallery</p>
              <h2 id="gallery-title">
                A Feast for
                <br />
                the Eyes
              </h2>
              <p className="parallax-gallery__hint">Scroll to explore</p>
            </div>

            <div className="parallax-gallery__viewport">
              <div className="parallax-gallery__shadow-h" aria-hidden="true" />
              <div className="parallax-gallery__shadow-v" aria-hidden="true" />

              <div
                ref={gridRef}
                className="parallax-gallery__grid"
                style={{ transform: 'translateZ(-800px) rotateX(25deg) rotateY(-45deg) rotateZ(15deg)' }}
              >
                {COLUMNS.map((column, c) => (
                  <div
                    key={c}
                    ref={(el) => {
                      colRefs.current[c] = el;
                    }}
                    className="parallax-gallery__col"
                    style={{ transform: `translateY(${COLUMN_Y[c][0]}%)` }}
                  >
                    {column.map((card, i) => (
                      <ImageCard key={`${card.image}-${i}`} {...card} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
