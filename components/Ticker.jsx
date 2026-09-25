/** Scrolling strip of dish names (decorative; pauses off screen). */
export default function Ticker({ items, variant = 'gold' }) {
  const text = `${items.join(' • ')} • `;
  return (
    <div className={`ticker ticker--${variant}`} aria-hidden="true" data-play-when-visible="">
      <div className="ticker-track">
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}
