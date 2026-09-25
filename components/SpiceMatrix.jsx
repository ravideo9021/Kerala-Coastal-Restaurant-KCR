'use client';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Sparkles } from 'lucide-react';
import { useReducedMotion } from '@/lib/useMediaQuery';

// Shown next to the lattice points around the pointer: the spice coast.
const SPICES = [
  'PEPPER',
  'CARDAMOM',
  'CLOVE',
  'CINNAMON',
  'NUTMEG',
  'CURRY LEAF',
  'COCONUT',
  'KODAMPULI',
  'GINGER',
  'TURMERIC',
  'MUSTARD',
  'FENUGREEK',
  'STAR ANISE',
  'RED CHILLI',
  'SHALLOT',
  'FENNEL',
  'TAMARIND',
  'GARLIC',
];

const SPRING_K = 26;
const DAMPING = 0.85; // per 60 fps frame
const RADIUS = 200; // pointer reach, px

const GOLD = '242, 216, 116';
const CREAM = '240, 237, 227';
const TEAL = '20, 160, 133';

/**
 * A springy lattice behind the order section: points push away from the
 * pointer, sparks run along the lines, and a click or tap sends out a
 * shockwave. Ported from the old Flavours of Punjab "kinetic matrix" and drawn
 * on a transparent canvas, so the teal swirl of the page shows through.
 *
 * It only animates while on screen and in a visible tab, can be paused, and
 * draws one still frame for reduced-motion users.
 */
