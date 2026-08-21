'use client';
import React, { forwardRef } from 'react';

const GALLERY_ITEMS = [
  { src: '/media/Charred Banana Leaf Kizhi Parotta.png', label: 'Kizhi Parotta' },
  { src: '/media/Kerala Chicken Biryani.png', label: 'Kerala Biryani' },
  { src: '/media/Spicy Grilled Paneer Tikka Skewers.png', label: 'Paneer Tikka' },
  { src: '/media/Indian Chicken Curry Bowl.png', label: 'Chicken Curry' },
  { src: '/media/Naan Basket.png', label: 'Naan Basket' },
  { src: '/media/Glossy Chili Chicken with Scallions.png', label: 'Chilli Chicken' },
  { src: '/media/Falooda Sundae with Rose Syrup.png', label: 'Falooda' },
  { src: '/media/Chilli Paneer Gravy Feast.png', label: 'Chilli Paneer' },
  { src: '/media/Steaming Chicken Kizhi Parotta Parcel.png', label: 'Kizhi Parcel' },
  { src: '/media/Rustic Chicken Fried Rice Feast.png', label: 'Fried Rice' },
  { src: '/media/Spicy Chilli Fish on Banana Leaf.png', label: 'Chilli Fish' },
  { src: '/media/govi_matar.png', label: 'Gobi Matar' },
  { src: '/media/restorent_front.png', label: 'Our Restaurant' },
  { src: '/media/restorent_inside.jpg', label: 'Dine With Us' },
];

const StickyScrollGallery = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} id="gallery" className="gallery-section">
      <div className="gallery-top">
        <p className="eyebrow">Gallery</p>
        <h2>
          A Feast for the Eyes
          <em>Our Culinary Creations</em>
        </h2>
      </div>
      <div className="gallery-masonry">
        {GALLERY_ITEMS.map((item, i) => (
          <figure key={i} className={`gallery-card${i % 5 === 0 ? ' gallery-card--tall' : ''}`}>
            <img src={item.src} alt={item.label} loading="lazy" />
            <figcaption className="gallery-card__caption">
              <span className="gallery-card__name">{item.label}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
});

StickyScrollGallery.displayName = 'StickyScrollGallery';

export default StickyScrollGallery;
