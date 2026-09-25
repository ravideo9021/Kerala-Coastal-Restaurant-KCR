'use client';
import { useEffect, useState } from 'react';
import { getOpenStatus, hoursSummary } from '@/lib/hours';

/**
 * "Open now · until 11 PM" in the restaurant's time zone (IST), whatever the
 * visitor's own time zone. The server renders the plain opening hours; the
 * live status replaces it after hydration and refreshes every minute.
 */
export default function OpenStatus({ className = '' }) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const tick = () => setStatus(getOpenStatus());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!status) {
    return <span className={`open-status ${className}`}>{hoursSummary()}</span>;
  }

  const label = status.isOpen
    ? `Open now · until ${status.closesAt}`
    : status.opensAt
      ? `Closed · opens ${status.opensWhen === 'today' ? '' : `${status.opensWhen} `}${status.opensAt}`
      : 'Closed';

  return (
    <span className={`open-status ${status.isOpen ? (status.soon ? 'is-closing' : 'is-open') : 'is-closed'} ${className}`}>
      <span className="open-dot" aria-hidden="true" />
      {label}
    </span>
  );
}
