/**
 * FSSAI-style food marks used on Indian menus: a green dot in a green square
 * for vegetarian, a brown triangle in a brown square for non-vegetarian.
 */
export default function DietMark({ diet, size = 14, className = '', decorative = false }) {
  if (diet === 'both') {
    return (
      <span className={`diet-marks ${className}`}>
        <DietMark diet="veg" size={size} decorative={decorative} />
        <DietMark diet="nonveg" size={size} decorative={decorative} />
      </span>
    );
  }
  const veg = diet === 'veg';
  return (
    <svg
      className={`diet-mark diet-mark--${veg ? 'veg' : 'nonveg'} ${className}`}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : veg ? 'Vegetarian' : 'Non-vegetarian'}
      aria-hidden={decorative || undefined}
    >
      <rect x="1" y="1" width="14" height="14" rx="2" fill="#fff" stroke="currentColor" strokeWidth="1.6" />
      {veg ? <circle cx="8" cy="8" r="3.5" fill="currentColor" /> : <path d="M8 4 12.2 11.4H3.8Z" fill="currentColor" />}
    </svg>
  );
}
