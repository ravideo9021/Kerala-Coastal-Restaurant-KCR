'use client';
import { useRef, useEffect, useState, useCallback } from 'react';

const SHARD_COUNT = 12;

function createShards(w, h) {
  const shards = [];
  const cols = 4;
  const rows = 3;
  const sw = w / cols;
  const sh = h / rows;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      shards.push({
        x: c * sw + sw / 2,
        y: r * sh + sh / 2,
        w: sw,
        h: sh,
        rx: (Math.random() - 0.5) * 20,
        ry: (Math.random() - 0.5) * 20,
        rz: (Math.random() - 0.5) * 15,
        tz: Math.random() * 80 + 20,
        delay: (r + c) * 0.06,
        clipPath: `polygon(
          ${Math.random() * 10}% ${Math.random() * 10}%,
          ${90 + Math.random() * 10}% ${Math.random() * 10}%,
          ${90 + Math.random() * 10}% ${90 + Math.random() * 10}%,
          ${Math.random() * 10}% ${90 + Math.random() * 10}%
        )`,
      });
    }
  }
  return shards;
}

export default function GlassHero() {
  const containerRef = useRef(null);
  const [shattered, setShattered] = useState(false);
  const [shards, setShards] = useState([]);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    setShards(createShards(100, 100));
  }, []);

  const onMouse = useCallback((e) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    mouse.current = {
      x: (e.clientX - r.left) / r.width,
      y: (e.clientY - r.top) / r.height,
    };
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={onMouse}
      onMouseEnter={() => setShattered(true)}
      onMouseLeave={() => setShattered(false)}
      style={{
        position: 'relative',
        height: '600px',
        overflow: 'hidden',
        perspective: '1200px',
        background: 'var(--ink)',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #0a1f1a 0%, #0d2818 50%, #061510 100%)',
        }}
      />

      {shards.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${s.x - s.w / 2}%`,
            top: `${s.y - s.h / 2}%`,
            width: `${s.w}%`,
            height: `${s.h}%`,
            clipPath: s.clipPath,
            transition: `transform ${0.4 + s.delay}s cubic-bezier(.25,.46,.45,.94), opacity 0.5s`,
            transform: shattered
              ? `translate3d(${(s.x - 50) * 0.8}px, ${(s.y - 50) * 0.6}px, ${s.tz}px) rotateX(${s.rx}deg) rotateY(${s.ry}deg) rotateZ(${s.rz}deg)`
              : 'translate3d(0,0,0) rotateX(0) rotateY(0) rotateZ(0)',
            opacity: shattered ? 0.6 : 1,
            overflow: 'hidden',
            backfaceVisibility: 'hidden',
          }}
        >
          <img
            src="/media/atlas-desktop.png"
            alt=""
            style={{
              position: 'absolute',
              width: '400%',
              height: '300%',
              left: `-${(i % 4) * 100}%`,
              top: `-${Math.floor(i / 4) * 100}%`,
              objectFit: 'cover',
            }}
          />
        </div>
      ))}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 24px',
          pointerEvents: 'none',
          transition: 'opacity 0.4s',
          opacity: shattered ? 0 : 1,
        }}
      >
        <p className="script" style={{ fontSize: '40px' }}>Experience</p>
        <h2 style={{ fontSize: 'clamp(48px,7vw,100px)', color: '#fff' }}>
          The Art of<br />Kerala Cooking
        </h2>
      </div>
    </section>
  );
}
