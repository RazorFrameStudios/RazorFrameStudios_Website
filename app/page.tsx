import Hero from "./components/sections/Hero";
import Services from "./components/sections/Services";
import Portfolio from "./components/sections/Portfolio";
import WhyChooseUs from "./components/sections/WhyChooseUs";
import Testimonials from "./components/sections/Testimonials";
import Booking from "./components/sections/Booking";
import About from "./components/sections/About";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <WhyChooseUs />
      <Testimonials />
      <Booking />
    </main>
  );
}