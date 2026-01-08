import { useState, useEffect, lazy, Suspense } from 'react'
import './App.css'
import Navbar from './components/NavBar/Navbar'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext'


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
const About = lazy(() => import('./pages/About'))

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
      if(!/^\/browse/.test(location.pathname)){
        navigate('browse')
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
            <Route path="/about" element={<About />} />
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
            <Route path="/vendor/:businessName" element={<Vendor />} />
            <Route path="/edit/:prodId" element={<Modify />} />
          </Routes>
        </Suspense>
      </div>
    </UserProvider>
  );
}

export default App;
