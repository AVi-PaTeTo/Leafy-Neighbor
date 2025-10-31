
import bg from "../assets/b5.png"
import { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserCart, updateQuant, removeItem, createOrder, razorDetails } from "../api/ApiFunctions";
import { useUser } from "../context/UserContext";
import API from "../api/axios";

const BG_IMG = "https://videos.openai.com/vg-assets/assets%2Ftask_01k13mvb1kf9187sd0y08kqcq5%2F1753542958_img_1.webp?st=2025-07-26T13%3A50%3A10Z&se=2025-08-01T14%3A50%3A10Z&sks=b&skt=2025-07-26T13%3A50%3A10Z&ske=2025-08-01T14%3A50%3A10Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=JRMjxUEoDdMm6SfRrwQS2knf7tUTUlRIOLU5%2BfAzITU%3D&az=oaivgprodscus"

const Cart = (props) => { 
    const [loadingItems, setLoadingItems] = useState([])
    const [cartItems, setCartItems] = useState()
    const [cartTotal, setCartTotal] = useState(0)
    const [popupVisible, setPopupVisible] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')
    const [itemToRemove, setItemToRemove] = useState(null)
    const [loading, setLoading] =useState(false)
    const {user} = useUser()
    const navigate = useNavigate()



    useEffect(()=>{
        const fetchCartDetails = async() =>{
            const response = await getUserCart()
            if(response[0] != undefined){
                setCartItems(response[0].items)
                setCartTotal(response[0].total)
            } 
        }
        if (user !=null){

            fetchCartDetails()
        }
    },[])
    
    const increaseQuant = async(id) => {
        
        const item = cartItems.find(i => i.id === id);
        if (!item) return;

        // console.log(id)
        // console.log(item)
        const newQuantity = item.quantity + 1;
        if (newQuantity >= 5) return;

        const formData = new FormData();
        formData.append('product', item.product);
        formData.append('quantity', newQuantity);

         try {  

                setLoadingItems(prev => [...prev, id]);  // mark item as loading
                await updateQuant(id, formData);
                setCartItems(prev =>
                prev.map(item => (item.id === id ? { ...item, quantity: newQuantity } : item))
                );
                setCartTotal(prev => prev + item.price);
            } catch (error) {
                console.error('Failed to update quantity', error);
            } finally {
                setLoadingItems(prev => prev.filter(itemId => itemId !== id)); // remove loading flag
            }
            };

    const decreaseQuant = async (id) => {
        const item = cartItems.find(i => i.id === id);
        if (!item) return;

        const newQuantity = item.quantity - 1;
        if (newQuantity <= 0) return;

        const formData = new FormData();
        formData.append('product', item.product);
        formData.append('quantity', newQuantity);

        try {
            setLoadingItems(prev => [...prev, id]);  // mark item as loading
            setLoading(true)
            await updateQuant(id, formData);
            setCartItems(prev =>
            prev.map(item => (item.id === id ? { ...item, quantity: newQuantity } : item))
            );
            setCartTotal(prev => prev - item.price);
            } catch (error) {
                console.error('Failed to update quantity', error);
            } finally {
                setLoadingItems(prev => prev.filter(itemId => itemId !== id)); // remove loading flag
                setLoading(false)
            }
        };
        
    
    //enables the 'remove' popup
    const handleRemoveButton =(id, name) =>{
        setPopupMessage(name)
        setPopupVisible(true)
        setItemToRemove(id)
    }


    //linked to the button in 'remove' popup 
    const handleRemoveItem = async(id) => {
        try {
            setLoading(true)
            await removeItem(id)
            fetchCartDetails()
            } catch (error) {
                console.error('Failed to update quantity', error);
            } finally {
                setPopupVisible(false)
                setLoading(false)
            }
    }


        const handlePayment = async () => {
            const order = await createOrder();
            const data = await razorDetails(order.data.id)


            try {
            const { razorpay_key, razorpay_order_id, amount, currency } = data;

            // 2. Configure Razorpay
            const options = {
                key: razorpay_key,
                amount: amount,
                currency: currency,
                name: "Leafy Neighbour",
                description: "Purchase Order",
                order_id: razorpay_order_id,
                handler: async function (response) {
                // 3. Send details to backend for verification
                await API.post("/payments/verify/", {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                });
                alert("Payment successful!");
                },
                theme: { color: "#3399cc" },
            };

            const razor = new window.Razorpay(options);
            razor.open();

            } catch (err) {
            console.error("Payment error", err);
            }
    }

    function handleCardClick(id,prodName){
        navigate(`/browse/${prodName}`, { state: { id } });
    }
    // console.log(cartItems)
    return(
        <div className="relative w-full h-screen min-h-screen ">
            <div className={`transition-all ease-in-out duration-200 fixed inset-0 bg-black/70  px-4 ${loading? 'opacity-100 z-10': 'opacity-0 z-[-10]'}`}>
                <div className="flex h-full w-full justify-center items-center gap-4 ">
                    <div className="aspect-square  w-[50px] animate-bouncy bg-gray-200"></div>
                    <div className="aspect-square  w-[50px] animate-[bouncy_1s_ease-in-out_infinite_150ms] bg-gray-200 delay-100"></div>
                    <div className="aspect-square  w-[50px] animate-[bouncy_1s_ease-in-out_infinite_250ms] bg-gray-200"></div>
                    <div className="aspect-square  w-[50px] animate-[bouncy_1s_ease-in-out_infinite_350ms] bg-gray-200"></div>
                    <div className="aspect-square  w-[50px] animate-[bouncy_1s_ease-in-out_infinite_450ms] bg-gray-200"></div>
                </div>
            </div>
            {popupVisible && <div   onClick={(e) => {if (e.target === e.currentTarget) {setPopupVisible(false);}}}
                                    className="hover:cursor-crosshair absolute flex justify-center items-center z-55 inset-0 bg-black/60">
                <div className="fixed bg-gray-100 rounded-md flex flex-col">
                    <h1 className="text-center font-bold text-3xl pt-2 border-b-1 border-b-gray-300 w-full">Confirm Delete</h1>
                    <h2 className="px-8 py-4 font-semibold">You're about to remove "{popupMessage}" from your cart</h2>
                    <div className="pb-4 px-8 flex justify-between">
                        <button onClick={() => handleRemoveItem(itemToRemove)} className="hover:bg-red-500 hover:font-semibold hover:cursor-pointer transition-all duration-300 px-4 py-1 outline-1 rounded-sm font-semibold">Confirm</button>
                        <button onClick={() => {
                                                setPopupVisible(false)
                                                setItemToRemove(null)
                                                }} className="hover:cursor-pointer px-4 py-1 outline-1 rounded-sm font-semibold">Cancel</button>
                    </div>
                </div>
            </div>}

            <div className="fixed flex h-full w-screen -z-5">
                <img className="h-full w-full object-cover object-right" src={bg} alt="" />
            </div>
            <div className="flex justify-center mt-16 md:mt-16 h-screen min-h-fit max-h-[calc(100vh-5.5rem)] w-full px-2 py-8">
                
                {/* wishlisht display area  OR wrapper*/}
                <div className="max-w-[800px] bg-white/20 shadow-2xl backdrop-blur-[4px] relative w-full min-h-full h-fit rounded-lg ">
                    
                    {/* wishlist create button */}
                    <div className={`sticky w-full h-fit justify-end bg-zinc-800 rounded-t-lg z-10 transition-all ease-in-out top-16  ${props.hide===true?'md:top-0 duration-200':'md:top-16 duration-300 delay-50'}`}>
                        <div className="flex justify-between p-4">
                            <div className="flex gap-2">
                                <h2 className="font-semibold text-3xl pt-1 text-gray-100 tracking-wide">Cart Total: </h2>
                                <h2 className="font-semibold text-3xl pt-1 text-gray-100 tracking-wide">₹ {cartTotal}</h2>
                            </div>
                            <button onClick={() => handlePayment()} className="hidden hover:cursor-pointer sm:flex items-center gap-4 py-1 px-4 text-xl font-bold rounded-md bg-primary shadow-sm">
                                <span className="pt-1 font-semibold">Checkout</span>
                            </button>
                        </div>
                    </div>

                    
                    <div className="w-full max-h-[calc(100vh-12.5rem)] sm:max-h-[calc(100vh-12.5rem)] px-4 md:px-8 overflow-hidden overflow-y-auto custom-scrollbar">
                        <div className="">
                            <div className="flex flex-col gap-6 pb-14 py-3 md:px-10 overflow-hidden scroll-auto">
                                    {cartItems !== undefined && cartItems.map(item => (
                                        <span key={item.id} className="relative flex h-50 bg-zinc-200/70 rounded-md shadow-md">
                                            <button className="hidden absolute rounded-sm p-1 right-2 top-2 bg-red-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg>
                                            </button>
                                            <div className="min-w-[150px] h-full">
                                                <img className="h-[80%] w-full mobile:h-full object-cover self-start rounded-l-md" src={item.product_image} alt="" />
                                                <div className="flex mobile:hidden flex-col w-full sm:flex-col  sm:justify-end  gap-2 px-2 py-1.5 sm:gap-4 sm:pb-4 sm:px-4">
                                                    <button onClick={() => handleRemoveButton(item.id, item.product_name)} className="outline-1  px-4 py-0.5 rounded-md  max-w-[180px] hover:bg-red-500 focus:bg-red-500 transition-all ease-in-out duration-300" >Remove</button>
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-col w-full h-full">
                                                <div className="flex flex-col w-full h-full justify-between">
                                                    <div className="px-2 sm:px-4 md:px-8 pt-4 max-w-full overflow-clip">
                                                        <h2 className="relative font-semibold text-2xl md:text-4xl">{item.product_name}</h2>
                                                        <div onClick={()=>handleCardClick(item.product, item.product_name)} className="absolute inset-0"></div>
                                                    </div>
                                                    <div className="flex w-full flex-wrap">
                                                        <h2 className="pl-2 sm:pl-4 md:pl-8 font-semibold text-2xl md:text-3xl">₹ {item.price}</h2>
                                                        {/* <p className="mt-auto pb-1 pr-2 sm:pr-4 md:pr-8">x quantity: {item.quantity}</p> */}
                                                        <div className="flex gap-2 mt-auto ml-auto pb-1.5 pr-2 sm:pr-4">
                                                            <p className="hidden sm:block">Quantity: </p>
                                                            <div className="outline-1 flex w-fit h-fit rounded-sm">
                                                                <button className="w-[28px] h-[28px] " disabled={loadingItems.includes(item.id)} onClick={() => decreaseQuant(item.id)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-440v-80h560v80H200Z"/></svg>
                                                                </button>
                                                                <p className="w-[32px] h-[28px] flex justify-center items-center pt-0.5">
                                                                    {item.quantity}
                                                                </p>
                                                                <button className="w-[28px] h-[28px]" disabled={loadingItems.includes(item.id)} onClick={() => increaseQuant(item.id)}>
                                                                    <svg className="" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="hidden mobile:flex flex-col w-fit md:w-full sm:flex-row self-end sm:justify-end gap-2 py-2 px-2 sm:gap-4 sm:pb-4 sm:px-4">
                                                    <button onClick={() => handleRemoveButton(item.id, item.product_name)} className="bg-zinc-400  px-4 py-1 rounded-md  max-w-[180px]  hover:text-gray-100 focus:text-gray-100 hover:bg-red-500 focus:bg-red-500 transition-all ease-in-out duration-300" >Remove</button>
                                                </div>
                                            </div>
                                        </span>
                                    ))}
                            </div>
                            <div className="flex sm:hidden fixed left-0 -bottom-2 w-full rounded-b-lg bg-primary p-2 justify-center items-center">
                                <h2 className="font-semibold text-2xl text-text ">Proceed to Checkout</h2>
                            </div> 
                        </div>                
                        
                    </div>

                    
                </div>
            </div>
            
            <section className="w-full h-fit bg-gray-100 z-2">
                <div className="h-[340px] bg-black/80 flex items-center justify-center">
                <p className="text-xl font-semibold">Footer</p>
                </div>
            </section>  
        </div>
    );
};

export default Cart