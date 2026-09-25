'use client';
import { useEffect, useRef } from 'react';

const COLS = 32;
const ROWS = 18;
const GAP = 28;
const BASE = 3;
const COLOR = '13,124,102';
const REPEL = 120;
const FORCE = 0.35;
const DAMP = 0.92;

/**
 * Grid of dots that scatter away from the mouse and spring back.
 *
 * The old version redrew all 576 dots on every frame for as long as the
 * section was on screen. This one draws the grid once and only animates while
 * the mouse is over it or dots are still settling, then goes back to sleep.
 * Touch screens and reduced-motion users get the still grid.
 */
export default function KineticDots() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const interactive =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let dots = [];
    let raf = 0;
    let visible = false;
    const mouse = { x: -1e4, y: -1e4, inside: false };

    const layout = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const ox = (w - (COLS - 1) * GAP) / 2;
      const oy = (h - (ROWS - 1) * GAP) / 2;
      dots = [];
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const hx = ox + c * GAP;
          const hy = oy + r * GAP;
          dots.push({ hx, hy, x: hx, y: hy, vx: 0, vy: 0 });
        }
      }
    };

    // Returns true while any dot is still moving.
    const step = () => {
      ctx.clearRect(0, 0, w, h);
      let moving = false;
      for (const d of dots) {
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL && dist > 0) {
          const f = (1 - dist / REPEL) * FORCE;
          d.vx += (dx / dist) * f * GAP;
          d.vy += (dy / dist) * f * GAP;
        }
        d.vx = (d.vx + (d.hx - d.x) * 0.04) * DAMP;
        d.vy = (d.vy + (d.hy - d.y) * 0.04) * DAMP;
        d.x += d.vx;
        d.y += d.vy;
        const disp = Math.sqrt(d.vx * d.vx + d.vy * d.vy);
        if (disp > 0.02 || Math.abs(d.hx - d.x) > 0.1 || Math.abs(d.hy - d.y) > 0.1) moving = true;
        ctx.beginPath();
        ctx.arc(d.x, d.y, BASE + disp * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLOR},${Math.min(0.15 + disp * 0.15, 0.9)})`;
        ctx.fill();
      }
      return moving;
    };

    const loop = () => {
      raf = 0;
      const moving = step();
      if (visible && (mouse.inside || moving)) raf = requestAnimationFrame(loop);
    };
    const wake = () => {
      if (!raf && visible) raf = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.inside = true;
      wake();
    };
    const onLeave = () => {
      mouse.x = -1e4;
      mouse.y = -1e4;
      mouse.inside = false;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        if (!dots.length) layout();
        step();
      } else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(canvas.parentElement);

    const ro = new ResizeObserver(() => {
      layout();
      if (visible) step();
    });
    ro.observe(canvas.parentElement);

    const host = canvas.parentElement;
    if (interactive) {
      host.addEventListener('pointermove', onMove);
      host.addEventListener('pointerleave', onLeave);
    }

    return () => {
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="kinetic-dots" aria-hidden="true" />;
}
