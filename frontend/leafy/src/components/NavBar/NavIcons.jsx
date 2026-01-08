import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { iconsData } from "./iconsData";
import { useUser } from "../../context/UserContext";


const NavIcons = (props) => {
  const navigate = useNavigate()
  const { user } = useUser()
  const icons= useState(iconsData);
  const [userMenu, setUserMenu] = useState(false)

  function logButton(){
    if(user!=null){
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('current_user');
      console.log('Logged out successfully.')
    }
    navigate('login')
  }

  const navigationIcons = icons.map((icon) => {
    if(icon.name === 'search'){ return (
        <li 
          key={icon.id}
          id={icon.id}
          onClick={props.searchIcon}
        >
          {icon.svg}
        </li>
    )
      } else if (icon.name === 'user') { return (
        <p className="hidden md:block group hover:cursor-pointer" to={'settings'} key={icon.id} onClick={()=>setUserMenu(prev => !prev)}  onMouseOver={()=>setUserMenu(true)} onMouseLeave={()=>setUserMenu(false)}> 
        <li 
          id={icon.id}
        >
          {icon.svg}
        </li>
      </p>
      )
      } else { return(
      <Link className="hidden md:block " to={icon.name} key={icon.id}>
        <li 
          id={icon.id}
        >
          {icon.svg}
        </li>
      </Link>
    )}
  });

  return(
  <section className=" pt-2">
    <ul className="flex gap-3 items-center ">{navigationIcons}</ul>
    <div 
        onMouseOver={()=>setUserMenu(true)} 
        onMouseLeave={()=>setUserMenu(false)} 
        className={`absolute  bg-gradient-to-b from-zinc-100 to-[#f7f9ef] outline-[#e7edcf]  shadow-sm rounded-sm pl-6 w-[170px] z-60 right-0 top-9 grid transition-all ease-in-out duration-200 ${userMenu? 'grid-rows-[1fr] py-4 outline-1':'grid-rows-[0fr]'}`}
    >
      <div className={` flex flex-col gap-2  overflow-hidden`}>
        <Link className="hover:translate-x-2 transition-all ease-in-out duration-50" to={'settings'}>Profile</Link>
        <p className="hover:translate-x-2 hover:cursor-no-drop transition-all ease-in-out duration-50" >Addresses</p>
        <Link className="hover:translate-x-2 transition-all ease-in-out duration-50 " to={'orders'}>Your Orders</Link>
        <p onClick={() => logButton()} className="hover:translate-x-2 hover:cursor-pointer transition-all ease-in-out duration-50" >{user!=null? 'Log out':'Log In'}</p>
      </div>
    </div>
  </section>  
);
};

export default NavIcons;
