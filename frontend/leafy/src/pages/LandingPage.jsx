import HeroSection from "../components/Hero/HeroSection";
import Highlights from "../components/Highlights/Highlights";
import Navbar from "../components/NavBar/Navbar";
import Logo from "../components/NavBar/Logo";
import Showcase from "../components/Showcase/Showcase";
import Carousel from "../components/Testimonial/Carousel";
import Footer from "../components/Footer";

const LandingPage = () => {

  return (
    <div className="relative w-full bg-primary">
      <section className=" h-screen w-full">
        <HeroSection />
      </section>

      <section className="w-full h-fit xl:px-20 px-10 py-12">
        <Highlights />
      </section>

      <section className="w-full h-fit xl:px-20 sm:px-10 py-12">
        <Showcase />
      </section>

      <div className="w-full h-[80vh] bg-white flex items-center justify-center">
        <Carousel />
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
