'use client';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

/**
 * The staggered card stack from the previous site, now fed only with genuine
 * reviews from data/reviews.js (see Reviews.jsx). Click a side card or use
 * the arrows to bring it to the centre.
 */
function Card({ review, position, cardSize, onMove }) {
  const isCenter = position === 0;
  return (
    <li
      className={`rs-card${isCenter ? ' is-center' : ''}`}
      onClick={() => onMove(position)}
      aria-hidden={!isCenter}
      style={{
        width: cardSize,
        height: cardSize,
        transform: `translate(-50%, -50%) translateX(${(cardSize / 1.5) * position}px) translateY(${
          isCenter ? -65 : position % 2 ? 15 : -15
        }px) rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)`,
        zIndex: isCenter ? 10 : 0,
      }}
    >
      <span className="rs-card-corner" aria-hidden="true" />
      {review.rating ? (
        <span className="rs-stars" role="img" aria-label={`${review.rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} size={15} aria-hidden="true" className={i < Math.round(review.rating) ? 'is-on' : undefined} />
          ))}
        </span>
      ) : null}
      <blockquote>
        <p>&ldquo;{review.text}&rdquo;</p>
      </blockquote>
      <p className="rs-by">
        {review.name} · {review.source}
        {review.date ? ` · ${review.date}` : ''}
      </p>
    </li>
  );
}

export default function ReviewStack({ reviews }) {
  const [list, setList] = useState(() => reviews.map((r, i) => ({ ...r, key: i })));
  const [cardSize, setCardSize] = useState(365);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)');
    const update = () => setCardSize(mq.matches ? 365 : 290);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const move = (steps) => {
    setList((prev) => {
      const next = [...prev];
      if (steps > 0) for (let i = 0; i < steps; i++) next.push(next.shift());
      else for (let i = 0; i < -steps; i++) next.unshift(next.pop());
      return next;
    });
  };

  const half = list.length % 2 ? (list.length + 1) / 2 : list.length / 2;

  return (
    <div className="rs-root">
      <ul className="rs-stage">
        {list.map((review, index) => (
          <Card key={review.key} review={review} position={index - half} cardSize={cardSize} onMove={move} />
        ))}
      </ul>
      <div className="rs-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous review">
          <ChevronLeft aria-hidden="true" />
        </button>
        <button type="button" onClick={() => move(1)} aria-label="Next review">
          <ChevronRight aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
