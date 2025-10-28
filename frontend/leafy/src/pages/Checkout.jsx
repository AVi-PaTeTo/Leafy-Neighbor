import { useState } from "react"

import bg from "../assets/b5.png"

const Checkout = (props) => {
    const [active, setActive] = useState("")
    const [cardDetails, setCardDetails] = useState({
                                                    cardNum:"",
                                                    validThru:"",
                                                    cvv:""    
                                                    })
    const [upiId, setUpiId] = useState('')


    const [cardError, setCardError] = useState('')
    const [dateError, setDateError] = useState('')                                                
    const toggle = (string) => {
        if(string === active){
            setActive("")
        } else {
            setActive(string)
        }
    }

    const cardNumberFormat = (string) => {

        let formattedString = ""
        const s = string.replaceAll('-', '')
        for (let i = 0; i < s.length; i++) {
            if (i == 4 || i == 8 || i == 12){
                formattedString = formattedString + "-" + s[i]
            } else {
                formattedString = formattedString + s[i]
            }
        }
        formattedString.length === 19? setCardError(''):setCardError('Invalid Card Number')
        return formattedString
    }

    const dateFormat = (input) => {
        const sanitized = input.replace(/\D/g, '').slice(0, 4);

        // Not enough digits yet, just return as-is
        if (sanitized.length < 4) {
            return sanitized;
        }

        const month = sanitized.slice(0, 2);
        const year = sanitized.slice(2, 4);

        // Validate that month is 01 to 12
        if (Number(month) < 1 || Number(month) > 12) {
            return "Invalid month";
        }

        // Get current date components
        const now = new Date();
        const currentYear = now.getFullYear() % 100; // last two digits, e.g. 25 for 2025
        const currentMonth = now.getMonth() + 1;     // getMonth: 0-indexed

        // Check if expiry is in the future
        if (Number(year) < currentYear || (Number(year) === currentYear && Number(month) < currentMonth)) {
            setDateError("Invalid")
            return `${month}/${year}`;
        }
        setDateError("")
        return `${month}/${year}`;
    }


    const changeValue = (e) => {
        if (e.target.name === "card"){
                const value = cardNumberFormat(e.target.value)
                setCardDetails(prev => ({...prev, cardNum:e.target.value.replaceAll('-', '').length > 16? prev['cardNum']:value}))
            } 
        else if (e.target.name === "expiry"){
                const value = dateFormat(e.target.value)
                // console.log(e.target.value)
                // console.log(value)
                setCardDetails(prev => ({...prev, validThru:e.target.value.length > 4? prev['validThru']:value}))
            }
        else if (e.target.name === "cvv"){
                setCardDetails(prev => ({...prev, cvv:e.target.value.length > 3? prev['cvv']:e.target.value}))
            }
    }


    

    return (
        <div className="w-full relative">

            <div className="fixed flex h-full w-screen -z-5">
                <img className="h-full w-full object-cover object-right" src={bg} alt="" />
            </div>
            
            <div className="w-full h-screen flex justify-center pt-35 pb-12 px-4 sm:px-[100px] lg:px-[300px]">
                <div className=" bg-white/10 shadow-2xl backdrop-blur-[4px] rounded-xl w-full h-fit max-w-[600px]">
                    <h1 className="text-3xl font-semibold px-4 py-4 text-zinc-100 bg-zinc-800 rounded-t-lg mb-8">Payment Method</h1>

                    {/* Credit/Devit Card Pill */}
                    <div className="px-2 sm:px-8 pb-8 flex flex-col gap-2">
                        <div className="group  bg-zinc-200 rounded-lg shadow-md">
                            <div onClick={()=>toggle('card')} className="px-4 py-2">
                                <h1 className="text-xl font-semibold hover:cursor-pointer ">Credit/Debit Card</h1>
                            </div>
                            <div className={`grid ${active === 'card'?"grid-rows-[1fr]":"grid-rows-[0fr]"} transition-discrete duration-300 ease-in-out`}>
                                <div className="overflow-hidden px-4 sm:pl-8">
                                    <div className="flex flex-col">
                                        <label htmlFor="card">Card Number</label>
                                        <input name="card" required={true} className="w-[240px] border-1 border-gray-400 py-1 px-2 rounded-sm" min={12} max={12} type="text" placeholder="XXXX XXXX XXXX XXXX"
                                                value={cardDetails['cardNum']} onChange={(e) => changeValue(e)}
                                        />
                                        {cardError && <p className="text-red-600 text-[0.8rem] mt-1">{cardError}</p>}
                                    </div>
                                    <div className="flex gap-10 py-4">
                                        <div className="flex flex-col">
                                            <label htmlFor="expiry">Valid Thru</label>
                                            <input name="expiry" required={true} className="border-1 border-gray-400 py-1 px-2 rounded-sm w-[100px]" type="text" placeholder="12/12"
                                                    value = {cardDetails['validThru']} onChange={(e) => changeValue(e)}     
                                            />
                                            {dateError && <p className="text-red-600 text-[0.8rem] mt-1">{dateError}</p>}
                                        </div>
                                        
                                        <div className="flex flex-col">
                                            <label htmlFor="cvv">CVV</label>
                                            <input name="cvv" required={true} className="border-1 border-gray-400 py-1 px-2 rounded-sm w-[100px]" type="text" placeholder="CVV"
                                                    value={cardDetails['cvv']} onChange={(e) => changeValue(e)}
                                            />
                                        </div>
                                    </div>
                                    <button className="w-[240px] mb-4 bg-primary py-1 rounded-sm hover:cursor-pointer">Pay</button>
                                </div>
                            </div>
                        </div>

                        {/* UPI Pill */}
                        <div className="group  bg-zinc-200 rounded-lg shadow-md">
                            <div onClick={()=>toggle('upi')} className="px-4 py-2">
                                <h1 className="text-xl font-semibold hover:cursor-pointer ">UPI</h1>
                            </div>
                            <div className={`grid ${active === 'upi'?"grid-rows-[1fr]":"grid-rows-[0fr]"} transition-discrete duration-300 ease-in-out`}>
                                <div className="overflow-hidden px-4 sm:pl-8">
                                    <div className="flex flex-col mb-4">
                                        <label htmlFor="expiry">UPI Id</label>
                                        <input name="expiry" required={true} className="border-1 border-gray-400 py-1 px-2 rounded-sm w-[240px]" type="text" placeholder="enter your UPI id"
                                                value={upiId} onChange={(e) => setUpiId(e.target.value)}
                                        />
                                    </div>
                                    <button className="w-[240px] mb-4 bg-primary py-1 rounded-sm hover:cursor-pointer">Pay</button>
                                </div>
                            </div>
                        </div>

                        {/* COD pill */}
                        <div className="group bg-zinc-200 rounded-lg shadow-md">
                            <div onClick={()=>toggle('cod')} className="px-4 py-2">
                                <h1 className="text-xl font-semibold hover:cursor-pointer">Cash On Delivery</h1>
                            </div>
                            <div className={`grid ${active === 'cod'?"grid-rows-[1fr]":"grid-rows-[0fr]"} transition-discrete duration-300 ease-in-out`}>
                                <div className="overflow-hidden px-4 sm:pl-8">
                                    <button className="w-[240px] mb-4 bg-primary py-1 rounded-sm hover:cursor-pointer">Place Order</button>
                                </div>
                            </div>
                        </div>

                        {/* <div className="group bg-zinc-200 rounded-lg shadow-md">
                            <div onClick={()=>toggle('coupon')} className="px-4 py-2">
                                <h1 className="text-xl font-semibold ">Coupon</h1>
                            </div>
                            <div className={`grid ${active === 'couponpoll'?"grid-rows-[1fr]":"grid-rows-[0fr]"} transition-discrete duration-300 ease-in-out`}>
                                <div className="overflow-hidden px-4 sm:pl-8 ">
                                    <p>Enter Coupon</p>
                                </div>
                            </div>
                        </div> */}
                    </div>

                </div>
            </div>
        </div>
        
    )
}

export default Checkout