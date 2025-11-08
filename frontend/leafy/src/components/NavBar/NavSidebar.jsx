import { Link } from "react-router-dom"
import Logo from "./Logo"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../context/UserContext";

const NavSidebar = (props) => {
    const [categoryDropdown, setCategoryDropdown] = useState(false)
    const [userDropdown, setUserDropdown] = useState(false)
    const {user} = useUser()
    const navigate = useNavigate()


    const closeDropdowns = () =>{
        setCategoryDropdown(false)
        setUserDropdown(false)
        props.onClick(false)
    }

      function logButton(){
        if(user != null && user.id!="" ){
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('current_user');
        console.log('Logged out successfully.')
        }
        navigate('login')
    }


    return(
        <div
            onClick={(e) => {if (e.target === e.currentTarget) {props.onClick(false);}}} 
            className={`fixed ${props.sidebar?'w-screen':''} h-screen top-0 left-[-1px] z-30`}>
            <div className={`h-screen transition-all ease-in-out duration-700  bg-gray-800 ${props.sidebar?'w-[300px]':'w-0 '} overflow-hidden fixed md:hidden z-31`}>
                <div className="relative h-[100dvh]">
                    <div className="absolute w-[300px] pt-1 top-[-1px] left-[57px]  bg-gray-800 z-5">
                        <Logo  size={'40px'} f_size={'1.1rem'} font={'text-white'}/>
                    </div>
                    <div className="overflow-hidden overflow-y-auto .hide-scrollbar h-[calc(100vh-56px)]">
                        <div className={` w-full h-fit px-8 pb-15 pt-20 flex flex-col gap-3  ${props.sidebar? '':''} font-semibold text-xl text-white`}>
                            <div className="hover:bg-gray-700 relative transition-colors duration-100 ease-in-out pl-8 py-2 w-[236px] rounded-md flex gap-2">
                                <Link onClick={() => {closeDropdowns()}} to={'/'} className="absolute inset-0"></Link>
                                <svg className="h-[24px] w-[24px] shrink-0 flex-none stroke-[1.5px]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                                Home
                            </div>

                            {(user != null && user.is_vendor) && 
                                <div className="hover:bg-gray-700 relative transition-colors duration-100 ease-in-out pl-8 py-2 w-[236px] rounded-md flex gap-2">
                                <Link onClick={() => {closeDropdowns()}} to={`/vendor/${user.vendor_profile.id}`} className="absolute inset-0"></Link>
                                {/* <svg className="h-[24px] w-[24px] shrink-0 flex-none stroke-[1.5px]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg> */}
                                <svg className="h-[24px] w-[24px] shrink-0 flex-none stroke-[1.5px]" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"/></svg>
                                Vendor
                            </div>}

                            <div> 
                                <div 
                                    onClick={() => setUserDropdown(prev => !prev)}
                                    className="flex gap-2 items-center  pl-8 py-[6px] w-[236px] hover:cursor-pointer hover:bg-gray-700 rounded-md">
                                    <svg className="h-[26px] w-[26px] shrink-0 flex-none stroke-[1.5px]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" ><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
                                    <h2 className="pt-1 flex justify-between w-full">User <svg className={`fill-white mr-2 ${userDropdown?'scale-y-[-1]':''} transition-transform ease-in-out duration-300`} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg></h2>
                                </div>
                                <div className={`grid ${userDropdown?'grid-rows-[1fr] pb-4':'grid-rows-[0fr]'} transition-all ease-in-out duration-600`}>
                                    <div className="overflow-hidden  flex flex-col gap-2 pl-11 w-[250px]">
                                        <div className="border-l-1 pl-4 flex flex-col">
                                            <Link onClick={() => {closeDropdowns()}} to={'settings'} className="font-light mt-2 hover:translate-x-2 transition-all ease-in-out duration-200">Profile</Link>
                                            <Link onClick={() => {closeDropdowns()}} to={'wishlist'} className="font-light mt-2 hover:translate-x-2 transition-all ease-in-out duration-200">Wishlist</Link>
                                            <Link onClick={() => {closeDropdowns()}} to={'cart'} className="font-light mt-2 hover:translate-x-2 transition-all ease-in-out duration-200">Cart</Link>
                                            <Link onClick={() => {closeDropdowns()}} to={'orders'} className="font-light mt-2 hover:translate-x-2 transition-all ease-in-out duration-200">Orders</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div> 
                                <div 
                                    onClick={() => setCategoryDropdown(prev => !prev)}
                                    className="flex gap-2 items-center pl-8 py-[6px] w-[236px] hover:cursor-pointer hover:bg-gray-700 rounded-md">
                                    <svg className="h-[26px] w-[26px] shrink-0 flex-none" xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#ffffff"><path d="m260.67-524 220-356 220 356h-440ZM704-80q-74.33 0-125.17-50.83Q528-181.67 528-256t50.83-125.17Q629.67-432 704-432t125.17 50.83Q880-330.33 880-256t-50.83 125.17Q778.33-80 704-80Zm-584-23.33v-309.34h309.33v309.34H120Zm584.06-43.34q45.94 0 77.61-31.72 31.66-31.72 31.66-77.67 0-45.94-31.72-77.61-31.72-31.66-77.67-31.66-45.94 0-77.61 31.72-31.66 31.72-31.66 77.67 0 45.94 31.72 77.61 31.72 31.66 77.67 31.66ZM186.67-170h176v-176h-176v176ZM380-590.67h201.33L480.67-753.33 380-590.67Zm100.67 0ZM362.67-346ZM704-256Z"/></svg>
                                    <h2 className="pt-1 flex justify-between w-full">Categories <svg className={`fill-white mr-2 ${categoryDropdown?'scale-y-[-1]':''} transition-transform ease-in-out duration-300`} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg></h2>
                                </div>
                                <div className={`grid ${categoryDropdown?'grid-rows-[1fr] pb-4':'grid-rows-[0fr]'} transition-all ease-in-out duration-600`}>
                                    <div className="overflow-hidden  flex flex-col gap-2 pl-11 w-[250px]">
                                        <div className="border-l-1 pl-4 w-full">

                                            {props.categories.map(category => (
                                                <p onClick={()=>{navigate(`/browse?category=${category.id}`, { replace: true })
                                                                closeDropdowns()
                                                                }} className="font-light mt-2 hover:translate-x-2 transition-all ease-in-out duration-200" key={category.id}>{category.name}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="hover:bg-gray-700 relative transition-colors duration-100 ease-in-out  pl-8 py-2 w-[236px] rounded-md flex gap-2">
                                <Link onClick={() => {closeDropdowns()}} to={'about'} className="absolute inset-0"></Link>
                                <svg className="h-[24px] w-[24px] shrink-0 flex-none " xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                                {/* <svg className="h-[24px] w-[24px] shrink-0 flex-none stroke-accent fill-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg> */}
                                About
                            </div>

                            <div className="hover:bg-gray-700 relative transition-colors duration-100 ease-in-out  pl-8 py-2 w-[236px] rounded-md flex gap-2">
                                <Link onClick={() => {closeDropdowns()}} to={'contact'} className="absolute inset-0"></Link>
                                <svg className="h-[24px] w-[24px] shrink-0 flex-none stroke-[1.5px]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" ><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>
                                Contact
                            </div>
                        </div>
                    </div>

                    {/* user pill */}
                    <div className="absolute px-4 py-2 w-full bottom-0 h-[60px] bg-gray-800">
                        <div onClick={() => logButton()} className="flex items-center justify-between w-[268px] h-full rounded-[50px] outline-2 outline-gray-600 bg-gray-900">
                            <div className="ml-[2px] flex items-center gap-2">
                                <div className="rounded-[50%] h-[40px] w-[40px] bg-zinc-600 overflow-hidden">
                                    {/* <svg className="fill-white object-cover h-full w-full" xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M355.85-385.33q-22.18 0-37.35-15.32-15.17-15.32-15.17-37.5t15.32-37.35q15.32-15.17 37.5-15.17t37.35 15.32q15.17 15.32 15.17 37.5t-15.32 37.35q-15.32 15.17-37.5 15.17Zm248.67 0q-22.19 0-37.35-15.32Q552-415.97 552-438.15t15.32-37.35q15.31-15.17 37.5-15.17 22.18 0 37.35 15.32 15.16 15.32 15.16 37.5t-15.31 37.35q-15.32 15.17-37.5 15.17ZM480-146.67q139.58 0 236.46-96.96 96.87-96.97 96.87-236.68 0-25.02-3.66-49.19-3.67-24.17-10.34-45.17-20.33 5-42.84 7.17-22.51 2.17-47.16 2.17-95.07 0-179.7-39.67t-144.3-112.33q-33.33 80-95.5 139.5-62.16 59.5-143.16 91.16v6.67q0 139.58 96.87 236.46 96.88 96.87 236.46 96.87ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-79.33-723Q473.33-711 547-671.5 620.67-632 709.33-632q20.67 0 34.34-1.17 13.66-1.16 29.66-5.16-44-77.34-119.66-126.17Q578-813.33 480-813.33q-22.67 0-43 3.16-20.33 3.17-36.33 7.17ZM158.33-565.67q49-21.66 102.67-79.33t77.33-136.67Q263.33-746 221-690.33q-42.33 55.66-62.67 124.66ZM400.67-803Zm-62.34 21.33Z"/></svg> */}
                                    <img className="object-cover h-full w-full"  src={user != null && user.pfp != ""? user.pfp : "https://i.pinimg.com/736x/2b/72/16/2b7216ec94eaed014688f94bb898c81d.jpg"} alt="" />
                                </div>
                                <h2 className="text-xl font-semibold pt-0.5 text-gray-100">{user != null && user.username != ""? user.username :"Log In"}</h2>
                            </div>
                            {user == null ?
                            <svg className="fill-primary mr-3" xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#75FB4C"><path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z"/></svg> :
                            <svg className="fill-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#afc35f"><path d="M186.67-120q-27 0-46.84-19.83Q120-159.67 120-186.67v-586.66q0-27 19.83-46.84Q159.67-840 186.67-840h292.66v66.67H186.67v586.66h292.66V-120H186.67Zm470.66-176.67-47-48 102-102H360v-66.66h351l-102-102 47-48 184 184-182.67 182.66Z"/></svg>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavSidebar