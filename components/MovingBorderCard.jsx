/**
 * Card with a soft glow that travels around its border.
 *
 * The previous version moved the glow from JavaScript on every animation
 * frame (for every card, all the time, even off screen). This one is a single
 * CSS motion-path animation that the browser runs by itself and that pauses
 * while the card is off screen. Browsers without motion-path support show a
 * static hairline border instead.
 */
export default function MovingBorderCard({
  children,
  radius = 14,
  duration = 4,
  color = 'var(--teal-light)',
  glow = 90,
  className = '',
}) {
  return (
    <div
      className={`mb-card ${className}`}
      data-play-when-visible=""
      style={{ '--mb-radius': `${radius}px`, '--mb-dur': `${duration}s`, '--mb-color': color, '--mb-glow': `${glow}px` }}
    >
      <span className="mb-track" aria-hidden="true">
        <span className="mb-glow" />
      </span>
      <div className="mb-inner">{children}</div>
    </div>
  );
}
