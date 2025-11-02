import HeroSection from "../components/Hero/HeroSection"
import Highlights from "../components/Highlights/Highlights";
import Navbar from "../components/NavBar/Navbar"
import Logo from "../components/NavBar/Logo";
import Showcase from "../components/Showcase/Showcase";
import Carousel from "../components/Testimonial/Carousel";

const LandingPage = () => {
  console.log("API Base URL:", import.meta.env.VITE_API_URL);

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



    <section className="w-full h-fit bg-gray-100">
      <div className="h-[140px] bg-black/80 flex flex-col sm:flex-row items-center justify-between px-8">
        
        <div className="">
          <Logo size={'60px'}  f_size={'1.8rem'} font={'text-zinc-200'}/>
        </div>
        

          <div className="text-gray-300 text-sm  tracking-wide ">
            © {new Date().getFullYear()} Leafy Neighbour.  All rights reserved.
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;