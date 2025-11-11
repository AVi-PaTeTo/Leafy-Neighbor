import API from "./axios";

//Login
export const login = async(json) => {
    const response = await API.post('/token/', json)
    return response
}

// Product

export const getProducts = async(filterData) => {
    const response = await API.get(`/products/${filterData}`);
    return response.data
}

export const deleteProduct = async(id) => {
    const response = await API.delete(`/products/${id}/`);
    return response
}

export const createProduct = async (formData) => {
  const response = await API.post('/products/', formData);
  return response;
};

export const patchProduct = async (prodId,formData) => {
  const response = await API.put(`/products/${prodId}/`, formData);
  return response.data;
};

export const getProductById = async(prodId) => {
    const response = await API.get(`/products/${prodId}/`)
    return response.data
}

export const updateProduct = async(prodId, prodData) => {
    const response = await API.put(`/products/${prodId}`, prodData)
    return response.data
}


// Cart

export const getUserCart = async() => {
    const response = await API.get('/carts/')
    return response.data
}

export const addToCart = async(data) => {
    const response = await API.post(`/cart-items/`, data)
    return response
}

export const updateQuant = async(id,data) => {
    const response = await API.put(`/cart-items/${id}/`, data)
    return response.data
}

export const removeItem = async(id) => {
    const response = await API.delete(`/cart-items/${id}/`)
    return response.data
}


// Wishlist

export const getWishlist = async() => {
    const response = await API.get('/wishlists/')
    return response
}

export const createWishlist = async(name) => {
    const response = await API.post('/wishlists/', name)
    return response.data
}

export const deleteWishlist = async(id) => {
    const response = await API.delete(`/wishlists/${id}/`)
    return response
}

export const addToWishlist = async(data) => {
    const response = await API.post('/wishlist-items/', data)
    return response
}

export const deleteFromWishlist = async(id) => {
    const response = await API.delete(`/wishlist-items/${id}/`)
    return response
}


// Category & Tag

export const getCategories = async() => {
    const response = await API.get('/categories/')
    return response
}

export const getTags = async() => {
    const response = await API.get('/tag-groups/')
    return response
}

//Review

export const getProductReviews = async(prodId) => {
    const response = await API.get(`/reviews/?product_id=${prodId}`)
    return response
}

export const postReview = async(data) => {
    const response = await API.post(`/reviews/`, data)
    return response
}


//Orders

export const getOrders = async() => {
    const response = await API.get('/orders/')
    return response
}

export const getOrderById = async(id) => {
    const response = await API.get(`/orders/${id}`)
    return response
}

export const createOrder = async() => {
    const response = await API.post('/orders/')
    return response
}

export const razorDetails = async(orderId) => {
    const response = await API.post(`/payments/initiate/`, {order_id: orderId})
    return response.data
}

//User Info
export const userSignUp = async(formData) => {
    const response = await API.post(`users/create_user/`, formData)
    return response
}

export const getUser = async(id) => {
    const response = await API.get(`/users/${id}/`)
    return response
}

export const saveUserInfo = async(id, formData)=>{
    const response = await API.put(`/users/${id}/`, formData)
    return response
} 

export const changePassword = async(id, formData) => {
    const response = await API.post(`/users/${id}/change_password/`, formData)
    return response
}

export const becomeVendor = async(id, formData) => {
    const response = await API.post(`/users/${id}/make_vendor/`, formData)
    return response
}

export const getVendorProfile = async(id) => {
    const response = await API.get(`/vendors/${id}/`)
    return response
}

export const patchVendorProfile = async(id,formData) => {
    const response = await API.patch(`/vendors/${id}/`, formData)
    return response
}

export const postAddress = async(formData) => {
    const response = await API.post(`/addresses/`, formData)
    return response
}


export const getUserAddress = async() => {
    const response = await API.get(`/addresses/`)
    return response
}

export const patchUserAddress = async(id, formData) => {
    const response = await API.put(`/addresses/${id}/`, formData)
    return response
}


// export const getOrderById = async(id) => {
//     const response = await API.get(`/orders/${id}`)
//     return response
// }
