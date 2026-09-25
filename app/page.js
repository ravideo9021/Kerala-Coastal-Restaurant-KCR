import Hero from '@/components/Hero';
import About from '@/components/About';
import Signatures from '@/components/Signatures';
import Ticker from '@/components/Ticker';
import Favourites from '@/components/Favourites';
import RiceDelights from '@/components/RiceDelights';
import OrderOnline from '@/components/OrderOnline';
import SeafoodShowcase from '@/components/SeafoodShowcase';
import BananaLeafFeast from '@/components/BananaLeafFeast';
import CulinaryJourney from '@/components/CulinaryJourney';
import Events from '@/components/Events';
import MenuSection from '@/components/MenuSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import Visit from '@/components/Visit';
import StayConnected from '@/components/StayConnected';

const TICKER = ['Appam', 'Puttu', 'Biryani', 'Fish Curry', 'Parotta', 'Dosa', 'Payasam', 'Meen Pollichathu'];

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Signatures />
      <Ticker items={TICKER} />
      <Favourites />
      <Ticker items={TICKER} reverse />
      <RiceDelights />
      <OrderOnline />
      <SeafoodShowcase />
      <BananaLeafFeast />
      <CulinaryJourney />
      <Events />
      <MenuSection />
      <Gallery />
      <Reviews />
      <Visit />
      <StayConnected />
    </>
  );
}
