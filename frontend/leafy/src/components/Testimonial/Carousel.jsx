// home garden   = https://images.unsplash.com/photo-1623358519330-00f61d89396b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
// home garden 2 = https://images.unsplash.com/photo-1586777469064-00eca3156523?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
// indoor        = https://images.unsplash.com/photo-1632230152731-72dc4351d893?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
// nursery       = https://images.unsplash.com/photo-1598902468171-0f50e32a7bf2?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
// nursery 2     = https://images.unsplash.com/photo-1582645986224-4543d27c1d32?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
// hanging garden = https://images.pexels.com/photos/7141105/pexels-photo-7141105.jpeg

import { useState } from "react";
import hangingPlantLover from "../../assets/hangingPlants.png";
import hangingPlantLoverAvif from "../../assets/avif/hangingPlants.avif";
import hangingPlantLoverWebp from "../../assets/webp/hangingPlants.webp";

import gardener from "../../assets/gardener.png";
import gardenerAvif from "../../assets/avif/gardener.avif";
import gardenerWebp from "../../assets/webp/gardener.webp";

import enthusiast from "../../assets/enthusiast.png";
import enthusiastAvif from "../../assets/avif/enthusiast.avif";
import enthusiastWebp from "../../assets/webp/enthusiast.webp";

import succulentLover from "../../assets/succulentLover.png";
import succulentLoverAvif from "../../assets/avif/succulentLover.avif";
import succulentLoverWebp from "../../assets/webp/succulentLover.webp";

import plantAndPet from "../../assets/plantAndPet.png";
import plantAndPetAvif from "../../assets/avif/plantAndPet.avif";
import plantAndPetWebp from "../../assets/webp/plantAndPet.webp";



import living from "../../assets/test_living.jpg"
import livingAvif from "../../assets/avif/test_living.avif"
import livingWebp from "../../assets/webp/test_living.webp"

import backyard from "../../assets/test_backyard.jpg"
import backyardAvif from "../../assets/avif/test_backyard.avif"
import backyardWebp from "../../assets/webp/test_backyard.webp"

import hang from "../../assets/test_hang.jpeg"
import hangAvif from "../../assets/avif/test_hang.avif"
import hangWebp from "../../assets/webp/test_hang.webp"

import indoor from "../../assets/test_indoor.jpg"
import indoorAvif from "../../assets/avif/test_indoor.avif"
import indoorWebp from "../../assets/webp/test_indoor.webp"

import nursery from "../../assets/test_nursery.jpg"
import nurseryAvif from "../../assets/avif/test_nursery.avif"
import nurseryWebp from "../../assets/webp/test_nursery.webp"



