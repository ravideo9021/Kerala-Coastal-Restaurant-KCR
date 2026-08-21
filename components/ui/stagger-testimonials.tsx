'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: 'The Kerala fish curry is absolutely divine! Reminds me of my grandmother\'s cooking back in Kochi.',
    by: 'Ananya S., Food Blogger',
  },
  {
    tempId: 1,
    testimonial: 'Best Thalassery biryani I\'ve had outside Kerala. The flavors are spot on. A must try!',
    by: 'Rajesh M., Regular Customer',
  },
  {
    tempId: 2,
    testimonial: 'Amazing appam and stew combo. The coconut stew was creamy and perfectly spiced.',
    by: 'Priya K., Google Review',
  },
  {
    tempId: 3,
    testimonial: 'The prawns ularthiyathu was a game changer. Spicy, flavorful and cooked to perfection.',
    by: 'Vikram R., Zomato Review',
  },
  {
    tempId: 4,
    testimonial: 'Lovely ambiance and authentic Kerala food. The kizhi parotta is a must-try here!',
    by: 'Meera D., Swiggy Review',
  },
  {
    tempId: 5,
    testimonial: 'SO HAPPY WE FOUND THIS PLACE! Authentic Kerala seafood in Delhi. The karimeen fry is the best!',
    by: 'Jeremy T., Food Critic',
  },
  {
    tempId: 6,
    testimonial: 'Took some convincing to try, but now we come here every weekend. The meen pollichathu is legendary.',
    by: 'Pam S., Dineout Review',
  },
  {
    tempId: 7,
    testimonial: 'The sadya thali is incredible value. Every dish tastes homemade. 10/10 would recommend.',
    by: 'Daniel K., Google Review',
  },
  {
    tempId: 8,
    testimonial: 'It\'s just the best Kerala restaurant in Delhi. Period.',
    by: 'Fernando A., Swiggy Review',
  },
  {
    tempId: 9,
    testimonial: 'I switched from my regular South Indian place 2 years ago and never looked back.',
    by: 'Andy P., Regular Customer',
  },
  {
    tempId: 10,
    testimonial: 'I\'ve been searching for authentic Kerala food in Delhi for YEARS. So glad I finally found KCR!',
    by: 'Pete R., Zomato Review',
  },
  {
    tempId: 11,
    testimonial: 'The crab roast and Kerala parotta combo is heavenly. Staff is super friendly too.',
    by: 'Marina L., Google Review',
  },
];

interface TestimonialCardProps {
  position: number;
  testimonial: (typeof testimonials)[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        cursor: 'pointer',
        border: `2px solid ${isCenter ? 'var(--teal)' : 'var(--line)'}`,
        padding: '32px',
        transition: 'all 500ms ease-in-out',
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? '0px 8px 0px 4px var(--teal)'
          : '0px 0px 0px 0px transparent',
        zIndex: isCenter ? 10 : 0,
        background: isCenter ? 'var(--teal)' : 'var(--charcoal)',
        color: isCenter ? '#fff' : 'var(--cream)',
      }}
    >
      <span
        style={{
          position: 'absolute',
          display: 'block',
          transformOrigin: 'top right',
          transform: 'rotate(45deg)',
          background: isCenter ? 'rgba(255,255,255,.2)' : 'var(--line)',
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
        }}
      />
      <div
        style={{
          width: 48,
          height: 56,
          marginBottom: 16,
          background: isCenter ? 'rgba(255,255,255,.15)' : 'var(--warm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
          borderRadius: 4,
          boxShadow: `3px 3px 0px ${isCenter ? 'rgba(0,0,0,.2)' : 'var(--ink)'}`,
        }}
      >
        {isCenter ? '★' : '☆'}
      </div>
      <h3
        style={{
          fontSize: cardSize > 300 ? 18 : 15,
          fontWeight: 500,
          lineHeight: 1.5,
          color: isCenter ? '#fff' : 'var(--cream)',
          fontFamily: 'var(--body)',
        }}
      >
        &ldquo;{testimonial.testimonial}&rdquo;
      </h3>
      <p
        style={{
          position: 'absolute',
          bottom: 32,
          left: 32,
          right: 32,
          marginTop: 8,
          fontSize: 14,
          fontStyle: 'italic',
          color: isCenter ? 'rgba(255,255,255,.8)' : 'var(--muted)',
        }}
      >
        - {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia('(min-width: 640px)');
      setCardSize(matches ? 365 : 290);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        height: 600,
        background: 'var(--charcoal)',
      }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position =
          testimonialsList.length % 2
            ? index - (testimonialsList.length + 1) / 2
            : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 8,
        }}
      >
        <button
          onClick={() => handleMove(-1)}
          style={{
            display: 'flex',
            width: 56,
            height: 56,
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            background: 'var(--ink)',
            border: '2px solid var(--line)',
            color: 'var(--cream)',
            cursor: 'pointer',
            transition: 'background .2s, color .2s',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.background = 'var(--teal)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.background = 'var(--ink)';
          }}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          style={{
            display: 'flex',
            width: 56,
            height: 56,
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            background: 'var(--ink)',
            border: '2px solid var(--line)',
            color: 'var(--cream)',
            cursor: 'pointer',
            transition: 'background .2s, color .2s',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.background = 'var(--teal)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.background = 'var(--ink)';
          }}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
