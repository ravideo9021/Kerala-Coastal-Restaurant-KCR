export default function RiceDelights() {
  return (
    <section className="rice-section">
      <div className="rice-inner">
        <div className="rice-bowl rice-bowl-left parallax-up">
          <img src="/media/Kerala Chicken Biryani.png" alt="Kerala Chicken Biryani" />
        </div>

        <div className="rice-content">
          <p className="rice-kicker reveal">Aromatic & Flavourful</p>
          <h2 className="reveal">
            Kerala<br />Biryani
          </h2>
          <p className="rice-sub reveal">
            Our biryanis are crafted with fragrant short-grain rice, slow-cooked
            with hand-ground spices and the finest meat — the Thalassery way.
          </p>
          <a
            href="#menu"
            className="btn btn-white reveal"
          >
            Explore Biryanis
          </a>
        </div>

        <div className="rice-bowl rice-bowl-right parallax-down">
          <img src="/media/plate design for fecoration.png" alt="Traditional Rice" />
        </div>

        <img
          src="/media/tomato_for_decoration.png"
          alt=""
          className="rice-deco rice-deco-1"
        />
        <img
          src="/media/for_decoration.png"
          alt=""
          className="rice-deco rice-deco-2"
        />
      </div>
    </section>
  );
}