export default function SpiceMatrix() {
  const canvasRef = useRef(null);
  const api = useRef({ pulse: () => {}, setPaused: () => {} });
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !section) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let spacing = 52;
    let nodes = [];
    const pulses = [];
    const shocks = [];
    const pointer = { x: -9999, y: -9999, px: -9999, py: -9999, down: false, speed: 0 };
    let raf = 0;
    let running = false;
    let visible = false;
    let userPaused = false;
    let last = 0;
    let labelFont = '700 10px sans-serif';
    let calm = null; // the section heading: the lattice fades out behind it
    const tense = [];
    const lively = [];

    const build = () => {
      width = section.clientWidth;
      height = section.clientHeight;
      if (!width || !height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spacing = width < 640 ? 44 : 52;
      cols = Math.ceil(width / spacing) + 1;
      rows = Math.ceil(height / spacing) + 1;
      const ox = (width - (cols - 1) * spacing) / 2;
      const oy = (height - (rows - 1) * spacing) / 2;
      nodes = [];
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x = ox + c * spacing;
          const y = oy + r * spacing;
          nodes.push({
            x,
            y,
            bx: x,
            by: y,
            vx: 0,
            vy: 0,
            t: 0,
            phase: Math.random() * Math.PI * 2,
            label: SPICES[(c * 7 + r * 5) % SPICES.length],
          });
        }
      }
      pulses.length = 0;
      const head = section.querySelector('.section-head');
      if (head) {
        const s = section.getBoundingClientRect();
        const h = head.getBoundingClientRect();
        calm = {
          x: h.left - s.left + h.width / 2,
          y: h.top - s.top + h.height / 2,
          rx: h.width * 0.62,
          ry: h.height * 0.75,
        };
      }
      const family = getComputedStyle(section).getPropertyValue('--font-display').trim();
      if (family) labelFont = `700 10px ${family}`;
      if (!running) draw();
    };

    const step = (dt) => {
      const dx = pointer.x - pointer.px;
      const dy = pointer.y - pointer.py;
      pointer.speed = pointer.px < -9000 ? 0 : Math.sqrt(dx * dx + dy * dy) / (dt * 1000 || 1);
      pointer.px = pointer.x;
      pointer.py = pointer.y;

      for (let s = shocks.length - 1; s >= 0; s--) {
        const sw = shocks[s];
        sw.r += 420 * dt;
        sw.power *= Math.pow(0.12, dt);
        if (sw.r > sw.max || sw.power < 0.01) shocks.splice(s, 1);
      }

      const damping = Math.pow(DAMPING, dt * 60);
      for (const n of nodes) {
        n.phase += dt * 3.2;
        const px = pointer.x - n.x;
        const py = pointer.y - n.y;
        const dist = Math.sqrt(px * px + py * py);
        if (dist < RADIUS && dist > 0) {
          const ratio = 1 - dist / RADIUS;
          const force = ratio * (1600 + pointer.speed * 180 + (pointer.down ? 2400 : 0));
          n.vx -= (px / dist) * force * dt;
          n.vy -= (py / dist) * force * dt;
          n.t = Math.min(1, n.t + ratio * 0.5);
        }
        for (const sw of shocks) {
          const sx = n.x - sw.x;
          const sy = n.y - sw.y;
          const sd = Math.sqrt(sx * sx + sy * sy) || 1;
          const delta = Math.abs(sd - sw.r);
          if (delta < 55) {
            const force = (1 - delta / 55) * sw.power * 2800;
            n.vx += (sx / sd) * force * dt;
            n.vy += (sy / sd) * force * dt;
            n.t = 1;
          }
        }
        n.vx += (n.bx - n.x) * SPRING_K * dt;
        n.vy += (n.by - n.y) * SPRING_K * dt;
        n.vx *= damping;
        n.vy *= damping;
        n.x += n.vx * dt * 60;
        n.y += n.vy * dt * 60;
        n.t = Math.max(0, n.t - dt * 0.9);
      }

      // Sparks travelling along the lines (about 18 a second).
      if (nodes.length && pulses.length < 40 && Math.random() < 1 - Math.exp(-18 * dt)) {
        const from = Math.floor(Math.random() * nodes.length);
        const dir = Math.floor(Math.random() * 4);
        const c = Math.floor(from / rows) + (dir === 0 ? 1 : dir === 1 ? -1 : 0);
        const r = (from % rows) + (dir === 2 ? 1 : dir === 3 ? -1 : 0);
        if (c >= 0 && c < cols && r >= 0 && r < rows) {
          pulses.push({ from, to: c * rows + r, p: 0, speed: 1.6 + Math.random() * 2.2 });
        }
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.p += dt * pulse.speed;
        if (pulse.p >= 1) {
          nodes[pulse.to].t = Math.min(1, nodes[pulse.to].t + 0.35);
          pulses.splice(i, 1);
        }
      }
    };

    const link = (n, m) => {
      const lx = n.x - m.x;
      const ly = n.y - m.y;
      const stretch = Math.abs(Math.sqrt(lx * lx + ly * ly) - spacing) / spacing;
      const glow = Math.max(n.t, m.t, stretch * 2);
      if (glow > 0.1) {
        tense.push(n, m, glow);
      } else {
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(m.x, m.y);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Lines at rest go into one path; stretched ones glow gold.
      tense.length = 0;
      ctx.beginPath();
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const n = nodes[c * rows + r];
          if (c < cols - 1) link(n, nodes[(c + 1) * rows + r]);
          if (r < rows - 1) link(n, nodes[c * rows + r + 1]);
        }
      }
      ctx.strokeStyle = `rgba(${GOLD}, 0.1)`;
      ctx.lineWidth = 0.7;
      ctx.stroke();
      for (let i = 0; i < tense.length; i += 3) {
        const glow = tense[i + 2];
        ctx.strokeStyle = `rgba(${GOLD}, ${Math.min(1, 0.2 + glow * 0.7)})`;
        ctx.lineWidth = 0.8 + glow * 1.3;
        ctx.beginPath();
        ctx.moveTo(tense[i].x, tense[i].y);
        ctx.lineTo(tense[i + 1].x, tense[i + 1].y);
        ctx.stroke();
      }

      // Sparks.
      ctx.fillStyle = `rgba(${CREAM}, 0.95)`;
      for (const pulse of pulses) {
        const a = nodes[pulse.from];
        const b = nodes[pulse.to];
        ctx.beginPath();
        ctx.arc(a.x + (b.x - a.x) * pulse.p, a.y + (b.y - a.y) * pulse.p, 1.9, 0, Math.PI * 2);
        ctx.fill();
      }

      // Points: resting ones in one path, lively ones with a teal halo.
      ctx.beginPath();
      lively.length = 0;
      for (const n of nodes) {
        const px = pointer.x - n.x;
        const py = pointer.y - n.y;
        const dist = Math.sqrt(px * px + py * py);
        if (dist < RADIUS || n.t > 0.1) {
          lively.push(n, dist);
          continue;
        }
        const radius = 1.3 + Math.sin(n.phase) * 0.25;
        ctx.moveTo(n.x + radius, n.y);
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
      }
      ctx.fillStyle = `rgba(${CREAM}, 0.32)`;
      ctx.fill();

      ctx.font = labelFont;
      for (let i = 0; i < lively.length; i += 2) {
        const n = lively[i];
        const dist = lively[i + 1];
        const near = dist < RADIUS;
        const radius = near ? 2.8 + n.t * 1.5 : 1.3 + n.t;
        ctx.fillStyle = `rgba(${TEAL}, ${Math.min(0.9, 0.25 + n.t * 0.6)})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius * 2.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgb(${GOLD})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fill();

        if (dist < 95) {
          const ring = ((n.phase * 20) % 32) + 4;
          ctx.strokeStyle = `rgba(${GOLD}, ${(1 - ring / 36) * 0.4})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(n.x, n.y, ring, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = `rgba(${GOLD}, 0.9)`;
          ctx.fillText(n.label, n.x + 9, n.y - 8);
        }
      }

      // Keep the heading readable: fade the lattice out behind it.
      if (calm) {
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.translate(calm.x, calm.y);
        ctx.scale(1, calm.ry / calm.rx);
        const fade = ctx.createRadialGradient(0, 0, 0, 0, 0, calm.rx);
        fade.addColorStop(0, 'rgba(0, 0, 0, 0.88)');
        fade.addColorStop(0.65, 'rgba(0, 0, 0, 0.7)');
        fade.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = fade;
        ctx.fillRect(-calm.rx, -calm.rx, calm.rx * 2, calm.rx * 2);
        ctx.restore();
      }
    };

    const loop = (now) => {
      const dt = Math.min(0.033, (now - last) / 1000 || 0.016);
      last = now;
      step(dt);
      draw();
      raf = requestAnimationFrame(loop);
    };

    const update = () => {
      const shouldRun = visible && !document.hidden && !userPaused && !reduce;
      if (shouldRun && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(loop);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };

    const local = (e) => {
      const rect = section.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMove = (e) => {
      if (e.pointerType === 'touch') return;
      const p = local(e);
      pointer.x = p.x;
      pointer.y = p.y;
    };
    const onDown = (e) => {
      if (reduce) return;
      const p = local(e);
      shocks.push({ x: p.x, y: p.y, r: 8, max: 420, power: 1.2 });
      if (e.pointerType === 'touch') return;
      pointer.down = true;
    };
    const onUp = () => {
      pointer.down = false;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
      pointer.px = -9999;
      pointer.py = -9999;
      pointer.down = false;
    };

    api.current = {
      pulse: () => {
        shocks.push({ x: width / 2, y: height / 2, r: 10, max: Math.max(width, height) * 0.85, power: 1.4 });
        userPaused = false;
        update();
      },
      setPaused: (value) => {
        userPaused = value;
        update();
      },
    };

    const ro = new ResizeObserver(build);
    ro.observe(section);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    io.observe(section);
    document.addEventListener('visibilitychange', update);
    section.addEventListener('pointermove', onMove);
    section.addEventListener('pointerdown', onDown);
    section.addEventListener('pointerup', onUp);
    section.addEventListener('pointercancel', onLeave);
    section.addEventListener('pointerleave', onLeave);
    build();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', update);
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerdown', onDown);
      section.removeEventListener('pointerup', onUp);
      section.removeEventListener('pointercancel', onLeave);
      section.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const togglePause = () => {
    api.current.setPaused(!paused);
    setPaused(!paused);
  };

  const pulse = () => {
    setPaused(false);
    api.current.pulse();
  };

  return (
    <>
      <canvas ref={canvasRef} className="matrix-canvas" aria-hidden="true" />
      {!reduceMotion && (
        <div className="matrix-controls">
          <button type="button" className="matrix-btn" onClick={pulse} aria-label="Pulse the background animation">
            <Sparkles size={14} aria-hidden="true" /> <span aria-hidden="true">Pulse</span>
          </button>
          <button
            type="button"
            className="matrix-btn"
            onClick={togglePause}
            aria-label={paused ? 'Play the background animation' : 'Pause the background animation'}
          >
            {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
            <span aria-hidden="true">{paused ? 'Play' : 'Pause'}</span>
          </button>
        </div>
      )}
    </>
  );
}
