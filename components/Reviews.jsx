'use client';
import { StaggerTestimonials } from '@/components/ui/stagger-testimonials';

export default function Reviews() {
  return (
    <section className="reviews-section" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', padding: '80px 24px 0' }}>
        <p className="eyebrow reveal">Reviews</p>
        <h2 className="reveal" style={{ fontSize: 'clamp(42px,5vw,72px)', marginBottom: '16px' }}>
          What Our<br />Guests Say
          <em>Words of love</em>
        </h2>
      </div>
      <StaggerTestimonials />
    </section>
  );
}
