'use client';
import React, { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

export const ContainerScroll = ({
  children,
  titleComponent,
}: {
  children: React.ReactNode;
  titleComponent: string | React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scaleDimensions = () => (isMobile ? [0.7, 0.9] : [1.05, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      ref={containerRef}
      style={{
        height: '60rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '0 1.25rem',
      }}
    >
      <div
        style={{
          paddingTop: isMobile ? '2.5rem' : '10rem',
          width: '100%',
          position: 'relative',
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}) => (
  <motion.div
    style={{ translateY: translate, maxWidth: '80rem', margin: '0 auto', textAlign: 'center' }}
  >
    {titleComponent}
  </motion.div>
);

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => (
  <motion.div
    style={{
      rotateX: rotate,
      scale,
      boxShadow:
        '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
      maxWidth: '80rem',
      marginTop: '-3rem',
      marginLeft: 'auto',
      marginRight: 'auto',
      height: '30rem',
      width: '100%',
      borderWidth: '4px',
      borderStyle: 'solid',
      borderColor: 'rgba(13,124,102,0.2)',
      padding: '1.5rem',
      backgroundColor: 'var(--charcoal)',
      borderRadius: '1.875rem',
    }}
  >
    <div
      style={{
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        borderRadius: '1.25rem',
        backgroundColor: 'var(--warm)',
      }}
    >
      {children}
    </div>
  </motion.div>
);
