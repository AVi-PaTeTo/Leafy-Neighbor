// import dummy from "../assets/dummy5.jpeg"
import bg from "../assets/b5.png"
import { getOrders } from "../api/ApiFunctions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Footer from "../components/Footer";

const BG_IMG = "https://videos.openai.com/vg-assets/assets%2Ftask_01k13mvb1kf9187sd0y08kqcq5%2F1753542958_img_1.webp?st=2025-07-26T13%3A50%3A10Z&se=2025-08-01T14%3A50%3A10Z&sks=b&skt=2025-07-26T13%3A50%3A10Z&ske=2025-08-01T14%3A50%3A10Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=JRMjxUEoDdMm6SfRrwQS2knf7tUTUlRIOLU5%2BfAzITU%3D&az=oaivgprodscus"


// processing   = <svg className=" w-6 h-6 flex-none shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" ><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>
// transit      = <svg className=" w-6 h-6 flex-none shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" ><circle cx="12" cy="4.5" r="2.5"/><path d="m10.2 6.3-3.9 3.9"/><circle cx="4.5" cy="12" r="2.5"/><path d="M7 12h10"/><circle cx="19.5" cy="12" r="2.5"/><path d="m13.8 17.7 3.9-3.9"/><circle cx="12" cy="19.5" r="2.5"/></svg>
// out for deli = <svg className=" w-6 h-6 flex-none shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" ><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>
// delivered    = <svg className=" w-6 h-6 flex-none shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" ><path d="m16 16 2 2 4-4"/><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/><path d="m7.5 4.27 9 5.15"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" x2="12" y1="22" y2="12"/></svg>

const status = {
    'PENDING':{  icon:<svg className="stroke-2 stroke-white w-6 h-6 flex-none shrink-0" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" ><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>,
                    accent: "to-amber-500/30",
                    title:"Processing"
                },

    'SHIPPED':{ icon:<svg className="stroke-2 stroke-white w-6 h-6 flex-none shrink-0" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" ><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>,
                accent: "to-cyan-500/40",
                title:"Shipped"
                },

    'TRANSIT':{ icon:<svg className="stroke-2 stroke-white w-6 h-6 flex-none shrink-0 fill-transparent" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>,
                accent: "to-cyan-500/40",
                title:"In Transit"
                },

    'OUT':{    icon:<svg className="stroke-2 stroke-white w-6 h-6 flex-none shrink-0" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" ><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>,
                accent: "to-cyan-500/40",
                title:"Out for delivery"
                },

    'DELIVERED':{   icon:<svg className="stroke-2 stroke-white w-6 h-6 flex-none shrink-0" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" ><path d="m16 16 2 2 4-4"/><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/><path d="m7.5 4.27 9 5.15"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" x2="12" y1="22" y2="12"/></svg>,
                    accent: "to-primary/60",
                    title:"Delivered"
                },

    'CANCELLED':{   icon:<svg className="stroke-2 stroke-white w-6 h-6 flex-none shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M4.929 4.929 19.07 19.071"/><circle cx="12" cy="12" r="10"/></svg>,
                    accent:"to-red-600/40",
                    title:"Cancelled"
                }        
}


