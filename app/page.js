import Hero from '@/components/Hero';
import About from '@/components/About';
import Signatures from '@/components/Signatures';
import Ticker from '@/components/Ticker';
import Favourites from '@/components/Favourites';
import RiceDelights from '@/components/RiceDelights';
import OrderOnline from '@/components/OrderOnline';
import SeafoodBanner from '@/components/SeafoodBanner';
import MenuSection from '@/components/MenuSection';
import BananaLeafFeast from '@/components/BananaLeafFeast';
import CulinaryJourney from '@/components/CulinaryJourney';
import Events from '@/components/Events';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import Visit from '@/components/Visit';
import StayConnected from '@/components/StayConnected';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Signatures />
      <Ticker
        variant="dark"
        items={['Appam', 'Puttu', 'Kerala Parotta', 'Fish Curry', 'Meen Pollichathu', 'Thalassery Biryani', 'Payasam']}
      />
      <Favourites />
      <RiceDelights />
      <OrderOnline />
      <SeafoodBanner />
      <MenuSection />
      <Ticker
        items={['Kizhi Parotta', 'Karimeen Fry', 'Chicken 65', 'Crab Roast', 'Idiyappam', 'Fish Moilee', 'Falooda']}
      />
      <BananaLeafFeast />
      <CulinaryJourney />
      <Events />
      <Gallery />
      <Reviews />
      <Visit />
      <StayConnected />
    </>
  );
}
