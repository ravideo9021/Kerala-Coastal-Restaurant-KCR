"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";

export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
  src: string;
  label: string;
  index: number;
  total: number;
  phase: AnimationPhase;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;

function FlipCard({ src, label, index, phase, target }: FlipCardProps) {
  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{ type: "spring", stiffness: 40, damping: 15 }}
      style={{
        position: "absolute",
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
        transformStyle: "preserve-3d",
        perspective: "1000px",
        cursor: "pointer",
      }}
      className="scroll-morph-card"
    >
      <motion.div
        style={{ position: "relative", height: "100%", width: "100%", transformStyle: "preserve-3d" }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ rotateY: 180 }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            height: "100%",
            width: "100%",
            overflow: "hidden",
            borderRadius: "12px",
            boxShadow: "0 10px 15px -3px rgba(0,0,0,.3), 0 4px 6px -4px rgba(0,0,0,.2)",
            backfaceVisibility: "hidden",
            background: "#1a2e28",
          }}
        >
          <img
            src={src}
            alt={label}
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,.1)",
              transition: "background .3s",
            }}
            className="scroll-morph-overlay"
          />
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            height: "100%",
            width: "100%",
            overflow: "hidden",
            borderRadius: "12px",
            boxShadow: "0 10px 15px -3px rgba(0,0,0,.3)",
            background: "linear-gradient(135deg, #0d2818, #1a3a2a)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px",
            border: "1px solid rgba(207,181,59,.2)",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "7px", fontWeight: 700, color: "#cfb53b", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "2px" }}>
              Explore
            </p>
            <p style={{ fontSize: "10px", fontWeight: 500, color: "#f0ede3" }}>
              {label}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const IMAGES = [
  { src: "/media/Kerala Chicken Biryani.png", label: "Kerala Biryani" },
  { src: "/media/Charred Banana Leaf Kizhi Parotta.png", label: "Kizhi Parotta" },
  { src: "/media/Glossy Chili Chicken with Scallions.png", label: "Chilli Chicken" },
  { src: "/media/Spicy Chilli Fish on Banana Leaf.png", label: "Chilli Fish" },
  { src: "/media/Indian Chicken Curry Bowl.png", label: "Chicken Curry" },
  { src: "/media/Spicy Grilled Paneer Tikka Skewers.png", label: "Paneer Tikka" },
  { src: "/media/Naan Basket.png", label: "Naan Basket" },
  { src: "/media/Falooda Sundae with Rose Syrup.png", label: "Falooda" },
  { src: "/media/Chilli Paneer Gravy Feast.png", label: "Chilli Paneer" },
  { src: "/media/Rustic Chicken Fried Rice Feast.png", label: "Fried Rice" },
  { src: "/media/Steaming Chicken Kizhi Parotta Parcel.png", label: "Kizhi Parcel" },
  { src: "/media/govi_matar.png", label: "Gobi Matar" },
  { src: "/media/restorent_front.png", label: "Our Restaurant" },
  { src: "/media/restorent_inside.jpg", label: "Dine With Us" },
];

