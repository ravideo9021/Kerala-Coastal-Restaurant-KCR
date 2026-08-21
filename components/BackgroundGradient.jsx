'use client';
import AnimatedGradient from '@/components/ui/animated-gradient';

export default function BackgroundGradient() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <AnimatedGradient
        config={{
          preset: 'custom',
          color1: '#040A07',
          color2: '#0D7C66',
          color3: '#0A1510',
          rotation: -35,
          proportion: 30,
          scale: 0.35,
          speed: 12,
          distortion: 3,
          swirl: 45,
          swirlIterations: 8,
          softness: 90,
          offset: -200,
          shape: 'Edge',
          shapeSize: 55,
        }}
        noise={{ opacity: 0.15, scale: 1.2 }}
      />
    </div>
  );
}
