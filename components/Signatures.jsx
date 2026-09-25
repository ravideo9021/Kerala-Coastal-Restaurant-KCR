import DishCard from './DishCard';

const SIZES = '(max-width: 740px) 78vw, (max-width: 1040px) 45vw, 380px';

export default function Signatures() {
  return (
    <section className="signatures section" id="signatures" aria-labelledby="signatures-title">
      <div className="container">
        <header className="section-head reveal">
          <p className="script">From our Kerala kitchen</p>
          <h2 id="signatures-title">Coastal classics</h2>
        </header>
        <div className="dish-grid dish-grid--3">
          <DishCard
            slug="kizhi-parotta"
            image="kizhi-parcel"
            alt="Kizhi parotta: parotta and chicken masala in an opened banana-leaf parcel"
            name="Kizhi Parotta"
            tag="Must try"
            description="Flaky parotta and chicken masala tied up in a banana leaf and roasted, so every layer soaks up the spice."
            sizes={SIZES}
          />
          <DishCard
            slug="kerala-chicken-dum-biryani"
            image="kerala-chicken-biryani-cutout"
            alt="Kerala chicken biryani on a brass plate with lime and mint"
            name="Kerala Chicken Biryani"
            tag="Slow-cooked"
            description="Chicken and rice layered with whole spices and fried onions, then sealed and cooked on dum: fragrant rather than fiery."
            sizes={SIZES}
          />
          <DishCard
            slug="fish-fry"
            image="chilli-fish-cutout"
            alt="Crisp fried fish with curry leaves and red peppers"
            name="Kerala Fish Fry"
            tag="From the coast"
            description="Fish rubbed with chilli, pepper and curry leaves and fried until the edges crisp. Order it with rice or parotta."
            sizes={SIZES}
          />
        </div>
      </div>
    </section>
  );
}
