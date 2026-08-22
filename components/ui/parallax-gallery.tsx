"use client";

import React, { useRef, useMemo, forwardRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const GALLERY_IMAGES = [
  "/media/Charred Banana Leaf Kizhi Parotta.png",
  "/media/Kerala Chicken Biryani.png",
  "/media/Spicy Grilled Paneer Tikka Skewers.png",
  "/media/Indian Chicken Curry Bowl.png",
  "/media/Naan Basket.png",
  "/media/Glossy Chili Chicken with Scallions.png",
  "/media/Falooda Sundae with Rose Syrup.png",
  "/media/Chilli Paneer Gravy Feast.png",
  "/media/Steaming Chicken Kizhi Parotta Parcel.png",
  "/media/Rustic Chicken Fried Rice Feast.png",
  "/media/Spicy Chilli Fish on Banana Leaf.png",
  "/media/govi_matar.png",
  "/media/restorent_front.png",
  "/media/restorent_inside.jpg",
];

function ImageCard({ src }: { src: string }) {
  return (
    <div className="parallax-gallery__card">
      <img
        src={src}
        alt="Gallery"
        loading="lazy"
        className="parallax-gallery__img"
      />
    </div>
  );
}

const StickyScrollGallery = forwardRef<HTMLElement>((_, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const colMedia = useMemo(() => {
    const col1Base = GALLERY_IMAGES.filter((_, i) => i % 4 === 0);
    const col2Base = GALLERY_IMAGES.filter((_, i) => i % 4 === 1);
    const col3Base = GALLERY_IMAGES.filter((_, i) => i % 4 === 2);
    const col4Base = GALLERY_IMAGES.filter((_, i) => i % 4 === 3);
    return {
      col1: [...col1Base, ...col1Base],
      col2: [...col2Base, ...col2Base],
      col3: [...col3Base, ...col3Base],
      col4: [...col4Base, ...col4Base],
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  });

  const bannerWidth = useTransform(smoothProgress, [0, 0.15], ["90vw", "100vw"]);
  const bannerHeight = useTransform(smoothProgress, [0, 0.15], ["80vh", "100vh"]);
  const bannerRadius = useTransform(smoothProgress, [0, 0.15], ["48px", "0px"]);
  const bannerBorderWidth = useTransform(smoothProgress, [0, 0.15], ["4px", "0px"]);

  const rotateY = useTransform(smoothProgress, [0.15, 1], [-45, -8]);
  const rotateX = useTransform(smoothProgress, [0.15, 1], [25, 4]);
  const rotateZ = useTransform(smoothProgress, [0.15, 1], [15, 2]);
  const translateZ = useTransform(smoothProgress, [0.15, 1], [-800, 0]);

  const yCol1 = useTransform(smoothProgress, [0.15, 1], ["0%", "-40%"]);
  const yCol2 = useTransform(smoothProgress, [0.15, 1], ["-40%", "10%"]);
  const yCol3 = useTransform(smoothProgress, [0.15, 1], ["0%", "-40%"]);
  const yCol4 = useTransform(smoothProgress, [0.15, 1], ["-30%", "20%"]);

  const titleOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

  return (
    <section ref={ref} id="gallery">
      <div ref={sectionRef} className="parallax-gallery__track">
        <div className="parallax-gallery__sticky">
          <motion.div
            className="parallax-gallery__banner"
            style={{
              width: bannerWidth,
              height: bannerHeight,
              borderRadius: bannerRadius,
              borderWidth: bannerBorderWidth,
              borderColor: "#2c2738",
              borderStyle: "solid",
            }}
          >
            <motion.div
              className="parallax-gallery__title-overlay"
              style={{ opacity: titleOpacity }}
            >
              <p className="eyebrow">Gallery</p>
              <h2 style={{ fontSize: "clamp(42px,6vw,80px)", lineHeight: 1.1, fontWeight: 600, letterSpacing: "-1px", margin: 0 }}>
                A Feast for<br />the Eyes
              </h2>
              <p style={{ fontFamily: "var(--script)", color: "var(--teal-light)", fontSize: "clamp(18px,2.5vw,28px)", marginTop: 8 }}>
                Scroll to explore
              </p>
            </motion.div>

            <div className="parallax-gallery__viewport">
              <div className="parallax-gallery__shadow-h" />
              <div className="parallax-gallery__shadow-v" />

              <motion.div
                className="parallax-gallery__grid"
                style={{
                  rotateX,
                  rotateY,
                  rotateZ,
                  z: translateZ,
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div style={{ y: yCol1 }} className="parallax-gallery__col">
                  {colMedia.col1.map((src, i) => (
                    <ImageCard key={`c1-${i}`} src={src} />
                  ))}
                </motion.div>
                <motion.div style={{ y: yCol2 }} className="parallax-gallery__col">
                  {colMedia.col2.map((src, i) => (
                    <ImageCard key={`c2-${i}`} src={src} />
                  ))}
                </motion.div>
                <motion.div style={{ y: yCol3 }} className="parallax-gallery__col">
                  {colMedia.col3.map((src, i) => (
                    <ImageCard key={`c3-${i}`} src={src} />
                  ))}
                </motion.div>
                <motion.div style={{ y: yCol4 }} className="parallax-gallery__col">
                  {colMedia.col4.map((src, i) => (
                    <ImageCard key={`c4-${i}`} src={src} />
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

StickyScrollGallery.displayName = "StickyScrollGallery";
export default StickyScrollGallery;
