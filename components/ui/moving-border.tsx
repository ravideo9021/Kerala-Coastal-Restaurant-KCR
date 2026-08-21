'use client';
import React, { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from 'framer-motion';

export function MovingBorder({
  children,
  duration = 2000,
  rx = '30%',
  ry = '30%',
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
}) {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x ?? 0
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y ?? 0
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ position: 'absolute', height: '100%', width: '100%' }}
        width="100%"
        height="100%"
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'inline-block',
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
}

export function MovingBorderCard({
  children,
  borderRadius = '14px',
  duration = 3500,
  borderColor = 'var(--teal-light)',
  glowSize = 80,
  style,
}: {
  children: React.ReactNode;
  borderRadius?: string;
  duration?: number;
  borderColor?: string;
  glowSize?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        position: 'relative',
        padding: '1.5px',
        overflow: 'hidden',
        borderRadius,
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            style={{
              width: `${glowSize}px`,
              height: `${glowSize}px`,
              opacity: 0.8,
              background: `radial-gradient(${borderColor} 40%, transparent 60%)`,
            }}
          />
        </MovingBorder>
      </div>
      <div
        style={{
          position: 'relative',
          borderRadius: `calc(${borderRadius} * 0.96)`,
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  );
}
