import floweringPlants from "../../assets/flower.png";
import hangingPlants from "../../assets/hanging.png";
import plantCare from "../../assets/tools.png";
import succulents from "../../assets/succulent.png";
import outdoorPlants from "../../assets/palmLeaves.png";
import mobileOutdoor from "../../assets/mobileOutdoor.png";
import mobileFlower from "../../assets/mobileFlower.png";
import mobileSucculents from "../../assets/mobileSucculent.png";
import mobileTools from "../../assets/mobileTools.png";
import mobileHanging from "../../assets/mobileHanging.png";
import { useNavigate } from "react-router-dom";


const cards = [

  {
    id:2,
    title: "Outdoor Plants",
    desc:
      "Tough enough to brave the outdoors, yet charming enough to welcome in.",
    img: mobileOutdoor,
  },
  {
    id:4,
    title: "Flowering Plants",
    desc:
      "A pop of color and a breath of fragrance, all in one lovely bloom.",
    img: mobileFlower,
  },
  {
    id:3,
    title: "Succulents",
    desc: "Low effort, high charm. Perfect for forgetful friends.",
    img: mobileSucculents,
  },
  {
    id:6,
    title: "Plant Care",
    desc: "Everything you need to pamper your leafy companions.",
    img: mobileTools,
  },
  {
    id:7,
    title: "Hanging Plants",
    desc: "Take your plant obsession to new heights—literally.",
    img: mobileHanging,
  },
];


// console.log(typeof succulents)
const handleWheel = (e) => {
  if (e.deltaY === 0) return;

  e.preventDefault();
  e.currentTarget.scrollLeft += e.deltaY;
};

