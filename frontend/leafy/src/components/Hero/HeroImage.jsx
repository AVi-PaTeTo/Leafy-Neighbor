import heroJpg from "../../assets/SecondaryHeroSection.jpg";
import heroWebp from '../../assets/webp/SecondaryHeroSection.webp';
import heroAvif from '../../assets/avif/SecondaryHeroSection.avif';

const HeroImage =()=>{
    return(

        <div className="col-start-1 col-end-4 row-start-1 row-end-4 w-full h-full overflow-hidden z-0 min-w-0">
            <picture>
                <source srcSet={heroWebp} type="image/webp" />
                <source srcSet={heroAvif} type="image/avif" />
                <img loading="lazy" className="object-cover w-full h-full object-right" src={heroJpg} alt={"hero section background"} />
            </picture>
            {/* <img
                className="object-cover w-full h-full object-right"
                src="../assets/SecondaryHeroSection.jpg"
                alt="hero section background"
                loading="lazy"
            /> */}
        </div>
    )
}

export default HeroImage