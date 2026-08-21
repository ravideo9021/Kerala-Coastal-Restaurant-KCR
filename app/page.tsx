import KcrHero from '@/components/KcrHero';
import About from '@/components/About';
import KineticMatrix from '@/components/KineticMatrix';
import Signatures from '@/components/Signatures';
import StreetFood from '@/components/StreetFood';
import RiceDelights from '@/components/RiceDelights';
import FoodShowcase from '@/components/FoodShowcase';
import PlattersBanner from '@/components/PlattersBanner';
import Menu from '@/components/Menu';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews.jsx';
import Contact from '@/components/Contact';
import Newsletter from '@/components/Newsletter';

export default function Home() {
  return (
    <>
      <KcrHero />
      <About />
      <KineticMatrix />
      <Signatures />
      <StreetFood />
      <RiceDelights />
      <FoodShowcase />
      <PlattersBanner />
      <Menu />
      <Gallery />
      <Reviews />
      <Contact />
      <Newsletter />
    </>
  );
}
