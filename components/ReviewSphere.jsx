'use client';
import { useRef, useState, useEffect, useCallback } from 'react';

const REVIEWS = [
  { name: 'Ananya S.', text: 'The Kerala fish curry is absolutely divine! Reminds me of my grandmother\'s cooking back in Kochi.', rating: 5 },
  { name: 'Rajesh M.', text: 'Best Thalassery biryani I\'ve had outside Kerala. The flavors are spot on. Must try!', rating: 5 },
  { name: 'Priya K.', text: 'Amazing appam and stew combo. The coconut stew was creamy and perfectly spiced.', rating: 5 },
  { name: 'Vikram R.', text: 'The prawns ularthiyathu was a game changer. Spicy, flavorful and cooked to perfection.', rating: 4 },
  { name: 'Meera D.', text: 'Lovely ambiance and authentic Kerala food. The kizhi parotta is a must-try here!', rating: 5 },
];

const IMAGES = [
  '/media/Charred Banana Leaf Kizhi Parotta.png',
  '/media/Glossy Chili Chicken with Scallions.png',
  '/media/Steaming Chicken Kizhi Parotta Parcel.png',
  '/media/724a9845945afdb7.png',
  '/media/plate design for fecoration.png',
  '/media/platter_design_docoration.png',
  '/media/tomato_for_decoration.png',
  '/media/for_decoration.png',
];

const SPHERE_NODES = 20;

function fibSphere(count) {
  const points = [];
  const golden = (1 + Math.sqrt(5)) / 2;
  for (let i = 0; i < count; i++) {
    const theta = Math.acos(1 - (2 * (i + 0.5)) / count);
    const phi = (2 * Math.PI * i) / golden;
    points.push({ x: Math.sin(theta) * Math.cos(phi), y: Math.sin(theta) * Math.sin(phi), z: Math.cos(theta) });
  }
  return points;
}

export default function ReviewSphere() {
  const sphereRef = useRef(null);
  const [reviewIdx, setReviewIdx] = useState(0);
  const angleRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: 0.003, y: 0.005 });
  const dragRef = useRef(false);
  const lastRef = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  const points = useRef(fibSphere(SPHERE_NODES));

  useEffect(() => {
    const t = setInterval(() => setReviewIdx((p) => (p + 1) % REVIEWS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const render = useCallback(() => {
    if (!sphereRef.current) return;
    angleRef.current.x += velRef.current.x;
    angleRef.current.y += velRef.current.y;
    velRef.current.x *= 0.995;
    velRef.current.y *= 0.995;
    if (Math.abs(velRef.current.x) < 0.001) velRef.current.x = 0.003;
    if (Math.abs(velRef.current.y) < 0.001) velRef.current.y = 0.005;

    const ax = angleRef.current.x;
    const ay = angleRef.current.y;
    const children = sphereRef.current.children;
    const radius = 160;

    for (let i = 0; i < children.length; i++) {
      const p = points.current[i];
      if (!p) continue;
      const cosA = Math.cos(ax), sinA = Math.sin(ax);
      const cosB = Math.cos(ay), sinB = Math.sin(ay);
      let x1 = p.x, y1 = p.y * cosA - p.z * sinA, z1 = p.y * sinA + p.z * cosA;
      let x2 = x1 * cosB + z1 * sinB, z2 = -x1 * sinB + z1 * cosB;
      const scale = (z2 + 2) / 3;
      const opacity = Math.max(0.15, (z2 + 1) / 2);
      children[i].style.transform = `translate(${x2 * radius}px, ${y1 * radius}px) scale(${scale})`;
      children[i].style.opacity = opacity;
      children[i].style.zIndex = Math.round(z2 * 10 + 10);
    }
    raf.current = requestAnimationFrame(render);
  }, []);

  useEffect(() => {
    raf.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf.current);
  }, [render]);

  const onPointerDown = (e) => {
    dragRef.current = true;
    lastRef.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerMove = (e) => {
    if (!dragRef.current) return;
    velRef.current.y += (e.clientX - lastRef.current.x) * 0.0003;
    velRef.current.x += (e.clientY - lastRef.current.y) * 0.0003;
    lastRef.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = () => { dragRef.current = false; };

  const rev = REVIEWS[reviewIdx];

  return (
    <section className="reviews-section">
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
        <div>
          <p className="eyebrow reveal">Reviews</p>
          <h2 className="reveal" style={{ fontSize: 'clamp(42px,5vw,72px)', marginBottom: '32px' }}>
            What Our<br />Guests Say
            <em>Words of love</em>
          </h2>
          <div className="reveal" style={{
            background: 'var(--warm)',
            padding: '36px',
            borderRadius: '16px',
            borderLeft: '4px solid var(--teal)',
            minHeight: '180px',
          }}>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
              {Array.from({ length: rev.rating }, (_, i) => (
                <span key={i} style={{ color: 'var(--coconut)', fontSize: '18px' }}>★</span>
              ))}
            </div>
            <p style={{ fontSize: '17px', lineHeight: 1.6, color: 'var(--cream)', margin: '0 0 16px' }}>
              &ldquo;{rev.text}&rdquo;
            </p>
            <strong style={{ color: 'var(--teal-light)', fontSize: '15px' }}>{rev.name}</strong>
          </div>
        </div>

        <div
          style={{ position: 'relative', height: '420px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'grab' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <div ref={sphereRef} style={{ position: 'relative', width: 0, height: 0 }}>
            {Array.from({ length: SPHERE_NODES }, (_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  transition: 'none',
                  willChange: 'transform, opacity',
                  border: '2px solid var(--teal)',
                  boxShadow: '0 4px 12px rgba(0,0,0,.3)',
                  left: '-30px',
                  top: '-30px',
                }}
              >
                <img
                  src={IMAGES[i % IMAGES.length]}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
