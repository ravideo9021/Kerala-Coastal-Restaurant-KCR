'use client';

import { useEffect, useId, useRef } from 'react';

interface AnimatedTextProps {
  text: string;
  fontSize?: number;
  minWeight?: number;
  maxWeight?: number;
  animationDuration?: number;
  delayMultiplier?: number;
  fontFamily?: string;
  color?: string;
  className?: string;
}

export function AnimatedText({
  text,
  fontSize = 80,
  minWeight = 100,
  maxWeight = 800,
  animationDuration = 1.5,
  delayMultiplier = 0.25,
  fontFamily = 'var(--font-display)',
  color = 'var(--ivory)',
  className = '',
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const rawId = useId();
  const id = `breath-${rawId.replace(/:/g, '')}`;

  useEffect(() => {
    if (!containerRef.current) return;

    const spans = containerRef.current.querySelectorAll('span');
    const numLetters = spans.length;

    spans.forEach((span, i) => {
      const mappedIndex = i - numLetters / 2;
      span.style.animationDelay = mappedIndex * delayMultiplier + 's';
    });
  }, [text, delayMultiplier]);

  const characters = text.split('').map((char, index) => (
    <span
      key={index}
      aria-hidden="true"
      style={{
        display: 'inline-block',
        animationName: id,
        animationDuration: `${animationDuration}s`,
        animationDirection: 'alternate',
        animationTimingFunction: 'cubic-bezier(0.37, 0, 0.63, 1)',
        animationIterationCount: 'infinite',
        animationFillMode: 'both',
        fontVariationSettings: `"wght" ${minWeight}`,
        minWidth: char === ' ' ? '0.3em' : undefined,
      }}
    >
      {char}
    </span>
  ));

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p
        ref={containerRef}
        aria-label={text}
        style={{
          fontFamily,
          fontSize: `${fontSize}px`,
          fontFeatureSettings: '"wght"',
          margin: 0,
          color,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
        }}
      >
        {characters}
        <style>{`
          @keyframes ${id} {
            0% {
              font-variation-settings: "wght" ${minWeight};
            }
            100% {
              font-variation-settings: "wght" ${maxWeight};
            }
          }
        `}</style>
      </p>
    </div>
  );
}
