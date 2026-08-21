'use client';
import { useState, useRef, useCallback, useEffect } from 'react';

const DEFAULTS = {
  rotate: 45,
  depth: 220,
  perspective: 900,
  falloff: 0.65,
  fade: true,
  gap: 20,
  loop: true,
  cardWidth: 320,
};

export default function CoverflowCarousel({ slides = [], options = {} }) {
  const cfg = { ...DEFAULTS, ...options };
  const [current, setCurrent] = useState(Math.floor(slides.length / 2));
  const containerRef = useRef(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startIdx = useRef(0);

  const total = slides.length;
  const wrap = useCallback(
    (i) => (cfg.loop ? ((i % total) + total) % total : Math.max(0, Math.min(i, total - 1))),
    [cfg.loop, total]
  );

  const go = useCallback((d) => setCurrent((p) => wrap(p + d)), [wrap]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  const onPointerDown = (e) => {
    dragging.current = true;
    startX.current = e.clientX;
    startIdx.current = current;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!dragging.current) return;
    const dx = e.clientX - startX.current;
    const steps = Math.round(-dx / (cfg.cardWidth * 0.5));
    setCurrent(wrap(startIdx.current + steps));
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      style={{
        perspective: cfg.perspective + 'px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        height: '420px',
        touchAction: 'pan-y',
        cursor: 'grab',
        overflow: 'hidden',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {slides.map((src, i) => {
        let offset = i - current;
        if (cfg.loop) {
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;
        }
        const abs = Math.abs(offset);
        const rot = offset * cfg.rotate * Math.pow(cfg.falloff, abs);
        const z = -abs * cfg.depth;
        const tx = offset * (cfg.cardWidth * 0.55 + cfg.gap);
        const opacity = cfg.fade ? Math.max(0, 1 - abs * 0.22) : 1;
        if (abs > 5) return null;

        return (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              position: 'absolute',
              width: cfg.cardWidth + 'px',
              height: '360px',
              borderRadius: '16px',
              overflow: 'hidden',
              transition: 'transform .5s ease, opacity .5s ease',
              transform: `translateX(${tx}px) translateZ(${z}px) rotateY(${rot}deg)`,
              opacity,
              zIndex: 100 - abs,
              boxShadow: offset === 0
                ? '0 20px 60px rgba(0,0,0,.5)'
                : '0 10px 30px rgba(0,0,0,.3)',
              cursor: 'pointer',
            }}
          >
            <img
              src={src}
              alt={`Gallery ${i + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
              draggable={false}
            />
          </div>
        );
      })}
    </div>
  );
}
