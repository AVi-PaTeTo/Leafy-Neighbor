import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCategories } from "../../api/ApiFunctions";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const NavLinks = (props) => {
  const links = ["Home", "Categories", "Vendor", "About", "Contact"];
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  function toVendorDashboard(){
    const businessName = userData.vendor_profile.business_name? userData.vendor_profile.business_name.split(" ").join("_") : "Default_business_name"
    const vendorId = user.vendor_profile.id
    navigate(`/vendor/${businessName}`, { state: { vendorId } })
  }

  const navigationLinks = links.map((link) => {
    if (link === "Categories") {
      return (
        <div
          key={link}
          className=" pb-2 group"
          onMouseOver={() => setCategoryDropdown(true)}
          onMouseLeave={() => setCategoryDropdown(false)}
          onClick={() => setCategoryDropdown((prev) => !prev)}
        >
          <li
            className={`flex transition-transform duration-100 ease-in-out group-hover:cursor-pointer ${
              categoryDropdown ? "-translate-y-1 border-b-2" : ""
            }  border-b-primary`}
          >
            {link}
            <svg
              className={`fill-black ${
                categoryDropdown ? "scale-y-[-1]" : ""
              } transition-transform ease-in-out duration-500`}
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
            </svg>
          </li>
        </div>
      );
    } else if (link === "Vendor") {
      if (!user) return null;
      if (!user.is_vendor) return null;
        return (
          <div
            className="pb-2 group"
            key={link}
            onClick={toVendorDashboard}
          >
            <li className="transition-transform  duration-100 ease-in-out group-hover:-translate-y-1 group-hover:cursor-pointer group-hover:mb-4  group-hover:border-b-2 border-b-primary">
              {link}
            </li>
          </div>
        );
    } else {
      return (
        <Link
          className=" pb-2 group"
          key={link}
          to={link === "Home" ? "/" : link.toLowerCase()}
        >
          <li className="transition-transform  duration-100 ease-in-out group-hover:-translate-y-1 group-hover:cursor-pointer group-hover:mb-4  group-hover:border-b-2 border-b-primary">
            {link}
          </li>
        </Link>
      );
    }
  });

  return (
    <>
      <ul className="flex gap-5 text-[1.1rem] font-nunito">
        {navigationLinks}
      </ul>
      <div
        onMouseOver={() => {
          setCategoryDropdown(true);
        }}
        onMouseLeave={() => {
          setCategoryDropdown(false);
        }}
        className={`absolute bg-gradient-to-b from-zinc-100 to-[#f7f9ef] outline-[#e7edcf] left-17 top-[33px] rounded-sm shadow-sm transition-all ease-in-out duration-200 grid ${
          categoryDropdown
            ? "grid-rows-[1fr] pt-4 pb-2 outline-1"
            : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden flex flex-col gap-2 pl-8 w-[200px]">
          {props.categories.map((category) => (
            <p
              onClick={() => navigate(`/browse?category=${category.id}`)}
              className="hover:cursor-pointer hover:translate-x-2 transition-all ease-in-out duration-50"
              key={category.id}
            >
              {category.name}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default NavLinks;
