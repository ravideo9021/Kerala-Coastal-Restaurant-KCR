export default function FoodShowcase() {
  return (
    <section className="showcase">
      <div className="showcase-visual">
        <div
          style={{
            width: '100%',
            height: '100%',
            minHeight: '500px',
            background: 'linear-gradient(135deg, #0a1f1a 0%, #132e20 50%, #0d1f18 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src="/media/724a9845945afdb7.png"
            alt="Seafood platter"
            style={{
              maxWidth: '70%',
              maxHeight: '80%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 30px 40px rgba(0,0,0,.5))',
            }}
          />
        </div>
        <div className="showcase-badge svg-spin">
          <svg viewBox="0 0 180 180">
            <defs>
              <path id="badge-ring" d="M90,90m-70,0a70,70 0 1,1 140,0a70,70 0 1,1 -140,0" />
            </defs>
            <text>
              <textPath href="#badge-ring">
                FRESH CATCH • DAILY SEAFOOD • COASTAL CUISINE •
              </textPath>
            </text>
          </svg>
        </div>
        <div className="showcase-float showcase-float-1 parallax-up">
          <img src="/media/Spicy Chilli Fish on Banana Leaf.png" alt="Spicy Chilli Fish" />
        </div>
        <div className="showcase-float showcase-float-2 parallax-down">
          <img src="/media/Falooda Sundae with Rose Syrup.png" alt="Falooda Sundae" />
        </div>
      </div>
      <div className="showcase-content">
        <p className="eyebrow reveal">Ocean to Table</p>
        <h2 className="reveal">
          Seafood<br />Specials
          <em>Freshly caught, perfectly spiced</em>
        </h2>
        <p className="lead reveal">
          From the Arabian Sea to your plate — our seafood is sourced daily and
          prepared with traditional Kerala marinades, coconut oil, and
          hand-ground masalas. Every bite is a voyage to the Malabar coast.
        </p>
        <a href="#menu" className="btn btn-teal reveal">
          View Seafood Menu
        </a>
      </div>
    </section>
  );
}
