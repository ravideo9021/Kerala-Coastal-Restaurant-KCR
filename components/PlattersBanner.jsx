export default function PlattersBanner() {
  return (
    <section className="platters-banner">
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #0a1a15 0%, #0d2618 50%, #081510 100%)',
        }}
      />
      <div className="platters-overlay" />

      <img
        src="/media/platter_design_docoration.png"
        alt="Kerala Thali"
        className="platters-food parallax-up"
      />

      <div className="dish-rotor svg-spin">
        <svg viewBox="0 0 220 220">
          <circle cx="110" cy="110" r="100" />
          <defs>
            <path id="dish-path" d="M110,110m-80,0a80,80 0 1,1 160,0a80,80 0 1,1 -160,0" />
          </defs>
          <text>
            <textPath href="#dish-path">
              KERALA THALI • SADYA SPECIAL • BANANA LEAF •
            </textPath>
          </text>
        </svg>
      </div>

      <div className="platters-content reveal">
        <p className="eyebrow">Feast Together</p>
        <h2>
          Kerala<br />Thali
          <em>A complete meal</em>
        </h2>
        <p>
          Experience the grand Kerala Sadya — a traditional feast served on a
          banana leaf with rice, sambar, avial, thoran, payasam and more.
          Perfect for family gatherings and celebrations.
        </p>
        <div className="platter-prices">
          <div>
            <strong>Veg Thali</strong>
            <em>₹299</em>
          </div>
          <div>
            <strong>Non-Veg Thali</strong>
            <em>₹449</em>
          </div>
          <div>
            <strong>Seafood Thali</strong>
            <em>₹549</em>
          </div>
        </div>
        <a href="#menu" className="btn btn-coconut">
          View Full Menu
        </a>
      </div>
    </section>
  );
}