const Showcase = () => {
  const navigate = useNavigate()

  return (
    <section className="w-full">
      {/* Mobile swipe layout */}
      <div onWheel={handleWheel} className="sm:hidden px-5 overflow-x-scroll hide-scrollbar">
        <div className="flex gap-5 px-4 py-6 w-max">
          {cards.map((card, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 w-[80vw] h-[440px] bg-gray-100 rounded-lg shadow-md overflow-hidden group"
            >
              <div onClick={()=>navigate(`/browse?category=${card.id}`)} className="absolute inset-0"></div>
              <div className="z-1 inset-0 flex flex-col justify-end gap-2 px-5 pt-5 ">
                <h2 className="text-2xl font-bold text-text">{card.title}</h2>
                <p className="text-text text-[1rem] font-light">
                  {card.desc}
                </p>
              </div>
                  <img
                    loading="lazy"
                    src={card.img}
                    alt={card.title}
                    className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 h-[80%] object-contain z-0"
                  />
            </div>
          ))}
        </div>
      </div>

    <div className="hidden sm:grid h-[540px] grid-cols-7 grid-rows-8 gap-7">
      {/* Card - 1 */}
      <div className="relative overflow-hidden rounded-lg flex col-start-1 row-start-1 row-end-9 col-end-4 md:row lg:col-end-3 bg-gray-100 shadow-md group ">
        <img
          loading="lazy"
          className="absolute h-full top-[-50px] right-[-30px] object-contain scale-120 group-hover:scale-140  group-hover:translate-y-10 transition-all ease-in-out duration-300"
          src={outdoorPlants}
          alt=""
        />
        <div onClick={()=>navigate(`/browse?category=${2}`)} className="absolute inset-0"></div>
        <div className="absolute rounded-md inset-0 text-text flex flex-col items-baseline justify-end px-8 py-12 gap-1.5">
          <h2 className="text-3xl font-bold">Outdoor Plants</h2>
          <p className="font-light text-[1.1rem]">
            Tough enough to brave the outdoors, yet charming enough to welcome
            in.
          </p>
        </div>
      </div>

      {/* Card - 2 */}
      <div className=" relative flex overflow-hidden rounded-lg row-start-1 row-end-5 col-end-9 col-start-4 lg:col-start-3 lg:col-end-6  bg-gray-100 shadow-md group">
        <img
          loading="lazy"
          className="absolute h-full object-cover top-[140px] right-[50px] scale-230 group-hover:scale-360 group-hover:translate-y-25 group-hover:translate-x-10 transition-all ease-in-out duration-300"
          src={floweringPlants}
          alt=""
        />
        <div onClick={()=>navigate(`/browse?category=${4}`)} className="absolute inset-0"></div>
        <div className="absolute rounded-md h-full w-[50%] left-0 text-text flex flex-col items-start justify-center px-8 py-12">
          <h2 className="text-3xl font-bold">Flowering Plants</h2>
          <p className="font-light text-[1.1rem]">
            A pop of color and a breath of fragrance, all in one lovely bloom.
          </p>
        </div>
      </div>

      {/* Card - 3 */}
      <div className=" relative hidden xl:flex overflow-hidden rounded-lg col-start-6 col-end-9 row-start-1 row-end-5 bg-gray-100 shadow-md group">
        <picture>
                    <source srcSet={succulents.replace().Webp} type="image/webp" />
                    <source srcSet={succulents.Avif} type="image/avif" />
                    <img loading="lazy" className="object-fit" src={succulents} alt={'succulents'} />
        </picture>
        <img
          loading="lazy"
          className="absolute h-full object-cover left-[-25px] bottom-[40px] scale-200 group-hover:scale-220  group-hover:-translate-y-5 transition-all ease-in-out duration-300"
          src={succulents}
          alt=""
        />
        <div onClick={()=>navigate(`/browse?category=${3}`)} className="absolute inset-0"></div>
        <div className="absolute rounded-md h-full w-[60%] right-0 text-text flex flex-col items-start justify-center px-8 py-12">
          <h2 className="text-3xl font-bold">Succulents</h2>
          <p className="font-light text-[1.1rem]">
            Low effort, high charm. Perfect for forgetful friends.
          </p>
        </div>
      </div>

      {/* Card - 4 */}
      
      <div className="relative overflow-hidden rounded-lg col-start-4 row-end-9 row-start-5 col-end-9 lg:col-start-3 lg:col-end-6 xl:col-end-5 xl:row-end-9  bg-gray-100  shadow-md group">
        <img
          loading="lazy"
          className="absolute h-full object-cover scale-120 right-[-10px] top-[60px] group-hover:scale-140  transition-all ease-in-out duration-300"
          src={plantCare}
          alt=""
        />
        <div onClick={()=>navigate(`/browse?category=${6}`)} className="absolute inset-0"></div>
        <div className="absolute rounded-md h-full w-[50%] left-0 text-text flex flex-col items-start justify-center px-8 py-12">
          <h2 className="text-3xl font-bold">Plant Care</h2>
          <p className="font-light text-[1.1rem]">
            Everything you need to pamper your leafy companions.
          </p>
        </div>
      </div>

      {/* Card - 5 */}
      
      <div className="  flex overflow-hidden rounded-lg lg:col-start-6 relative lg:row-start-1 xl:col-start-5 xl:row-start-5 col-end-9 row-end-9 bg-gray-100 shadow-md group">
        <img
          loading="lazy"
          className="origin-top absolute h-full object-contain left-[0px] lg:top-[-200px] xl:top-[-45px] lg:scale-140 xl:scale-130 group-hover:animate-swing transition-all ease-in-out duration-300"
          src={hangingPlants}
          alt=""
        />
        <div onClick={()=>navigate(`/browse?category=${7}`)} className="absolute inset-0"></div>
        <div className="absolute rounded-md lg:bottom-0 h-full xl:w-[50%] right-0 text-text flex flex-col lg:items-baseline lg:justify-end xl:items-start xl:justify-center px-8 py-12">
          <h2 className="text-3xl font-bold">Hanging Plants</h2>
          <p className="font-light text-[1.1rem]">
            Take your plant obsession to new heights—literally.
          </p>
        </div>
      </div>
    </div>
    </section>
  );
};

export default Showcase;