const cards = [
  {
    name: "Sunita",
    title: "The Vine Whisperer",
    review:
      "I started by sharing my vines with friends, and now I sell my hanging plant cuttings on Leafy. It’s so easy to manage listings and connect with other plant lovers. I've shipped to 4 states already!",
    portrait: [hangingPlantLover,hangingPlantLoverAvif, hangingPlantLoverWebp],
    img: [hang, hangAvif, hangWebp],
  },

  {
    name: "Arjun",
    title: "The Feline-Friendly Gardener",
    review:
      "Finding cat-safe plants used to be a hassle—until I found Leafy. Now I shop with peace of mind knowing the listings are clear, and I’ve even followed a few vendors who specialize in pet-friendly greenery.",
    portrait: [plantAndPet,plantAndPetAvif, plantAndPetWebp],
    img: [living, livingAvif, livingWebp],
  },

  {
    name: "Meera",
    title: "Plant Stylist",
    review:
      "Leafy helped me turn my small apartment into a jungle dream. I found stylish planters and the perfect low-light plants from vendors who know what they’re doing. Everything was delivered with care.",
    portrait: [succulentLover,succulentLoverAvif, succulentLoverWebp],
    img: [indoor, indoorAvif, indoorWebp],
  },

  {
    name: "Kamala",
    title: "The Backyard Blossom",
    review:
      "I wanted to gift my granddaughter a tulsi plant and found a lovely one right on Leafy. I also discovered new seeds and fertilizers I couldn’t find in local stores. Everything came to my doorstep!",
    portrait: [enthusiast,enthusiastAvif, enthusiastWebp],
    img: [backyard, backyardAvif, backyardWebp],
  },

  {
    name: "Rajiv",
    title: "The Plant Curator",
    review:
      "Selling online used to be confusing, but Leafy made it effortless. Now I list my plants directly from my nursery, and buyers from across the city find me. I’ve sold more in 3 months than the past year!",
    portrait:[ gardener,gardenerAvif, gardenerWebp],
    img: [nursery, nurseryAvif, nurseryWebp],
  },
];

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () =>
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % cards.length);

  const positions = {
    0: [0, 100],
    1: [98, 80],
    2: [198, 60],
    3: [-198, 60],
    4: [-98, 80],
  };

  return (

    //cards container
    <div className="relative w-full h-full flex items-center justify-center bg-gray-100 overflow-hidden">
      <button
        onClick={handlePrev}
        className="absolute left-4 z-30 bg-white/80 text-white px-3 py-2 rounded"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#000000"
        >
          <path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z" />
        </svg>
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 z-30 bg-white/80 text-white px-3 py-2 rounded"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#000000"
        >
          <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
        </svg>
      </button>

      {/* Carousel Cards */}
      <div className="relative w-full h-full flex justify-evenly items-center overflow-clip">
        {cards.map((item, index) => {
          const pos =
            positions[(index - activeIndex + cards.length) % cards.length][0];
          const size =
            positions[(index - activeIndex + cards.length) % cards.length][1];
          return (
            <div
              key={index}
              className={`rounded-2xl overflow-hidden object-fit flex justify-center items-center absolute w-[80%] sm:w-[70%] h-[80%] translate-x-[${pos}%] scale-${size} transition-all duration-1200 ease-in-out ${
                Math.abs(pos) === 198 ? "opacity-0 z-0" : "opacity-100 z-5"
              }`}
            >

              <div className="absolute flex z-6 inset-0 py-5 pt-8 sm:py-8 px-4">

                {/* testimonial portrait */}
                <div className="block absolute z-4 right-1/2 translate-x-1/2 sm:translate-x-0 sm:right-10 mid-md:hidden h-[150px] w-[150px] sm:h-[200px] sm:w-[200px] bg-primary rounded-[50%] overflow-clip">
                  <picture>
                    <source srcSet={item.portrait[2]} type="image/webp" />
                    <source srcSet={item.portrait[1]} type="image/avif" />
                    <img  className="object-fit" src={item.portrait}  />
                  </picture>
                </div>
                <img
                  className="hidden mid-md:block relative z-6 object-fit"
                  src={item.portrait[0]}
                  alt=""
                />

                {/* Review Box */}
                <div className=" absolute rounded-xl mr-5 pt-7 sm:mx-10 sm:px-6 h-[69%] mid-md:px-[0px] mid-md:mx-0 mid-md:right-[20px] flex z-3 mid-md:w-[69%] lg:w-[70%] xl:w-[80%] min-h-max-[60%] bg-white/70 sm:bg-white/60 self-end">
                  <div className="mid-md:pl-[8rem] lg:pl-[8rem] xl:pl-[10rem] flex flex-col py-[20px] justify-center sm:gap-2 px-5">
                    <h2 className="text-black/85 font-bold text-2xl sm:text-4xl xl:text-5xl">
                      {item.name}
                    </h2>
                    <p className=" font-medium text-[1.1rem] sm:text-2xl xl:text-3xl">
                      {item.title}
                    </p>
                    <p className="text-[.9rem] sm:text-[1rem] mid-md:text-xl">"{item.review}"</p>
                  </div>
                </div>
              </div>
              
              {/* card background and overlay */}
              <div className="absolute backdrop-blur-[2px] inset-0 bg-black/40 z-2"></div>
                <picture className=" overflow-clip object-cover h-full w-full object-bottom">
                  <source srcSet={item.img[2]} type="image/webp" />
                  <source srcSet={item.img[1]} type="image/avif" />
                  <img 
                    className=" overflow-clip object-cover h-full w-full object-bottom"
                    src={item.img[0]}
                    alt=""
                  />
                </picture>
              
            </div>
          );
        })}
      </div>
    </div>
  );
}

{
  /* <div class="overflow-hidden object-fit flex justify-center items-center absolute w-[70%] h-[80%] bg-accent translate-x-[-98%] scale-80 transition-all duration-1200 ease-in-out opacity-100 z-5"></div>
<div class="overflow-hidden object-fit flex justify-center items-center absolute w-[70%] h-[80%] bg-accent translate-x-[0] scale-100 transition-all duration-1200 ease-in-out opacity-100 z-5"></div>
<div class="overflow-hidden object-fit flex justify-center items-center absolute w-[70%] h-[80%] bg-accent translate-x-[98%] scale-80 transition-all duration-1200 ease-in-out opacity-100 z-5"></div>
<div class="overflow-hidden object-fit flex justify-center items-center absolute w-[70%] h-[80%] bg-accent translate-x-[198%] scale-60 transition-all duration-1200 ease-in-out opacity-100 z-5"></div>
<div class="overflow-hidden object-fit flex justify-center items-center absolute w-[70%] h-[80%] bg-accent translate-x-[-198%] scale-60 transition-all duration-1200 ease-in-out opacity-100 z-5"></div> */
}

{
  /*  */
}
