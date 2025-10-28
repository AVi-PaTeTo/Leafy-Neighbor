import bg from "../assets/b5.png"
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../api/ApiFunctions";

const statusMessage = {
    'pending':'Your order is being processed and packed by the seller.',
    'shipped':'Your order has been shipped by the seller.',
    'transit':'Your order is being shipped to the hub nearest to you.',
    'out':'Your order will be at your doorsteps any minute.',
    'delivered':'Order has been delivered.',

}

const Summary = () => {
    const {id} = useParams();
    const [orderData, setOrderData] = useState()
    const [status, setStatus] = useState({id: 0, status: ''})

    useEffect(()=>{
        const fetchOrder = async() =>{
            const response = await getOrderById(id)
            setOrderData(response.data)

            const s = response.data.status
            if(s==='PENDING'){
                setStatus({id:0, status:'pending'})
            } else if (s==='SHIPPED') {
                setStatus({id:1,  status:'shipped'})
            } else if (s==='TRANSIT'){
                setStatus({id:2, status:'transit'})
            } else if (s==='OUT'){
                setStatus({id:3, status:'out'})
            } else if (s==='DELIVERED'){
                setStatus({id:3, status:'delivered'})
            } else {
                setStatus(4)
            }
        }
        fetchOrder()
    },[])

    function formatINR(amount) {
        let num = Math.floor(amount);
        return num.toLocaleString('en-IN');
    }

    // console.log(orderData['shipping_address'].split("\n").slice(2).join(' '))
    // console.log(orderData)

    return(
        <div className="w-screen h-fit min-h-screen pt-16">

            {/* background image */}
            <div className="fixed top-0 flex h-full w-screen -z-5">
                <img className="h-full w-full object-cover object-right" src={bg} alt="" />
            </div>

            {/* order status OR track */}
            <div className="mt-12 px-2 md:px-8 w-full flex justify-center ">
                <div className="w-full max-w-[800px] h-fit min-h-[250px] shadow-lg rounded-b-lg">
                    <div className="bg-zinc-800 w-full px-4 pt-4 rounded-t-lg">
                        <h2 className="font-bold text-gray-100 text-5xl ">Status</h2>
                    </div>
                    <div className="bg-gray-200 backdrop-blur-[8px] min-h-[200px] h-fit rounded-b-lg p-8">
                        <div className="w-full h-[400px] sm:h-[100px] flex items-center">
                            <div className="relative top-[-30px] sm:top-0 flex flex-col sm:flex-row justify-between items-center w-1 h-[80%] sm:w-full sm:h-1  bg-gray-300">
                                <div style={{ width: `${status['id'] * 33}%`, height: `${status['id'] * 33}%`  }} className={`absolute h-full bg-primary z-1 `}></div>
                                <div className={`relative h-3 w-3 ${status['id']>=0?'bg-primary':'bg-gray-300'} rounded-2xl z-3`}>
                                    <div className={`p-1 bg-primary rounded-sm translate-x-[35px] translate-y-[-10px] sm:translate-x-[0px] sm:translate-y-[-42px] w-fit ${status['id'] >=0? 'block':'hidden'}`}>
                                        <p>Processing</p>
                                    </div>
                                    <div className={`absolute  ${status['id'] ===0? 'bg-primary-dark animate-ping':''} inset-0 rounded-2xl`}></div>
                                </div>
                                <div className={`relative h-3 w-3 ${status['id']>=1?'bg-primary':'bg-gray-300'} rounded-2xl z-3`}>
                                    <div className={`p-1 bg-primary rounded-sm translate-x-[30px] translate-y-[-10px]  sm:translate-y-[-42px] sm:-translate-x-1/2 left-1/2 w-fit absolute ${status['id'] >=1? 'block':'hidden'}`}>
                                        <p>Shipped</p>
                                    </div>
                                    <div className={`absolute  ${status['id'] ===1? 'bg-primary-dark animate-ping':''} inset-0 rounded-2xl`}></div>
                                </div>
                                <div className={`relative h-3 w-3 ${status['id']>=2?'bg-primary':'bg-gray-300'} rounded-2xl z-3`}>
                                    <div className={`p-1 bg-primary rounded-sm translate-x-[30px] translate-y-[-10px]  sm:translate-y-[-42px] sm:-translate-x-1/2 left-1/2 w-[78px] absolute ${status['id'] >=2? 'block':'hidden'}`}>
                                        <p>In Transit</p>
                                    </div>
                                    <div className={`absolute    ${status['id'] ===2? 'bg-primary-dark animate-ping':''}  inset-0 rounded-2xl`}>
                                    </div>
                                </div>
                                <div className={`relative h-3 w-3 ${status['id']>=3?'bg-primary':'bg-gray-300'} rounded-2xl z-3`}>
                                    <div>
                                        <div className={`p-1 bg-primary rounded-sm  translate-y-[-10px] sm:translate-x-[0px] sm:translate-y-[-42px] right-0 ${status['status'] === 'out'?'min-w-[130px] translate-x-[130px]':'w-fit translate-x-[100px]'}  absolute ${status['id'] >=3? 'block':'hidden'}`}>
                                        <p>{status['status'] === 'out'?'Out for Delivery':'Delivered'}</p>
                                        </div>
                                    </div>
                                    <div className={`absolute  ${status['id'] ===3? 'bg-primary-dark animate-ping':''} inset-0 rounded-2xl`}>
                                        
                                    </div>
                                </div>
                            </div>

                            
                        </div>
                        <div>
                                <div className="self-end flex justify-center gap-2">
                                    <svg className="w-[22px] h-[22px] shrink-0" xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                                    <p>{statusMessage[status['status']]}</p>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            

            {/* order summary */}
            <div className="mt-12 flex justify-center w-full px-2 md:px-8  ">
                <div className="w-full max-w-[800px] h-fit min-h-[300px] shadow-lg">
                    <div className="bg-zinc-800 w-full px-4 pt-4 rounded-t-lg">
                        <h2 className="font-bold text-gray-100 text-5xl ">Summary</h2>
                    </div>
                    <div className="bg-gray-200/50 backdrop-blur-[8px] h-fit p-2 rounded-lg">
                        {orderData !== undefined && <div className="mb-2">
                            <div className="flex gap-2">
                                <p className="font-semibold">Name:</p> {orderData['shipping_address'].split('\n')[0]}
                            </div>
                            <div className="flex gap-2">
                                <p className="font-semibold">Phone:</p> {orderData['shipping_address'].split('\n')[1]}
                            </div>
                            <div className="flex gap-2">
                                <p className="font-semibold">Address:</p> {orderData['shipping_address'].split("\n").slice(2).join(' ')}
                            </div>
                        </div>}
                        <table className="font-semibold w-full">
                            <thead>
                                <tr>
                                    <th className="border-[1px] p-1 w-[60%] text-start">Name</th>
                                    <th className="border-[1px] p-1 text-start">Qty</th>
                                    <th className="border-[1px] p-1 text-start">Price</th>
                                    <th className="border-[1px] p-1 text-start">Total</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {
                                    orderData === undefined?(
                                        <tr className="">
                                            <td className="border-x-[1px] p-1 w-[60%] text-start"></td>
                                            <td className="border-x-[1px] p-1 text-start"></td>
                                            <td className="border-x-[1px] p-1 text-start"></td>
                                            <td className="border-x-[1px] p-1 text-start"></td>
                                        </tr>
                                    ): orderData.order_items.map(order => (
                                        <tr className="">
                                            <td className="border-x-[1px] p-1 w-[60%] text-start">{order.product_name}</td>
                                            <td className="border-x-[1px] p-1 text-start">{order.quantity}</td>
                                            <td className="border-x-[1px] p-1 text-start">{formatINR(order.unit_price)}</td>
                                            <td className="border-x-[1px] p-1 text-start">₹{formatINR(order.quantity * order.unit_price)}</td>
                                        </tr>
                                    ))
                                }
                                <tr className="h-[100px]">
                                    <td className="border-x-[1px] p-1 w-[60%] text-start"></td>
                                    <td className="border-x-[1px] p-1 text-start"></td>
                                    <td className="border-x-[1px] p-1 text-start"></td>
                                    <td className="border-x-[1px] p-1 text-start"></td>
                                </tr>
                                <tr className="border-[1px] h-[33px]">
                                    <td className="h-[33px] p-1 w-[60%] text-start"></td>
                                    <td className="h-[33px] p-1 text-start"></td>
                                    <td className="h-[33px] p-1 text-start"></td>
                                    <td className="h-[33px] p-1 text-start font-semibold text-[1.1rem]">₹{orderData!== undefined && formatINR(orderData.total)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Summary