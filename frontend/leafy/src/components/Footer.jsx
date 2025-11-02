import Logo from "./NavBar/Logo";

const Footer = () =>{
    return(
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
    )}

export default Footer;