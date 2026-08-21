'use client';
import React, { forwardRef } from 'react';

const FOOD_IMAGES = [
  '/media/Charred Banana Leaf Kizhi Parotta.png',
  '/media/Kerala Chicken Biryani.png',
  '/media/Spicy Grilled Paneer Tikka Skewers.png',
  '/media/Indian Chicken Curry Bowl.png',
  '/media/Naan Basket.png',
  '/media/Glossy Chili Chicken with Scallions.png',
  '/media/Falooda Sundae with Rose Syrup.png',
  '/media/Chilli Paneer Gravy Feast.png',
  '/media/Steaming Chicken Kizhi Parotta Parcel.png',
  '/media/Rustic Chicken Fried Rice Feast.png',
  '/media/Spicy Chilli Fish on Banana Leaf.png',
  '/media/govi_matar.png',
  '/media/restorent_inside.jpg',
];

const imgStyle: React.CSSProperties = {
  transition: 'all 300ms',
  width: '100%',
  objectFit: 'cover',
  borderRadius: '8px',
  verticalAlign: 'bottom',
};

const StickyScrollGallery = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} id="gallery" style={{ background: 'var(--ink)' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          background: 'var(--charcoal)',
          display: 'grid',
          placeContent: 'center',
          color: '#fff',
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(to right, rgba(79,79,79,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(79,79,79,0.18) 1px, transparent 1px)',
            backgroundSize: '54px 54px',
            maskImage:
              'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
          }}
        />
        <div style={{ textAlign: 'center', padding: '0 32px', position: 'relative', zIndex: 2 }}>
          <p className="eyebrow">Gallery</p>
          <h2
            style={{
              fontSize: 'clamp(42px,6vw,80px)',
              lineHeight: 1.2,
              fontWeight: 600,
              letterSpacing: '-1px',
            }}
          >
            A Feast for<br />the Eyes
            <em
              style={{
                fontFamily: 'var(--script)',
                color: 'var(--teal-light)',
                fontWeight: 400,
                fontStyle: 'normal',
                textTransform: 'none',
                display: 'block',
                marginTop: '6px',
                fontSize: '0.5em',
                letterSpacing: '1px',
              }}
            >
              Scroll down
            </em>
          </h2>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '8px',
          padding: '0 8px',
          background: 'var(--charcoal)',
        }}
      >
        {/* Left column — scrolls */}
        <div style={{ display: 'grid', gap: '8px' }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <figure key={i} style={{ width: '100%', margin: 0 }}>
              <img
                src={FOOD_IMAGES[i % FOOD_IMAGES.length]}
                alt={`Gallery ${i + 1}`}
                style={{ ...imgStyle, height: '384px' }}
              />
            </figure>
          ))}
        </div>

        {/* Center column — sticky */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            width: '100%',
            display: 'grid',
            gridTemplateRows: '1fr 1fr 1fr',
            gap: '8px',
          }}
        >
          {[5, 6, 7].map((i) => (
            <figure key={i} style={{ width: '100%', height: '100%', margin: 0 }}>
              <img
                src={FOOD_IMAGES[i % FOOD_IMAGES.length]}
                alt={`Gallery ${i + 1}`}
                style={{ ...imgStyle, height: '100%' }}
              />
            </figure>
          ))}
        </div>

        {/* Right column — scrolls */}
        <div style={{ display: 'grid', gap: '8px' }}>
          {[8, 9, 10, 11, 12].map((i) => (
            <figure key={i} style={{ width: '100%', margin: 0 }}>
              <img
                src={FOOD_IMAGES[i % FOOD_IMAGES.length]}
                alt={`Gallery ${i + 1}`}
                style={{ ...imgStyle, height: '384px' }}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
});

StickyScrollGallery.displayName = 'StickyScrollGallery';

export default StickyScrollGallery;
