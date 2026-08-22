"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Cake,
  Users,
  Building2,
  UtensilsCrossed,
  Sparkles,
  PartyPopper,
  Heart,
  Star,
} from "lucide-react";

const FEATURES = [
  {
    id: "birthday",
    label: "Birthday Parties",
    icon: Cake,
    image: "/media/Birthday party.jpg",
    description:
      "Make birthdays unforgettable with a custom Kerala feast — personalised menus, festive decor, and our signature warm hospitality.",
  },
  {
    id: "kitty",
    label: "Kitty Parties",
    icon: Heart,
    image: "/media/Kitty_party.png",
    description:
      "The perfect spot for your monthly get-togethers — special group menus, refreshing mocktails, and a cozy vibe to catch up with friends.",
  },
  {
    id: "corporate",
    label: "Corporate Events",
    icon: Building2,
    image: "/media/Corporate_event.jpg",
    description:
      "Impress your team and clients with curated multi-course Kerala meals, professional setups, and bulk order options tailored to your needs.",
  },
  {
    id: "catering",
    label: "Catering Service",
    icon: UtensilsCrossed,
    image: "/media/catering_service.png",
    description:
      "Authentic Kerala catering at your doorstep — weddings, house parties, and festive gatherings with traditional banana leaf service.",
  },
  {
    id: "wedding",
    label: "Wedding Receptions",
    icon: Sparkles,
    image: "/media/restorent_inside.jpg",
    description:
      "Let us turn your reception into a grand Kerala sadya — lavish spreads, elegant presentation, and flavours your guests will remember forever.",
  },
  {
    id: "private",
    label: "Private Dining",
    icon: Star,
    image: "/media/restorent_front.png",
    description:
      "Reserve our space for an intimate dinner — anniversary, proposal, or a night out with curated courses and personal attention.",
  },
  {
    id: "festival",
    label: "Festival Celebrations",
    icon: PartyPopper,
    image: "/media/Kerala Chicken Biryani.png",
    description:
      "Onam, Vishu, Diwali or Eid — celebrate every festival with an authentic feast that brings the traditions of Kerala to your table.",
  },
  {
    id: "team",
    label: "Team Outings",
    icon: Users,
    image: "/media/Charred Banana Leaf Kizhi Parotta.png",
    description:
      "Bond over biryani and banana leaf meals — group packages with games, music, and the authentic taste of God's Own Country.",
  },
];

const AUTO_PLAY_INTERVAL = 3000;
const ITEM_HEIGHT = 65;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex =
    ((step % FEATURES.length) + FEATURES.length) % FEATURES.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + FEATURES.length) % FEATURES.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = FEATURES.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className="fc-root">
      <div className="fc-container">
        <div className="fc-sidebar">
          <div className="fc-sidebar__fade fc-sidebar__fade--top" />
          <div className="fc-sidebar__fade fc-sidebar__fade--bottom" />
          <div className="fc-sidebar__list">
            {FEATURES.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(
                -(FEATURES.length / 2),
                FEATURES.length / 2,
                distance
              );

              return (
                <motion.div
                  key={feature.id}
                  style={{ height: ITEM_HEIGHT, width: "fit-content" }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.25,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 22,
                    mass: 1,
                  }}
                  className="fc-sidebar__item-wrap"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={
                      isActive ? "fc-chip fc-chip--active" : "fc-chip"
                    }
                  >
                    <feature.icon size={18} strokeWidth={2} />
                    <span className="fc-chip__label">{feature.label}</span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="fc-stage">
          <div className="fc-stage__inner">
            {FEATURES.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                    rotate: isPrev ? -3 : isNext ? 3 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                    mass: 0.8,
                  }}
                  className="fc-card"
                  style={{
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <img
                    src={feature.image}
                    alt={feature.label}
                    className={
                      isActive ? "fc-card__img" : "fc-card__img fc-card__img--inactive"
                    }
                  />

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="fc-card__overlay"
                      >
                        <div className="fc-card__badge">
                          {index + 1} &bull; {feature.label}
                        </div>
                        <p className="fc-card__desc">{feature.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div
                    className="fc-card__live"
                    style={{ opacity: isActive ? 1 : 0 }}
                  >
                    <span className="fc-card__dot" />
                    <span className="fc-card__live-text">Now Booking</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;
