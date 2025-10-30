import { useState, useEffect } from "react"
import Logo from "./Logo"
import NavIcons from "./NavIcons"
import NavLinks from "./NavLinks"
import NavSidebar from "./NavSidebar"
import { getCategories} from "../../api/ApiFunctions"

const Navbar = (props) => {
    const [sidebar, setSidebar] = useState(false)
    const [categories,setCategories] = useState([])

    useEffect(() => {        
                const fetchCategories =async() =>{
                    const response = await getCategories()
                    setCategories(response.data)
                }
                fetchCategories()
            },[]
        )
    

    return(
        <div className="relative z-10 flex p-4 bg-gray-100 w-full h-[4rem] shadow-md rounded-md ">
            
            {/* hamburger for mobile view */}
            <div onClick={() => {
                                setSidebar(prev => !prev)
                                // props.setSearchActive(prev => prev===true?false:prev)
                                }} 
                className="flex items-center md:hidden">
                <svg className={`group z-31 transition-colors ease-in-out duration-200 ${sidebar?'fill-white ':' delay-400'}`} id="hamburger" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 100 100">
                    <rect    x="20" y="30" width="60" height="10" rx="5"/>
                    <rect  x="20" y="50" width="60" height="10" rx="5"/>
                    <rect  x="20" y="70" width="60" height="10" rx="5"/>
                </svg>
            </div>

            <NavSidebar  categories={categories} sidebar={sidebar} onClick={setSidebar}/>

            <div className="flex w-full h-full justify-between">
                

                <div id='items' className="relative flex justify-between  w-full h-full -top-1">
                    <div className="absolute md:static -translate-y-[9px]">
                            <Logo sidebar={sidebar} search={props.searchActive} size={'40px'} f_size={'1.1rem'} font={'text-text'}/>
                    </div>
                    <div className="w-full h-full pr-2 md:px-4">
                        <div className="relative flex justify-between md:justify-center z-10">
                            <div className={`pt-1.5 items-center hidden md:flex  transition-transform duration-300 ease-in-out ${props.searchActive? '-translate-y-[200%]':'translate-y-0 delay-600'}`}>
                                <NavLinks categories={categories}/>
                            </div> 
                            <form onSubmit={(e)=>{   e.preventDefault()
                                                    props.applySearchFilter()}} className={`absolute overflow-hidden flex right-0 outline-1 outline-gray-300 origin-right rounded-4xl bg-gray-200 h-10 transition-all duration-700 ease-in-out  ${props.searchActive? 'w-full pl-2 delay-150':'w-0 invisible'} `}>
                                <input className="h-full w-full px-2 focus:outline-0 overflow-hidden" type="text" value={props.searchText} onChange={(e)=> props.setSearchText(e.target.value)}/>
                                <button onClick={()=> props.applySearchFilter(true)} className={`font-semibold hover:cursor-pointer px-2 bg-primary transition-all duration-700 ease-in-out  ${props.searchActive? 'visible delay-700':'translate-x-100'}`}>Search</button>
                            </form>
                        </div>
                    </div>
                    <div className="">
                            <NavIcons searchIcon={props.handleSearchIcon}/> 
                    </div>
                    
                </div>

                
            </div>
        </div>
    )
}

export default Navbar