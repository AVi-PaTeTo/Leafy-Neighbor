import Navbar from "../components/NavBar/Navbar"
import ProductDescription from "../components/ProductDetails/ProductDescription"
import { useState, useEffect, use } from "react"
import { getProductById, getProductReviews, getWishlist } from "../api/ApiFunctions"
import { useParams, useLocation } from "react-router-dom"
import ImageSection from "../components/ProductDetails/ImageSection"
import Review from "./Review"
import StarRating from "../components/Reviews/StarRating"
import SimplePopup from "../components/Wishlist/WishlistPopup"
import { useUser } from "../context/UserContext"

const ProductDetail = () => {
    const {user} = useUser()
    const { prodName } = useParams();
    const location = useLocation();
    const id = location.state?.id;
    const [reviewPopUp, setReviewPopup] = useState(false)
    const [wishlist, setWishlist] = useState()
    const [wishlistPopUpOpen, setWishlistPopUpOpen] = useState(false)
    const [quant,setQuant] = useState(1)
    const [hide,setHide] = useState(false)
    const [images, setImages] = useState([])
    const [reviewsList, setReviewsList] = useState()
    const [prodData, setProdData] = useState({
        title: '',
        price: 0,
        description: {
            care_instructions: '',
            detailed_description: '',
            features: [],
            short_description: ''
        }
    })


    useEffect(()=>{
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
                        }
        }
        if(user != null){
            refreshWishlists()
        }
    },[])

    useEffect(() => {
        if (reviewPopUp) {
            document.body.classList.add('noscroll');
        } else {
            document.body.classList.remove('noscroll');
        }
        // Optional: cleanup on unmount
        return () => document.body.classList.remove('noscroll');
        }, [reviewPopUp]);


    const increaseQuant = () => {
        if(quant<15){
            setQuant(prev=>prev+1)
        }
    }

    const decreaseQuant=()=>{
        if(quant>1){
            setQuant(prev=>prev-1)
        }
    }

    const addToCartButton = async() => {

            const formData = new FormData();
            formData.append('product', id)
            formData.append('quantity', quant)
    
            
            try {
                if(user == null){
                    alert("You need to login first.")
                    return
                }
                const response = await addToCart(formData); 
                } catch (error) {
                    console.error(error);
                }       
            };

    function toTitleCase(str) {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        }

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const fetchProd = async() =>{
            const response = await getProductById(id)
            setImages(response.images)
            setProdData(response)
        }
        
        const fetchReviews = async() => {
            const response = await getProductReviews(id)
            setReviewsList(response.data)
        }
        const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
            setHide(true);
        } else {
            setHide(false);
        }

        lastScrollY = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll);

        // Cleanup on unmount
        fetchReviews()
        fetchProd()
        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
        
    }, []);

    return(
        <div className="relative w-full min-h-screen">

            <div className="w-full pt-16 bg-gray-200 min-h-screen lg:px-[3rem]">

                { reviewPopUp && <div
                    onClick={(e) => {if (e.target === e.currentTarget) {setReviewPopup(false);}}} 
                    className="fixed flex justify-center items-center px-2 w-full h-screen bg-black/80 z-50 top-0 left-0">
                    <Review product={id} cancel={() => setReviewPopup(false)}/>
                </div>}

                {/* add to wishlist popup */}
                <SimplePopup product_id={id} wishlist={wishlist} isOpen={wishlistPopUpOpen} onClose={() => setWishlistPopUpOpen(false)}/>

                <div className="grid grid-cols-10  w-full h-fit">
                    {/* product images */}
                    <div className=" lg:py-12 md:px-25 lg:px-10 col-start-1 col-end-11  lg:col-start-1 lg:col-end-6 row-start-1 row-end-3  gap-4 min-w-0">
  
                        <div className={`h-fit w-full flex gap-2 sticky transition-all ease-in-out duration-300 ${hide===true?'top-4':'top-[5rem]'} `}>
                            <ImageSection images={images}/>
                        </div>
                        
                    </div>
                    <div  className="col-start-1 lg:col-start-6 col-end-11 pt-[3rem] px-6 lg:px-0 bg-gray-200">
                        {/* Product Description */}
                        <div>
                            <h2 className="font-bold text-3xl">{toTitleCase(prodData.title)}</h2>
                            <div className="flex justify-between"> 
                                <div className="flex gap-4">
                                    <StarRating rating={prodData.avg_rating} size={24}/> 
                                    <p className="pt-1">{prodData.avg_rating}/5</p>
                                </div> 
                                <div className="pt-0.5">
                                    ({prodData.reviews} {prodData.reviews > 1? 'Reviews':'Review'})
                                </div>
                            </div>
                            <hr className="text-black/30 pb-4" />
                            <h2 className="font-bold text-4xl">₹ {prodData.price}</h2>
                            <div className="flex flex-col max-w-[350px] h-fit py-6 gap-2">
                                <div className="flex gap-2">
                                    <p>Quantity: </p>
                                    <div className="outline-1 flex w-fit rounded-sm">
                                        <button onClick={decreaseQuant}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-440v-80h560v80H200Z"/></svg>
                                        </button>
                                        <p className="w-6 h-6 flex justify-center outline-1">
                                            {quant}
                                        </p>
                                        <button onClick={increaseQuant}>
                                            <svg className="" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                                        </button>
                                    </div>
                                </div>
                                <button onClick={() => addToCartButton()} className="py-4 bg bg-primary rounded-lg font-bold text-xl  hover:cursor-pointer">Add to Cart</button>
                                <button 
                                        onClick={() => {
                                            if(user == null){
                                                alert("You need to login first.")
                                                return
                                            }
                                            setWishlistPopUpOpen(true)}} 
                                        className="py-4 outline-1 outline-black/40 rounded-lg font-bold text-xl hover:cursor-pointer">Add to Wishlist</button>
                            </div>
                            <h2 className="font-bold text-3xl">Product Details</h2>
                            <hr className="text-black/30 pb-4" />
                            <div className=" w-full  min-h-screen md:px-8 pb-12">
                                <ProductDescription product={prodData.description}/>
                            </div>
                        </div>

                        {/* Review Section */}
                        <div className="col-start-6 col-end-11 flex flex-col">
                            <div className={`h-fit w-full flex justify-between gap-2 bg-gray-200 py-4 sticky transition-all ease-in-out duration-300 top-[4rem] ${hide===true?'md:top-0':'md:top-[4rem]'} `}>
                                <h2 className="font-bold text-3xl">Reviews</h2>
                                <button onClick={() => setReviewPopup(true)} className="hover:cursor-pointer px-2 font-semibold bg-primary rounded-sm">
                                    Add Review
                                </button>
                            </div>
                            <div className="col-start-6 col-end-11 max-h-[calc(screen-4rem)] overflow-clip ">
                                <div className="h-[95vh] w-full pt-4 pr-2 overflow-hidden overflow-y-scroll custom-scrollbar">
                                    {reviewsList !== undefined && reviewsList.map(review => (
                                        <div key={review.id} className="mb-4 p-4 border rounded-lg shadow-sm bg-white">
                                        <div className="flex justify-between w-full font-semibold text-gray-800">{review.user} <StarRating rating={review.rating}/> </div>
                                        <div className="text-sm text-gray-600 mt-1">
                                            {review.review}
                                        </div>
                                        <div className="text-xs text-gray-400 mt-2 text-end">{review.date_created.split("T")[0]}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        

                    </div>
                </div>
                
            </div>
            
        </div>
    )
}

export default ProductDetail