
import bg from "../assets/b5.png"
import { getWishlist, createWishlist, deleteWishlist, deleteFromWishlist, addToCart } from "../api/ApiFunctions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Wishlist = (props) => {
    const [wishlist, setWishlist] = useState([])
    const [createPopup, setCreatePopup] = useState(false)
    const [deletePopup, setDeletePopup] = useState(false)
    const [wishlistName, setWishlistName ]= useState('')
    const [toDelete, setToDelete] = useState(null)
    const {user} = useUser()

    const refreshWishlists= async() =>{
            const response = await getWishlist()
            setWishlist(response.data)
        }
    
    const navigate = useNavigate()
    
    useEffect(()=>{
        if (user != null){

            refreshWishlists()
        }
    },[])

    useEffect(() => {
    if (createPopup || deletePopup) {
        document.body.classList.add('noscroll');
    } else {
        document.body.classList.remove('noscroll');
    }
    // Optional: cleanup on unmount
    return () => document.body.classList.remove('noscroll');
    }, [createPopup, deletePopup]);
    
    const handleWishlistName = (e) => {
        setWishlistName(e.target.value)
    }

    const delWishlist = async(id) => {
        const response = await deleteWishlist(id)
        return response.status
    }

    const delWishlistItem = async(id) => {
        const response = await deleteFromWishlist(id)
        return response.status
    }

    const handleWishlistDeleteButton = async(w_id) =>{
        const wishlistObj = wishlist.find(wl => wl.id === w_id);
        if (!wishlistObj) return;
        
        try {
            const status = await delWishlist(wishlistObj.id);
            if (status >= 200 && status < 300) { // HTTP success codes
            setWishlist(prev =>
                prev.filter(list => list.id  !== w_id)
                )
            } else {
            console.error('Delete failed with status', status);
            }
        } catch (error) {
            console.error('Delete API error', error);
        } finally {
            setDeletePopup(false)
        }
        };
    


    // delete an item from a wishlist
    const handleWishlistItemDeleteButton = async (w_id, i_id) => {
        const wishlistObj = wishlist.find(wl => wl.id === w_id);
        if (!wishlistObj) return;

        const itemToDelete = wishlistObj.items.find(item => item.product === i_id);
        if (!itemToDelete) return;

        try {
            const status = await delWishlistItem(itemToDelete.id);
            if (status >= 200 && status < 300) { // HTTP success codes
            setWishlist(prev =>
                prev.map(wl =>
                wl.id === w_id
                    ? { ...wl, items: wl.items.filter(item => item.product !== i_id) }
                    : wl
                )
            );
            } else {
            console.error('Delete failed with status', status);
            }
        } catch (error) {
            console.error('Delete API error', error);
        }
        };

    const handleAddButton = async(id) => {
            const formData = new FormData();
            formData.append('product', id)
            formData.append('quantity', 1)
    
            
            try {
                const response = await addToCart(formData); 
                console.log(response)
                } catch (error) {
                    console.error(error);
                }       
            };


    const handleCreate = async () => {
        const name = wishlistName
        const formData = new FormData()
        formData.append('name', name)
        
        try {
            const response = await createWishlist(formData)
            } catch (error) {
                console.error(error);
            } finally {
                setCreatePopup(false)
                refreshWishlists()
                setWishlistName('')
            }
    }

    function handleCardClick(id,prodName){
        navigate(`/browse/${prodName}`, { state: { id } });
    }


    return(
        <div className="w-full h-full min-h-screen">
            {createPopup && <div    onClick={(e) => {if (e.target === e.currentTarget) {setCreatePopup(false);}}}
                                    className="absolute  w-full px-2 flex justify-center items-center z-55 inset-0 bg-black/60">
                <div className="fixed bg-gray-100 w-[95%] max-w-[600px] rounded-md flex flex-col mx-2 z-56">
                    <h1 className="text-center font-bold text-3xl pt-2 border-b-1 border-b-gray-300 w-full">Create a wishlist</h1>
                    <div className="py-4 px-8 justify-between flex flex-col">
                        <input className="outline-1 py-2 px-4 w-full outline-gray-400 rounded-md mb-4 font-semibold" type="text" onChange={handleWishlistName} value={wishlistName} name="" id="" placeholder="Wishlist name"/>
                        <button disabled={wishlistName.length === 0} onClick={handleCreate} className="hover:cursor-pointer ml-auto px-4 py-1 outline-1 rounded-sm font-semibold">Create</button>
                    </div>
                </div>
            </div>}

            {deletePopup && <div    onClick={(e) => {if (e.target === e.currentTarget) {setDeletePopup(false);}}}
                                    className="absolute  w-full px-2 flex justify-center items-center z-55 inset-0 bg-black/60">
                <div className="fixed bg-gray-100 w-[95%] max-w-[600px] rounded-md flex flex-col mx-2 z-56">
                    <h1 className="text-center font-bold text-3xl pt-2 border-b-1 border-b-gray-300 w-full">Delete a wishlist</h1>
                    <div className="py-4 px-8 justify-between flex flex-col">
                        {/* <input className="outline-1 py-2 px-4 w-full outline-gray-400 rounded-md mb-4 font-semibold" type="text" onChange={handleWishlistName} value={wishlistName} name="" id="" placeholder="Wishlist name"/> */}
                        <p>You are about to delete:</p>
                        <p>{toDelete.name}</p>
                        <button onClick={() => handleWishlistDeleteButton(toDelete.id)} className="hover:cursor-pointer hover:bg-red-500 transition-colors duration-300 ml-auto px-4 py-1 outline-1 rounded-sm font-semibold">Confirm</button>
                    </div>
                </div>
            </div>}


            <div className="fixed flex h-full w-screen -z-5">
                <img className="h-full w-full object-cover object-right" src={bg} alt="" />
            </div>
            <div className="flex justify-center mt-12 md:mt-16 h-screen min-h-fit max-h-[calc(100vh-5.5rem)] w-full px-2 py-8">
                
                {/* wishlisht display area  OR wrapper*/}
                <div className="max-w-[800px] bg-white/20 shadow-2xl backdrop-blur-[4px] relative w-full min-h-full h-fit rounded-lg ">
                    
                    {/* wishlist create button */}
                    <div className={`sticky flex w-full h-fit justify-between bg-zinc-800 rounded-t-lg z-10 transition-all ease-in-out ${props.hide===true?'top-0 duration-200':'top-16 duration-300 delay-50'}`}>
                        <h1 className="p-4 text-4xl font-bold text-gray-100">
                            Your Wishlists
                        </h1>
                        <div className="flex justify-end p-4">
                            <button onClick={() => setCreatePopup(prev => !prev)} className="hover:cursor-pointer flex items-center gap-2 py-1 px-4 text-xl font-bold rounded-md bg-primary shadow-sm">
                                <svg className="fill-text/95 pointer-events-none pb-1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                                <p className="hidden sm:block">Create</p>
                            </button>
                        </div>
                    </div>

                    {/* wishlist Wrapper */}
                    <div className="relative w-full max-h-[calc(100vh-13.5rem)] sm:max-h-[calc(100vh-12.5rem)] overflow-hidden overflow-y-auto  custom-scrollbar">
                        <div className="flex flex-col pb-8">
                            {wishlist !== undefined && wishlist.map(list => {
                                return(
                                <div key={list.id}>
                                <div className={`sticky w-full h-fit bg-zinc-800 z-5 px-4 py-4 top-0 flex justify-between`}>
                                    <h2 className="font-semibold text-2xl text-gray-100 max-w-[80%] truncate">{list.name}</h2>
                                    <button onClick={() => {setDeletePopup(true) 
                                                            setToDelete(list)}} 
                                            className="p-1 bg-red-500 rounded-sm">
                                        <svg className="fill-black pointer-events-none" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg>
                                    </button>
                                </div>
                                <div className="flex flex-col gap-6 pt-4 pb-14 sm:py-3 md:px-10 overflow-hidden scroll-auto">
                                        {list.items !== undefined && list.items.length > 0 ? (
                                            list.items.map(item => {
                                                return(
                                                    <div key={item.id} className="relative flex h-50 bg-zinc-200/70 rounded-md shadow-md">
                                                    <button className="hidden absolute rounded-sm p-1 right-2 top-2 bg-red-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg>
                                                    </button>
                                                    <img className="h-full object-contain self-start rounded-l-md" src={item.product_image} alt="" />
                                                    <div className="flex flex-col w-full justify-between">
                                                        <div className="px-2 relative sm:px-4 md:px-8 pt-4 w-full">
                                                            <h2 className="font-semibold text-2xl md:text-3xl">{item.product_title}</h2>
                                                            <div onClick={() => handleCardClick(item.product,item.product_title)} className="absolute inset-0"></div>
                                                        </div>
                                                        <h2 className="px-2 sm:px-4 md:px-8 font-semibold text-2xl md:text-3xl">₹ {item.product_price}</h2>
                                                        <div className="flex flex-col w-fit md:w-full sm:flex-row self-end sm:justify-end gap-2 pb-2 px-2 sm:gap-4 sm:pb-4 sm:px-4">
                                                            <button onClick={()=> handleWishlistItemDeleteButton(list.id, item.product)} className="bg-zinc-400 px-4 py-0.5 rounded-md  max-w-[180px] hover:cursor-pointer transition-colors duration-300 hover:text-gray-100 focus:text-gray-100 hover:bg-red-500 focus:bg-red-500" >Remove</button>
                                                            <button onClick={() => handleAddButton(item.product)} className="bg-primary px-4 py-1 rounded-md  max-w-[180px] hover:cursor-pointer"  >Add to cart</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        )
                                            ) : (
                                            <p>No items in this wishlist.</p>
                                        )}
                                </div>
                            </div>
                            )})}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wishlist


