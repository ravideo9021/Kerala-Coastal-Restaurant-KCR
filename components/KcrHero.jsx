'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { AppleHelloEnglishEffect } from '@/components/ui/apple-hello-effect';

const SLIDES = [
  '/media/restorent_front.png',
  '/media/Charred Banana Leaf Kizhi Parotta.png',
  '/media/Kerala Chicken Biryani.png',
  '/media/Glossy Chili Chicken with Scallions.png',
  '/media/restorent_inside.jpg',
  '/media/Spicy Chilli Fish on Banana Leaf.png',
  '/media/Indian Chicken Curry Bowl.png',
];

function WordsPullUp({ text, className = '', showAsterisk = false, style }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(' ');

  return (
    <div ref={ref} style={{ display: 'inline-flex', flexWrap: 'wrap', ...style }} className={className}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'inline-block',
              position: 'relative',
              marginRight: isLast ? 0 : '0.2em',
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
}

export default function KcrHero() {
  const [idx, setIdx] = useState(0);

  const next = useCallback(() => {
    setIdx((p) => (p + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section id="home" className="kcr-hero">
      <div className="kcr-hero__container">
        {SLIDES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`kcr-hero__bg-img${i === idx ? ' active' : ''}`}
          />
        ))}

        <div className="kcr-hero__noise" />
        <div className="kcr-hero__gradient" />

        <div className="kcr-hero__content">
          <div className="kcr-hero__grid">
            <div>
              <AppleHelloEnglishEffect speed={1.1} className="kcr-hero__hello" />
              <h1 className="kcr-hero__title">
                <WordsPullUp text="KCR" />
              </h1>
            </div>

            <div className="kcr-hero__right">
              <motion.p
                className="kcr-hero__desc"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                Kerala Coastal Restaurant brings the authentic flavours of
                coastal South India to Delhi — fresh seafood, traditional
                sadyas, Kerala biryanis and recipes passed through generations.
              </motion.p>

              <motion.div
                className="kcr-hero__cta-row"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <a
                  href="https://www.swiggy.com/menu/750696?source=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="order-btn order-swiggy"
                >
                  <span className="order-btn-dot" />
                  <span className="order-btn-label">
                    <img src="/media/swiggy_logo.png" alt="Swiggy" className="order-logo" />
                    <span>Order on Swiggy</span>
                  </span>
                  <span className="order-btn-hover">Order Now &rarr;</span>
                </a>
                <a
                  href="https://zomato.onelink.me/xqzv/0lb6eb63"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="order-btn order-zomato"
                >
                  <span className="order-btn-dot" />
                  <span className="order-btn-label">
                    <img src="/media/zomato_logo.png" alt="Zomato" className="order-logo" />
                    <span>Order on Zomato</span>
                  </span>
                  <span className="order-btn-hover">Order Now &rarr;</span>
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="kcr-hero__dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`kcr-hero__dot${i === idx ? ' active' : ''}`}
              onClick={() => setIdx(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
