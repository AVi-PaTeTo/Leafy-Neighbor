import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { getCategories } from "../../api/ApiFunctions";
import { useNavigate } from "react-router-dom";

const NavLinks = (props) => {
  const links = ["Home", "Categories", "About", "Contact"];
  const [categoryDropdown, setCategoryDropdown] = useState(false)
  const navigate = useNavigate()


  const navigationLinks = links.map((link) => {
    if (link === "Categories"){ return(
      <li key={link}
        onMouseOver={() => setCategoryDropdown(true)}
        onMouseLeave={() => setCategoryDropdown(false)}
        onClick={() => setCategoryDropdown(prev => !prev)}
        className="flex transition-transform duration-100 ease-in-out hover:cursor-pointer hover:-translate-y-1 hover:border-b-2 border-b-primary"
        >
            {link} 
            <svg className={`fill-black ${categoryDropdown?'scale-y-[-1]':''} transition-transform ease-in-out duration-500`} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
      </li>
      )
    } else {
      return (
        
        <Link key={link} to={link === 'Home'?'/':link.toLowerCase()}>
          <li
            className="transition-transform  duration-100 ease-in-out hover:cursor-pointer hover:-translate-y-1 hover:mb-4  hover:border-b-2 border-b-primary"
            
          >{link}</li>
        </Link>
      )
    }
  }
  );

  return (
    <>
      <ul className="flex gap-5 text-[1.1rem] font-nunito">
        {navigationLinks}
      </ul>
      <div 
          onMouseOver={() => setCategoryDropdown(true)}
          onMouseLeave={() => setCategoryDropdown(false)}
          className={`absolute bg-gray-100 left-17 top-[33px] rounded-sm shadow-sm transition-all ease-in-out duration-200 grid ${categoryDropdown?'grid-rows-[1fr] pt-4 pb-2':'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden flex flex-col gap-2 pl-8 w-[200px]">
          {props.categories.map(category => (
            <p onClick={()=>navigate(`/browse?category=${category.id}`, { replace: true })} className="hover:cursor-pointer hover:translate-x-2 transition-all ease-in-out duration-50" key={category.id}>{category.name}</p>
          ))}
        </div>

      </div>
    </>

  );
};

export default NavLinks;
