// import { useState,useEffect } from 'react'
// import './App.css'
// import Navbar from './components/NavBar/Navbar'
// import LandingPage from './pages/LandingPage'
// import SearchResult from './pages/SearchResult'
// import ProductDetail from './pages/ProductDetail'
// import Wishlist from './pages/Wishlist'
// import {Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
// import Cart from './pages/Cart'
// import Order from './pages/Orders'
// import Login from './pages/Login'
// import Create from './pages/ProductCreate'
// import { UserProvider } from './context/UserContext'
// import Review from './pages/Review'
// import Summary from './pages/OrderSummary'

// function App() {
//   const [hide,setHide] = useState(false)
//   const [searchText, setSearchText] = useState('')
//   const [searchActive,setSearchActive] = useState(false)
//   const [searchParameter, setSearchParameter] = useState('')
//   const location = useLocation();

//   const navigate = useNavigate();

//   // List of paths where navbar should NOT show
//   const noNavbarPaths = ['/user'];

//   const hideNavbar = noNavbarPaths.includes(location.pathname);


//   useEffect(() => {
//     let lastScrollY = window.scrollY;
//     let ticking = false;

//     const handleScroll = () => {
//         if (!ticking) {
//           window.requestAnimationFrame(() => {
//             const currentScrollY = window.scrollY;
//             setHide(currentScrollY > lastScrollY);
//             lastScrollY = currentScrollY;
//             ticking = false;
//           });

//           ticking = true;
//         }
//       };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//     const handleSearchIcon = () => {
//           setSearchActive(prev => !prev)
//           setSearchText('')
//           setSearchParameter('')
//     }

//     const applySearchFilter = (nav) => {
//         const searchParam = new URLSearchParams()
//         if (searchText !== ''){
//             searchParam.append('search', searchText)
        
//         setSearchParameter(searchParam.toString())
//         if(nav ){
//           if(!/^\/about/.test(location.pathname)){
//           navigate('about')
//         }}}      
//     }

//   return (
//     <UserProvider>
//     <div className='min-h-screen flex flex-col text-text font-nunito justify-center '>
//       {!hideNavbar && (
//         <div className={`fixed left-1/2 -translate-x-1/2 z-50 w-full transition-all ease-in-out duration-300 top-0  ${hide === true ? 'md:-top-20' : 'md:top-0'}`}>
//           <div className="rounded-b-xl flex items-center justify-between">
//             <Navbar searchText={searchText} 
//                     searchActive={searchActive} 
//                     setSearchText={setSearchText} 
//                     handleSearchIcon={handleSearchIcon} 
//                     applySearchFilter={applySearchFilter}/>
//           </div>
//         </div>
//       )}
      

//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         {/* <Route path="/categories" element={<Order hide={hide}/>} /> */}
//         <Route path="/categories" element={<Create/>} />
//         <Route path="/about/" element={<SearchResult hide={hide} search={searchParameter}/>} />
//         <Route path="/contact/:id" element={<ProductDetail />} />
//         <Route path="/cart" element={<Cart hide={hide}/>} />
//         <Route path="/wishlist" element={<Wishlist hide={hide}/>} />
//         <Route path="/user" element={<Login />} />
//         <Route path="/orders" element={<Order hide={hide}/>} />
//         <Route path="/review" element={<Review />} />
//         <Route path="/summary/:id" element={<Summary />} />
//       </Routes>
//     </div>
//     </UserProvider>
//   )
// }

// export default App

import { useState, useEffect, lazy, Suspense } from 'react'
import './App.css'
import Navbar from './components/NavBar/Navbar'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext'
import { useUser } from './context/UserContext';

// Lazy loaded components
const LandingPage = lazy(() => import('./pages/LandingPage'));
const SearchResult = lazy(() => import('./pages/SearchResult'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Cart = lazy(() => import('./pages/Cart'));
const Order = lazy(() => import('./pages/Orders'));
const Login = lazy(() => import('./pages/Login'));
const Create = lazy(() => import('./pages/ProductCreate'));
const Review = lazy(() => import('./pages/Review'));
const Summary = lazy(() => import('./pages/OrderSummary'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Settings = lazy(() => import('./pages/Settings'));
const Vendor = lazy(() => import('./pages/VendorProfile'))
const Modify = lazy(() => import('./pages/ModifyProduct'))
const Contact = lazy(() => import('./pages/Contact'))

function App() {
  const [hide, setHide] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [searchActive, setSearchActive] = useState(false)
  const [searchParameter, setSearchParameter] = useState('')
  const location = useLocation();
  const navigate = useNavigate();

  const noNavbarPaths = ['/user'];
  const hideNavbar = noNavbarPaths.includes(location.pathname);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setHide(currentScrollY > lastScrollY);
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchIcon = () => {
    setSearchActive(prev => !prev)
    setSearchText('')
    setSearchParameter('')
  }

  const applySearchFilter = (nav) => {
    const searchParam = new URLSearchParams()
    if (searchText !== '') {
      searchParam.append('search', searchText)
    }
    setSearchParameter(searchParam.toString())
    if(nav){
      if(!/^\/about/.test(location.pathname)){
        navigate('about')
      }
    }
  }

  return (
    <UserProvider>
      <div className='min-h-screen flex flex-col text-text font-nunito justify-center '>
        {!hideNavbar && (
          <div className={`fixed left-1/2 -translate-x-1/2 z-50 w-full transition-all ease-in-out duration-300 top-0  ${hide === true ? 'md:-top-20' : 'md:top-0'}`}>
            <div className="rounded-b-xl flex items-center justify-between">
              <Navbar 
                searchText={searchText} 
                searchActive={searchActive} 
                setSearchText={setSearchText} 
                handleSearchIcon={handleSearchIcon} 
                applySearchFilter={applySearchFilter} 
              />
            </div>
          </div>
        )}

        <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* <Route path="/categories" element={<Order hide={hide}/>} /> */}
            <Route path="/create" element={<Create />} />
            <Route path="/browse/" element={<SearchResult hide={hide} search={searchParameter} />} />
            <Route path="/browse/:prodName" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart hide={hide} />} />
            <Route path="/wishlist" element={<Wishlist hide={hide} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/orders" element={<Order hide={hide} />} />
            <Route path="/review" element={<Review />} />
            <Route path="/summary/:id" element={<Summary />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/vendor/:vendorId" element={<Vendor />} />
            <Route path="/edit/:prodId" element={<Modify />} />
          </Routes>
        </Suspense>
      </div>
    </UserProvider>
  );
}

export default App;