const Order = (props) => {
    const navigate = useNavigate()
    const [orders, setOrders] = useState()
    const {user} = useUser()

    console.log(orders)
    useEffect(()=>{
        const fetchOrders = async() =>{
            const response = await getOrders()
            setOrders(response.data)
        }        
        if (user !=null){
            fetchOrders()
        }
    },[])

    const formatDate = (string) => {
        const date = string.split("T")[0].split("-").reverse().join('/')
        return date
    }

    return(
        <div className="w-full h-screen min-h-screen ">
            <div className="fixed flex h-full w-screen -z-5">
                <img className="h-full w-full object-cover object-right" src={bg} alt="" />
            </div>
            <div className="flex justify-center mt-16 md:mt-16 h-screen min-h-fit max-h-[calc(100vh-5.5rem)] w-full px-2 py-8">

                <div className="max-w-[800px] bg-gray-200/20 shadow-2xl backdrop-blur-[4px] relative w-full min-h-full h-fit rounded-lg ">
                    
                    {/* wishlist create button */}
                    <div className={`sticky w-full h-fit justify-end bg-zinc-800 rounded-t-lg z-10 transition-all ease-in-out  ${props.hide===true?'top-0 duration-200':'top-16 duration-300 delay-50'}`}>
                        <div className="flex justify-between p-4">
                                <h2 className="font-semibold text-3xl pt-1 text-gray-100 tracking-wide">Your Orders </h2>
                            <div>
                            </div>
                        </div>
                    </div>

                    
                    <div className="w-full max-h-[calc(100vh-12.5rem)] sm:max-h-[calc(100vh-12.5rem)] px-4 md:px-8 overflow-hidden overflow-y-auto custom-scrollbar">
                        <div className="">
                            <div className="flex flex-col gap-6 py-3 md:px-10 overflow-hidden scroll-auto">
                                    {orders !== undefined && orders.map(order => (
                                        <span key={order.id} className={`relative flex h-70 bg-gradient-to-b from-zinc-100/30 ${status[order.status].accent} rounded-md shadow-lg`}>
                                            <button className="hidden absolute rounded-sm p-1 right-2 top-2 bg-red-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg>
                                            </button>
                                            <span className="h-full w-33 shrink-0 flex flex-col justify-between">
                                                <img className="h-[70%] object-cover self-start rounded-tl-md" src={order != undefined ? order.order_items[0].product_image:""} alt="" />
                                                <div className="h-[30%] items-center flex p-2 text-gray-100 bg-zinc-800 rounded-bl-md ">
                                                    <h2 className=" text-[1.1rem] flex-1 pt-1">{status[order.status].title}</h2>
                                                    {status[order.status].icon}
                                                </div>
                                            </span>
                                            <div className=" flex flex-col w-full justify-between">
                                                <section className="h-[70%] flex flex-col justify-between  sm:text-xl py-2 px-2 sm:px-4">
                                                    <div className="flex w-full flex-col md:gap-4">
                                                        <div className="flex justify-between flex-col sm:flex-row sm:gap-4">
                                                            <p className="text-[0.9rem] align-sub pt-1">Order Id: </p>
                                                            <p className="font-semibold text-[1.1rem]">{order.order_id}</p>
                                                        </div>
                                                        <div className="flex justify-between flex-col sm:flex-row sm:gap-4">
                                                            <p className="text-[0.9rem] align-sub pt-1">Ordered on: </p>
                                                            <p className="font-semibold text-[1.1rem]">{formatDate(order.created_at)}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between flex-col sm:flex-row sm:gap-4">
                                                        <p className="text-[0.9rem] align-sub pt-2">Total: </p>
                                                        <p className="font-semibold text-[1.3rem]">₹{order.total}</p>
                                                    </div>
                                                </section>
                                                <section className="h-[30%] flex bg-zinc-800 px-2 mobile:px-4 gap-3 w-full rounded-br-md items-center justify-end">
                                                    <button className="sm:py-1 sm:px-6 font-semibold rounded-sm bg-gray-200">
                                                        <svg className="block sm:hidden" xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#000000"><path d="M228-80q-45.83 0-77.92-32.08Q118-144.17 118-190v-123.33h124.67V-880l59.86 60 59.87-60 59.87 60 59.86-60L542-820l60-60 60 60 60-60 60 60 60-60v690q0 45.83-32.08 77.92Q777.83-80 732-80H228Zm504-66.67q19 0 31.17-12.16Q775.33-171 775.33-190v-583.33h-466v460h379.34V-190q0 19 12.16 31.17Q713-146.67 732-146.67Zm-374-468v-66.66h240v66.66H358Zm0 129.34V-552h240v66.67H358Zm328.67-129.34q-13.67 0-23.5-9.83-9.84-9.83-9.84-23.5t9.84-23.5q9.83-9.83 23.5-9.83 13.66 0 23.5 9.83Q720-661.67 720-648t-9.83 23.5q-9.84 9.83-23.5 9.83Zm0 126q-13.67 0-23.5-9.83-9.84-9.83-9.84-23.5t9.84-23.5q9.83-9.83 23.5-9.83 13.66 0 23.5 9.83Q720-535.67 720-522t-9.83 23.5q-9.84 9.83-23.5 9.83Zm-459.34 342H622v-100H184.67V-190q0 19 12.26 31.17 12.27 12.16 30.4 12.16Zm-42.66 0v-100 100Z"/></svg>
                                                        <p className="hidden sm:block">Invoice</p>
                                                    </button>
                                                    <button onClick={() => navigate(`/summary/${order.id}`)} className="py-1 px-3 mobile:px-6 font-semibold rounded-sm bg-primary">Track</button>
                                                </section>
                                            </div>
                                        </span>
                                    ))}
                            </div>
                        </div>                
                        
                    </div>

                    
                </div>
            </div>
            
            
                <Footer />
                
        </div>
    );
};

export default Order