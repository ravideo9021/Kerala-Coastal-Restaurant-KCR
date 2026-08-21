'use client';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', msg: data.message });
        setEmail('');
      } else {
        setStatus({ type: 'error', msg: data.error });
      }
    } catch {
      setStatus({ type: 'error', msg: 'Something went wrong. Please try again.' });
    }
    setLoading(false);
  }

  return (
    <section className="newsletter">
      <div className="newsletter-inner">
        <p className="script reveal">Stay Connected</p>
        <h2 className="reveal">
          Get Exclusive<br />Offers
        </h2>
        <p className="reveal">
          Subscribe to our newsletter for special deals, new menu launches,
          and authentic Kerala recipes delivered to your inbox.
        </p>
        <form className="newsletter-form reveal" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-teal" disabled={loading}>
            {loading ? 'Sending…' : 'Subscribe'}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>
        {status && (
          <p className={`newsletter-status ${status.type}`}>{status.msg}</p>
        )}
      </div>
    </section>
  );
}
