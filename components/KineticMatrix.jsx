'use client';
import { useRef, useEffect, useState, useCallback } from 'react';

const COLS = 32;
const ROWS = 18;
const GAP = 28;
const BASE = 3;
const COLOR = [13, 124, 102];
const REPEL = 120;
const FORCE = 0.35;
const DAMP = 0.92;

export default function KineticMatrix() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const raf = useRef(0);
  const dots = useRef([]);
  const [visible, setVisible] = useState(false);

  const init = useCallback((w, h) => {
    const ox = (w - (COLS - 1) * GAP) / 2;
    const oy = (h - (ROWS - 1) * GAP) / 2;
    dots.current = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        dots.current.push({
          hx: ox + c * GAP,
          hy: oy + r * GAP,
          x: ox + c * GAP,
          y: oy + r * GAP,
          vx: 0,
          vy: 0,
        });
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * devicePixelRatio;
      canvas.height = h * devicePixelRatio;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      init(w, h);
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => {
      mouse.current = { x: -1000, y: -1000 };
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (const d of dots.current) {
        const dx = d.x - mx;
        const dy = d.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL && dist > 0) {
          const f = (1 - dist / REPEL) * FORCE;
          d.vx += (dx / dist) * f * GAP;
          d.vy += (dy / dist) * f * GAP;
        }
        d.vx += (d.hx - d.x) * 0.04;
        d.vy += (d.hy - d.y) * 0.04;
        d.vx *= DAMP;
        d.vy *= DAMP;
        d.x += d.vx;
        d.y += d.vy;

        const disp = Math.sqrt(d.vx * d.vx + d.vy * d.vy);
        const alpha = Math.min(0.15 + disp * 0.15, 0.9);
        const size = BASE + disp * 0.6;
        ctx.beginPath();
        ctx.arc(d.x, d.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLOR[0]},${COLOR[1]},${COLOR[2]},${alpha})`;
        ctx.fill();
      }
      raf.current = requestAnimationFrame(draw);
    };

    const obs = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (e.isIntersecting) {
          resize();
          draw();
        } else {
          cancelAnimationFrame(raf.current);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(canvas.parentElement);

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', resize);

    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf.current);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', resize);
    };
  }, [init]);

  return (
    <section
      style={{
        position: 'relative',
        height: '600px',
        background: 'var(--charcoal)',
        overflow: 'hidden',
      }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        <p className="script reveal">Explore our menu</p>
        <h2
          className="reveal"
          style={{ fontSize: 'clamp(42px,6vw,80px)', marginBottom: '28px' }}
        >
          Order Online
        </h2>
        <div
          className="reveal"
          style={{ display: 'flex', gap: '50px', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {[
            { val: '4.5', label: 'Rating' },
            { val: '150+', label: 'Dishes' },
            { val: '5000+', label: 'Happy Customers' },
          ].map((s) => (
            <div key={s.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <strong style={{ fontSize: '36px', color: 'var(--coconut)', fontWeight: 800 }}>
                {s.val}
              </strong>
              <span style={{ fontSize: '14px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
        <a
          href="https://www.swiggy.com/menu/750696?source=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-teal reveal"
          style={{ marginTop: '34px' }}
        >
          View Full Menu
        </a>
      </div>
    </section>
  );
}
