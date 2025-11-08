import React, { useEffect, useState } from 'react';
import Wishlist from '../../pages/Wishlist';
import { addToWishlist, getWishlist } from '../../api/ApiFunctions';
const SimplePopup = (props) => {
  const [wishlist, setWishlist] = useState([])
  const [selected, setSelected] = useState('');

  if (!props.isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  };

  const handleAdd = async() =>{
    const formData = new FormData()
    formData.append('wishlist', selected)
    formData.append('product', props.product_id)
    try{

        const response = await addToWishlist(formData)
        if (response.status === 201) {
                    props.updateToast('Item added to your wishlist!');
                }
            } catch (error) {
                if (error.status === 400) {
                    props.updateToast('Item already in your wishlisht.');
                } else {
                    props.updateToast('Something went wrong.');
                }
            } finally {
        setSelected('')
        props.onClose()
    } 
  }


  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50"
    >
        {/* <div className='w-full flex justify-center items-center px-2'> */}
            <div className="bg-white rounded w-full max-w-[600px]">
                <h2 className="font-bold text-2xl py-2 mb-4 text-center border-b-1 border-b-black/90">Pick a wishlist</h2>
                <div className='px-6 pb-6'>
                    <select
                        value={selected}
                        onChange={(e) => setSelected(e.target.value)}
                        className="w-full border p-2 rounded"
                        >
                        <option value="">-- Select --</option>
                        {props.wishlist.map(wish => (
                            <option key={wish.id} value={wish.id}>{wish.name}</option>
                        ))}
                    </select>
                    <div className="flex justify-end">
                        <button
                        className="mt-4 px-4 py-2 text-text font-bold bg-primary rounded"
                        disabled={!selected}
                        onClick={() => handleAdd()}
                        >
                        Confirm
                        </button>
                    </div>
                </div>
            </div>
        {/* </div> */}
    </div>
  );
}

export default SimplePopup