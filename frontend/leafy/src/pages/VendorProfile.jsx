import { useState, useEffect } from "react"
import { getProducts, getVendorProfile, patchVendorProfile, deleteProduct } from "../api/ApiFunctions"
import { useNavigate, useLocation, useParams, resolvePath, Link } from "react-router-dom"
import StarRating from "../components/Reviews/StarRating"


const VendorProfile = () => {
        const navigate = useNavigate()
        const { vendorId } = useParams();
        // const vendorId = location.state?.vendorId;
        const [pfp, setPfp] = useState('https://i.pinimg.com/736x/d2/c0/08/d2c00886ae6f6cd0c88ee864d1023b59.jpg')
        const [vendorDetails, setVendorDetails] = useState({
                                                            id: '',
                                                            vpfp:'',
                                                            user: '',
                                                            business_name: '',
                                                            location: ''
                                                            })
        const [prodData, setProdData] = useState()
        const [modMenu, setModMenu] = useState(false)
        const [toDelete, setToDelete] = useState(null)
        const [editProfPop, setEditProfPop] = useState(false)
        const [deletePop, setDeletePop] = useState(false)
        const [refresh, setRefresh] = useState(0)                                                  

        useEffect(()=>{
            const fetchProfile = async() =>{
                const response = await getVendorProfile(vendorId)
                setVendorDetails(response.data)
            }
            const fetchProds = async() =>{
                const response = await getProducts(`?vendor=${vendorId}`)
                const prods = response.map(p => ({...p, modMenu: false}))
                setProdData(prods)
            }
        fetchProfile()
        fetchProds()
        }
        , [])

        useEffect(()=>{
            const fetchProds = async() =>{
                    const response = await getProducts(`?vendor=${vendorId}`)
                    const prods = response.map(p => ({...p, modMenu: false}))
                    setProdData(prods)
                }
            fetchProds()
            }
        , [refresh])

        function handleCardClick(id,prodName){
                navigate(`/browse/${prodName}`, { state: { id } });
            }

        function handleModMenu(id){
            setProdData(prev => prev.map(prod => prod.id == id? {...prod, ['modMenu']:!prod.modMenu}:{...prod,['modMenu']:false}))
        }

        function handleChange(e){
            setVendorDetails(prev => ({...prev, [e.target.name]:e.target.value}))
        }

        function initiateDelete(id){
            setDeletePop(true)
            setToDelete(id)
        }

        async function confirmDelete(){
            try{
                const response = await deleteProduct(toDelete)
            } catch (error) {
                console.log(error)
            } finally {
                setDeletePop(false)
                setRefresh(prev => prev+1)
            }   
        }
        

        async function saveChanges(){
            const formData = new FormData()
            formData.append('vpfp', vendorDetails.vpfp)
            formData.append('business_name', vendorDetails.business_name);
            formData.append('location', vendorDetails.location);

            try {
                const response = await patchVendorProfile(vendorId,formData);
                } catch (error) {
                    console.error(error);
                } finally {
                    setEditProfPop(false)
                }
            alert('uploaded successfully')
        };
        


    return(
        <div className="flex flex-col relative h-full min-h-screen w-full bg-gray-200">
            {editProfPop && 
                <div className="fixed flex justify-center items-center h-full w-full bg-black/50 z-20 py-25 px-2">
                    <div className="relative flex flex-col w-full max-w-[600px] h-full max-h-fit py-8 px-4 sm:px-8 gap-4 bg-zinc-100 rounded-xl overflow-hidden">
                        <div onClick={() => setEditProfPop(false)}  className="absolute top-2 right-2">
                            {/* <h1 className="font-bold text-2xl">Add New Address</h1> */}
                            <svg className={`fill-black w-8 h-8 shrink-0 hover:cursor-pointer `} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg> 
                        </div>
                        <div className="flex flex-col mt-2">
                            <label className="font-semibold" htmlFor="vpfp">Pfp (URL)</label>
                            <input className="py-1 px-3 outline-1 outline-zinc-400 rounded-sm" name="vpfp" value={vendorDetails['vpfp']} onChange={(e)=> handleChange(e)} placeholder="" type="text" />
                        </div>
                        <div className="flex flex-col mt-2">
                            <label className="font-semibold" htmlFor="business_name">Business Name</label>
                            <input className="py-1 px-3 outline-1 outline-zinc-400 rounded-sm" name="business_name" value={vendorDetails['business_name']} onChange={(e)=> handleChange(e)} placeholder="" type="text" />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold" htmlFor="location">Location</label>
                            <input className="py-1 px-3 outline-1 outline-zinc-400 rounded-sm" name="location" value={vendorDetails['location'] != null ?vendorDetails['location']: ''} onChange={(e)=> handleChange(e)} placeholder="" type="text" />
                        </div>
                        <button onClick={()=>saveChanges()} className="flex justify-center bg-primary py-1 rounded-sm text-xl font-semibold hover:cursor-pointer">
                            Save
                        </button>
                    </div>
                </div>
            }

            {deletePop && 
                <div className="fixed flex justify-center items-center h-full w-full bg-black/50 z-20 py-25 px-2">
                    <div className="relative flex flex-col w-full max-w-[400px] h-full max-h-fit py-8 px-4 sm:px-8 gap-4 bg-zinc-100 rounded-xl overflow-hidden">
                        <p className="text-center">Are you sure you want to remove the product?</p>
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setDeletePop(false)} className="py-1 px-2 bg-zinc-500 text-white font-semibold rounded-sm">
                                Cancel
                            </button>
                            <button onClick={() => confirmDelete()} className="py-1 px-2 bg-red-500 text-white font-semibold rounded-sm">
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            }
            <div className="flex-1 overflow-y-auto custom-scrollbar px-4 sm:px-12 py-[1rem] ">
                <div className="mt-16  w-full h-[200px] sm:min-h-[200px] bg-primary mb-5 px-2 sm:px-0 flex flex-col sm:flex-row justify-center sm:justify-start items-center relative top-10 sm:top-0 shadow-md">
                    <div className="self-center aspect-square absolute sm:static -top-10 sm:top-0 sm:self-start h-[100px] w-[100px] sm:w-[200px] sm:h-full bg-zinc-800 rounded-[50%] sm:rounded-tl-[0%] sm:rounded-bl-[0%] overflow-hidden shrink-0">
                        <img className="object-center object-cover w-full h-full"  src={(vendorDetails.vpfp == '' || vendorDetails.vpfp == null) && vendorDetails != undefined ? 'https://i.pinimg.com/736x/9f/e7/3f/9fe73f40dbd9713c87e785379a595ec3.jpg': vendorDetails.vpfp} alt="" />
                    </div>
                    <div onClick={() => setEditProfPop(true)} className="group absolute top-0 right-0 sm:right-0 py-2 px-2 hover:cursor-pointer">
                        <svg className="h-6 w-6 fill-text transition-all ease-in-out duration-400 group-hover:rotate-90 " xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m382-80-18.67-126.67q-17-6.33-34.83-16.66-17.83-10.34-32.17-21.67L178-192.33 79.33-365l106.34-78.67q-1.67-8.33-2-18.16-.34-9.84-.34-18.17 0-8.33.34-18.17.33-9.83 2-18.16L79.33-595 178-767.67 296.33-715q14.34-11.33 32.34-21.67 18-10.33 34.66-16L382-880h196l18.67 126.67q17 6.33 35.16 16.33 18.17 10 31.84 22L782-767.67 880.67-595l-106.34 77.33q1.67 9 2 18.84.34 9.83.34 18.83 0 9-.34 18.5Q776-452 774-443l106.33 78-98.66 172.67-118-52.67q-14.34 11.33-32 22-17.67 10.67-35 16.33L578-80H382Zm55.33-66.67h85l14-110q32.34-8 60.84-24.5T649-321l103.67 44.33 39.66-70.66L701-415q4.33-16 6.67-32.17Q710-463.33 710-480q0-16.67-2-32.83-2-16.17-7-32.17l91.33-67.67-39.66-70.66L649-638.67q-22.67-25-50.83-41.83-28.17-16.83-61.84-22.83l-13.66-110h-85l-14 110q-33 7.33-61.5 23.83T311-639l-103.67-44.33-39.66 70.66L259-545.33Q254.67-529 252.33-513 250-497 250-480q0 16.67 2.33 32.67 2.34 16 6.67 32.33l-91.33 67.67 39.66 70.66L311-321.33q23.33 23.66 51.83 40.16 28.5 16.5 60.84 24.5l13.66 110Zm43.34-200q55.33 0 94.33-39T614-480q0-55.33-39-94.33t-94.33-39q-55.67 0-94.5 39-38.84 39-38.84 94.33t38.84 94.33q38.83 39 94.5 39ZM480-480Z"/></svg>
                        {/* <svg className="h-8 w-8 fill-text group-hover:fill-white " xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg> */}
                    </div>
                    <h1 className="pt-4 sm:pl-5 sm:pt-0 font-bold text-[clamp(2rem,7vw,5rem)] tracking-wider text-center">
                        {vendorDetails != undefined && vendorDetails.business_name != "" ?vendorDetails.business_name:'Business Name'}
                    </h1>
                    <Link
                        to={vendorDetails['location'] || '#'}
                        target={vendorDetails['location'] ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="absolute bottom-0 sm:right-0 py-2 px-4 flex font-semibold"
                        onClick={e => {
                            if (!vendorDetails['location']) {
                            e.preventDefault();  // Prevent navigation
                            setEditProfPop(true); // Open edit profile popup
                            }
                    }}>
                        {vendorDetails['location']?'Check on map': 'Add a location'}
                        <svg className="fill-text ml-1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-80q-106 0-173-33.5T240-200q0-24 14.5-44.5T295-280l63 59q-9 4-19.5 9T322-200q13 16 60 28t98 12q51 0 98.5-12t60.5-28q-7-8-18-13t-21-9l62-60q28 16 43 36.5t15 45.5q0 53-67 86.5T480-80Zm1-220q99-73 149-146.5T680-594q0-102-65-154t-135-52q-70 0-135 52t-65 154q0 67 49 139.5T481-300Zm-1 100Q339-304 269.5-402T200-594q0-71 25.5-124.5T291-808q40-36 90-54t99-18q49 0 99 18t90 54q40 36 65.5 89.5T760-594q0 94-69.5 192T480-200Zm0-320q33 0 56.5-23.5T560-600q0-33-23.5-56.5T480-680q-33 0-56.5 23.5T400-600q0 33 23.5 56.5T480-520Zm0-80Z"/></svg>
                    </Link>
                </div>


                <div className="mt-15 sm:mt-0 grid auto-rows-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10 px-4">
                    {prodData !== undefined && prodData.map((prod) => {return(
                        <div key={prod.id} className="relative shadow-lg bg-zinc-800 rounded-md flex flex-col w-full h-full flex-1">
                                <div className="w-full aspect-square overflow-hidden self-start flex items-center justify-center rounded-t-md shrink-0">
                                    <img className="object-cover object-center w-full shrink-0" src={prod.product_image} alt="" />
                                </div>
                            <div className="pt-5 p-4 justify-between flex flex-col flex-1 text-white">
                                <div>
                                    <h2 className="font-bold text-3xl pb-2">
                                        <a onClick={() => handleCardClick(prod.id,prod.title)} href="">
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
                                <div className="flex flex-wrap w-full h-fit justify-between justify-self-end items-center relative">
                                    <h2 className="relative top-1 font-bold text-4xl  min-w-[120px] ">₹ {prod.price}</h2>
                                    <button onClick={()=>handleModMenu(prod.id)} className="group hover:cursor-pointer hover:scale-105 hover:font-bold transition-all ease-in-out duration-300 z-5 rounded-md items-center font-[600] text-black max-h-[40px]">
                                        <svg className="h-8 w-8 fill-white group-hover:fill-primary " xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>
                                    </button>
                                    <div className={`absolute grid transition-all ease-in-out duration-200 ${prod.modMenu?'grid-rows-[1fr]':'grid-rows-[0fr]'}  right-6 `}>
                                        <div className={`overflow-hidden bg-zinc-300 transition-all ease-in-out duration-200 ${prod.modMenu?'px-4 py-0.5  outline-1 outline-black':''} rounded-sm`}>
                                            <p className="text-black hover:cursor-pointer" onClick={() => navigate(`/edit/${prod.id}`)}>edit</p>
                                            <p className="text-black hover:cursor-pointer" onClick={() => initiateDelete(prod.id)}>remove</p>

                                        </div>

                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    )})}
                </div>
            </div>
        </div>
    )
}

export default VendorProfile;