const TOTAL_IMAGES = IMAGES.length;
const MAX_SCROLL = 3000;

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export default function ScrollMorphHero() {
  const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        setContainerSize({ width: entry.contentRect.width, height: entry.contentRect.height });
      }
    };
    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);
    setContainerSize({ width: containerRef.current.offsetWidth, height: containerRef.current.offsetHeight });
    return () => observer.disconnect();
  }, []);

  const virtualScroll = useMotionValue(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const atStart = scrollRef.current <= 0 && e.deltaY < 0;
      const atEnd = scrollRef.current >= MAX_SCROLL && e.deltaY > 0;
      if (atStart || atEnd) return;
      e.preventDefault();
      const newScroll = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      touchStartY = touchY;
      const atStart = scrollRef.current <= 0 && deltaY < 0;
      const atEnd = scrollRef.current >= MAX_SCROLL && deltaY > 0;
      if (atStart || atEnd) return;
      e.preventDefault();
      const newScroll = Math.min(Math.max(scrollRef.current + deltaY, 0), MAX_SCROLL);
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [virtualScroll]);

  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

  const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const normalizedX = (relativeX / rect.width) * 2 - 1;
      mouseX.set(normalizedX * 100);
    };
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  useEffect(() => {
    const timer1 = setTimeout(() => setIntroPhase("line"), 500);
    const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  const scatterPositions = useMemo(() => {
    return IMAGES.map((_, i) => ({
      x: ((((i * 7 + 3) % 13) / 13) - 0.5) * 1500,
      y: ((((i * 11 + 5) % 13) / 13) - 0.5) * 1000,
      rotation: ((((i * 5 + 2) % 13) / 13) - 0.5) * 180,
      scale: 0.6,
      opacity: 0,
    }));
  }, []);

  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);

  useEffect(() => {
    const u1 = smoothMorph.on("change", setMorphValue);
    const u2 = smoothScrollRotate.on("change", setRotateValue);
    const u3 = smoothMouseX.on("change", setParallaxValue);
    return () => { u1(); u2(); u3(); };
  }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

  const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
  const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

  return (
    <section className="scroll-morph-section" id="food-morph">
      <div ref={containerRef} className="scroll-morph-container">
        <div style={{ display: "flex", height: "100%", width: "100%", flexDirection: "column", alignItems: "center", justifyContent: "center", perspective: "1000px" }}>

          <div style={{ position: "absolute", zIndex: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", pointerEvents: "none", top: "50%", transform: "translateY(-50%)" }}>
            <motion.h2
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 1 }}
              style={{ fontSize: "clamp(24px, 4vw, 42px)", fontWeight: 500, letterSpacing: "-0.02em", color: "var(--cream)", fontFamily: "var(--display)", margin: 0 }}
            >
              A Culinary Journey Awaits
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 0.5 - morphValue } : { opacity: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{ marginTop: "16px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", color: "var(--muted)", textTransform: "uppercase" as const }}
            >
              SCROLL TO EXPLORE
            </motion.p>
          </div>

          <motion.div
            style={{ opacity: contentOpacity, y: contentY, position: "absolute", top: "10%", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", pointerEvents: "none", padding: "0 16px" }}
          >
            <h2 style={{ fontSize: "clamp(26px, 5vw, 48px)", fontWeight: 600, color: "var(--cream)", letterSpacing: "-0.02em", marginBottom: "16px", fontFamily: "var(--display)" }}>
              Celebrate With KCR
            </h2>
            <p style={{ fontSize: "clamp(12px, 1.5vw, 16px)", color: "var(--muted)", maxWidth: "500px", lineHeight: 1.6 }}>
              From birthday bashes to corporate dinners, kitty parties to grand catering —
              we bring the authentic taste of Kerala to every occasion.
            </p>
          </motion.div>

          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
            {IMAGES.slice(0, TOTAL_IMAGES).map((item, i) => {
              let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

              if (introPhase === "scatter") {
                target = scatterPositions[i];
              } else if (introPhase === "line") {
                const lineSpacing = 70;
                const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
                const lineX = i * lineSpacing - lineTotalWidth / 2;
                target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
              } else {
                const isMobile = containerSize.width < 768;
                const minDimension = Math.min(containerSize.width, containerSize.height);

                const circleRadius = Math.min(minDimension * 0.35, 350);
                const circleAngle = (i / TOTAL_IMAGES) * 360;
                const circleRad = (circleAngle * Math.PI) / 180;
                const circlePos = {
                  x: Math.cos(circleRad) * circleRadius,
                  y: Math.sin(circleRad) * circleRadius,
                  rotation: circleAngle + 90,
                };

                const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
                const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
                const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
                const arcCenterY = arcApexY + arcRadius;

                const spreadAngle = isMobile ? 100 : 130;
                const startAngle = -90 - (spreadAngle / 2);
                const step = spreadAngle / (TOTAL_IMAGES - 1);

                const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
                const maxRotation = spreadAngle * 0.8;
                const boundedRotation = -scrollProgress * maxRotation;

                const currentArcAngle = startAngle + (i * step) + boundedRotation;
                const arcRad = (currentArcAngle * Math.PI) / 180;

                const arcPos = {
                  x: Math.cos(arcRad) * arcRadius + parallaxValue,
                  y: Math.sin(arcRad) * arcRadius + arcCenterY,
                  rotation: currentArcAngle + 90,
                  scale: isMobile ? 1.4 : 1.8,
                };

                target = {
                  x: lerp(circlePos.x, arcPos.x, morphValue),
                  y: lerp(circlePos.y, arcPos.y, morphValue),
                  rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                  scale: lerp(1, arcPos.scale, morphValue),
                  opacity: 1,
                };
              }

              return (
                <FlipCard
                  key={i}
                  src={item.src}
                  label={item.label}
                  index={i}
                  total={TOTAL_IMAGES}
                  phase={introPhase}
                  target={target}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
