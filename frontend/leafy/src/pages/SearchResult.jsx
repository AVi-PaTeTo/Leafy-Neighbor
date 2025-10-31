import Navbar from "../components/NavBar/Navbar"

import { useState, useEffect } from "react"
import { getProducts, addToCart, getWishlist, getCategories } from "../api/ApiFunctions"
import { useNavigate, useLocation } from "react-router-dom"
import { useUser } from "../context/UserContext";
import SimplePopup from "../components/Wishlist/WishlistPopup"
import SideBar from "../components/Filter/SideBar"
import StarRating from "../components/Reviews/StarRating"

const SearchResult = (props) => {
    const location = useLocation()
    const navigate = useNavigate();
    const { user } = useUser();
    const [categories, setCategories] = useState([])
    const [queryTerm, setQueryTerm] = useState('')
    const [prodData, setProdData] = useState()
    const [popupOpen, setPopupOpen] = useState(false);
    const [wishlist, setWishlist] = useState()
    const [itemToAdd, setItemToAdd] = useState(null)
    const [loading, setLoading] = useState(false)
    const [urlParams, setUrlParams] = useState(location.search)
    const [filterParams, setFilterParams] = useState(null)
    const [sortPopUp, setSortPopUp] = useState(false)
    const [ordering, setOrdering] = useState('')
    const sortParams = {
        priceLow: 'price',
        priceHigh: '-price',
        reviewsLow: 'reviews',
        reviewsHigh: '-reviews',
        priceLow: 'price',
        priceHigh: '-price'
    }
    

    function handleCardClick(id,prodName){
        navigate(`/browse/${prodName}`, { state: { id } });
    }

    useEffect(() => {
    if (popupOpen) {
        document.body.classList.add('noscroll');
    } else {
        document.body.classList.remove('noscroll');
    }
    // Optional: cleanup on unmount
    return () => document.body.classList.remove('noscroll');
    }, [popupOpen]);

    useEffect(() => { 
                const fetchCategories =async() =>{
                const response = await getCategories();
                setCategories(response.data)
            }
            
            const refreshWishlists = async () => {
                try {
                    const response = await getWishlist();
                    if (response && response.status === 200 && response.data) {
                    setWishlist(response.data);
                    } else {
                    console.error('Failed to get wishlists:', response);

                    }
                } catch (error) {
                    if (error.response) {
                    console.error(
                        'Error fetching wishlists:',
                        error.response.status,
                        error.response.data
                    );
                    } else if (error.request) {
                    console.error('No response received:', error.request);
                    } else {
                    console.error('Error setting up request:', error.message);
                    }
                } finally {
                    setLoading(false)
                }
                };
            fetchCategories();
            if(user != null) {
                refreshWishlists();
            }
            
        }, []);

    useEffect(()=>{
        if(filterParams !== '' && filterParams !== null){
            navigate(`${urlParams}`, { replace: true });
            const fetchProds = async() =>{
                const response = await getProducts(filterParams)
                setProdData(response)
            }
        fetchProds()
        }
    }, [filterParams, ])

    useEffect(()=>{
        setUrlParams(location.search)
        const params = new URLSearchParams(location.search);
        const url_search = params.get('search');
        const url_category = params.get('category');

        const hasCategory = url_category && url_category.trim() !== '';
        const hasSearch = url_search && url_search.trim() !== '';

        
        if (hasSearch){
            setQueryTerm(url_search)
        } else if(hasCategory && categories.length !== 0) {
            const category = categories.find(cat => cat.id === Number(url_category))
            setQueryTerm(category.name)
        }
    }, [location.search,categories])

    const handleAddButton = async(id) => {
        const formData = new FormData();
        formData.append('product', id)
        formData.append('quantity', 1)

        if(user === null){
            alert("You need to login to do that.")
            return
        }
        try {
            const response = await addToCart(formData);
            if(response.status === 201){
                console.log("Item added to the cart.")
            }
            } catch (error) {
                if(error.status === 500){
                    alert("Can't add duplicates.")
                };
            }       
        };
    
    const heartButton = (id) =>{
        if(user === null){
            alert("You need to login to do that.")
            return
        }
        setPopupOpen(true)
        setItemToAdd(id)
    }

    const applyOrdering = () => {
        if (filterParams) {
            // Remove any existing &ordering=... from the string
            let updated = filterParams.replace(/&ordering=[^&]*/g, '');

            // Add new ordering if it's not empty
            if (ordering !== '') {
            updated += `&ordering=${ordering}`;
            }

            setFilterParams(updated);
        }
    };

    return(
        <div className="flex flex-col relative h-full min-h-screen w-full bg-gray-200">
            <div className={`transition-all ease-in-out duration-200 fixed inset-0 bg-black/70  px-4 ${loading? 'opacity-100 z-10': 'opacity-0 z-[-10]'}`}>
                <div className="flex h-full w-full justify-center items-center gap-4 ">
                    <div className="aspect-square  w-[50px] animate-bouncy bg-primary"></div>
                    <div className="aspect-square  w-[50px] animate-[bouncy_1s_ease-in-out_infinite_150ms] bg-primary delay-100"></div>
                    <div className="aspect-square  w-[50px] animate-[bouncy_1s_ease-in-out_infinite_250ms] bg-primary"></div>
                    <div className="aspect-square  w-[50px] animate-[bouncy_1s_ease-in-out_infinite_350ms] bg-primary"></div>
                    <div className="aspect-square  w-[50px] animate-[bouncy_1s_ease-in-out_infinite_450ms] bg-primary"></div>
                </div>
            </div>
            <SimplePopup product_id={itemToAdd} wishlist={wishlist} isOpen={popupOpen} onClose={() => {setPopupOpen(false)
                                                                                                setItemToAdd(null)}
            } />

            <div className={`bg-zinc-800 sticky z-30 transition-all ease-in-out top-16  ${props.hide===true?'md:top-0 duration-200':'md:top-16 delay-50 duration-300'}`}>
                <div>
                    <div className="flex h-fit items-center justify-between gap-4 px-2 sm:px-[3rem] py-[1rem] shadow-md">
                        <p className="text-gray-100">Results for “{queryTerm}” — {prodData!==undefined?prodData.length:0} products found</p>
                        <div className="relative">
                            <div
                            onClick={() => setSortPopUp(prev => !prev)}
                            className="bg-primary py-2 px-6 rounded-sm font-semibold relative text-text shrink-0 hover:cursor-pointer">Sort results
                            </div>
                            <div className={`grid transition-all ease-in-out duration-200 absolute mt-2 right-0 z-35 shadow-md rounded-sm bg-white ${sortPopUp?'grid-rows-[1fr] py-2':'grid-rows-[0fr]'}`}>
                                <div className="overflow-hidden w-[220px] px-4 flex flex-col">
                                    <p className="bg-gray-200 hover:bg-gray-300 hover:cursor-pointer py-1 px-2 rounded-tl-sm rounded-tr-sm" onClick={() => setOrdering('price')}>Price — Low to High</p>
                                    <p className="bg-gray-200 hover:bg-gray-300 hover:cursor-pointer py-1 px-2" onClick={() => setOrdering('-price')}>Price — High to Low</p>
                                    <p className="bg-gray-200 hover:bg-gray-300 hover:cursor-pointer py-1 px-2" onClick={() => setOrdering('rating')}>Rating — Low to High</p>
                                    <p className="bg-gray-200 hover:bg-gray-300 hover:cursor-pointer py-1 px-2" onClick={() => setOrdering('-rating')}>Rating — High to Low</p>
                                    <p className="bg-gray-200 hover:bg-gray-300 hover:cursor-pointer py-1 px-2" onClick={() => setOrdering('reviews')}>Review — Low to High</p>
                                    <p className="bg-gray-200 hover:bg-gray-300 hover:cursor-pointer py-1 px-2 rounded-bl-sm rounded-br-sm" onClick={() => setOrdering('-reviews')}>Review — High to Low</p>
                                    <button
                                        onClick={() => applyOrdering()}
                                        className="bg-primary py-1 mt-2 rounded-sm shadow-md hover:cursor-pointer">Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

           
            <div className="bg-white-70 flex flex-1 mt-16">
                {/* sidebar */}
                <SideBar hide={props.hide} 
                        urlParams={urlParams} 
                        setUrlParams={setUrlParams}
                        setFilterParams={setFilterParams}
                        search={props.search}/>
                
                
                {/* results */}
                <div className="relative flex-1 overflow-y-auto custom-scrollbar min-h-screen sm:px-[3rem] py-[1rem] z-25">
                    <div className="grid auto-rows-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10 px-4">
                        {prodData !== undefined && prodData.map((prod) => {return(
                            <div key={prod.id} className="relative shadow-lg bg-zinc-800 rounded-md flex flex-col w-full h-full flex-1">
                                    <button id={prod.id} onClick={(e) => heartButton(e.currentTarget.id)} 
                                                        className="absolute z-10 right-0 bg-white m-2 p-1.5 flex items-center justify-end rounded-4xl">
                                        <svg className="fill-zinc-400 hover:fill-red-500 z-5" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 16"><path d="M8.695 16.682C4.06 12.382 1 9.536 1 6.065 1 3.219 3.178 1 5.95 1c1.566 0 3.069.746 4.05 1.915C10.981 1.745 12.484 1 14.05 1 16.822 1 19 3.22 19 6.065c0 3.471-3.06 6.316-7.695 10.617L10 17.897l-1.305-1.215z" opacity=".9"></path></svg>
                                    </button>
                                    
                                    <div className="w-full aspect-square overflow-hidden self-start flex items-center justify-center rounded-t-md shrink-0">
                                        <img className="object-cover object-center w-full shrink-0" src={prod.product_image} alt="" />
                                    </div>
                                <div className="pt-5 p-4 justify-between flex flex-col flex-1 text-white">
                                    <div>
                                        <h2 className="font-bold text-3xl pb-2">
                                            <a onClick={() => handleCardClick(prod.id, prod.title)} href="">
                                                <span className="bg-hover:cursor-pointer absolute inset-0"></span>
                                            </a>
                                            {prod.title}
                                        </h2>
                                        <div className="text-[0.8rem] pb-2 flex items-center">rating: 
                                            <div className="flex gap-4 pl-2">
                                                <StarRating rating={prod.avg_rating}/> 
                                                <p className="pt-1">{prod.avg_rating}/5</p>
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap w-full h-fit justify-between justify-self-end items-center">
                                        <h2 className="relative top-1 font-bold text-4xl  min-w-[120px] mb-2">₹ {prod.price}</h2>
                                        <button onClick={()=>handleAddButton(prod.id)} className=" hover:scale-105 hover:font-bold transition-all ease-in-out duration-300 z-5 px-4 py-2 bg-primary rounded-md items-center font-[600] text-black max-h-[40px]">
                                            Add to Cart
                                        </button>
                                    </div>
                                    
                                </div>
                            </div>
                        )})}
                    </div>
                    
                </div>
            </div>

            <section className="w-full h-fit bg-gray-100 ">
                <div className="h-[340px] bg-black/80 flex items-center justify-center">
                    <p className="text-xl font-semibold">Footer</p>
                </div>
            </section> 
        </div>
    )
}

export default SearchResult