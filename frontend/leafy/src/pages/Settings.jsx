import { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { getUser, getUserAddress, patchUserAddress, postAddress, changePassword, saveUserInfo, becomeVendor } from "../api/ApiFunctions";
import bg from "../assets/sora.png"


const Settings = () =>{
    const navigate = useNavigate()
    const currentUserId = useUser()['currentUser'] === null? null : useUser()['currentUser'].id
    const [userData, setUserData] = useState({  'email': '',
                                                'pfp':'',
                                                'id': '',
                                                'is_vendor': '',
                                                'phone_number': '',
                                                'username': '',
                                                'vendor_profile': '' })
    
    const [addresses, setAddresses] = useState([])
    const [defAddress,setDefAddress] = useState({   'address_type': "",
                                                    'city': "",
                                                    'house': "",
                                                    'id': '',
                                                    'is_default': '',
                                                    'name': "",
                                                    'phone': "",
                                                    'pincode': "",
                                                    'state': "",
                                                    'street': "",
                                                    'user': ''})
    

    const [newAddrFormData, setNewAddrFormData] = useState({   'address_type': "Home",
                                                                'city': "",
                                                                'house': "",
                                                                'is_default': false,
                                                                'name': "",
                                                                'phone': "",
                                                                'pincode': "",
                                                                'state': "",
                                                                'street': "",})

    const [changePassForm, setChangePassForm] = useState({  current_pass:'',
                                                            new_pass:'',
                                                            confirm_pass:''
                                                        })

    const [addrTypeDropdown, setAddrTypeDropdown] = useState(false)

    const [tempNewDefAddr,setTempNewDefAddr] = useState(null)
    const [pfpPopup, setPfpPopup] = useState(false)
    const [selectAddrPopup, setSelectAddrPopup] = useState(false)
    const [newAddrPopup, setNewAddrPopup] = useState(false)
    const [changePassPop, setChangePassPop] = useState(false)
    const [passError, setPassError] = useState('')

    useEffect(() => {
        const fetchUserData = async() =>{
            const response = await getUser(currentUserId)
            setUserData(response.data)
        }

        const fetchAddresses = async() => {
            const response = await getUserAddress()
            const temp = response.data.map(addr => ({...addr, ['selected']:addr['is_default']}))
            setAddresses(temp)
            for (const addr of response.data) {
                if(addr['is_default'] == true){
                    setDefAddress(addr)
                    setTempNewDefAddr(addr)
                }
            }
        }
        if (currentUserId != null ){
        fetchUserData()
        fetchAddresses()
        }
    },[])

    useEffect(() =>{
        for (const addr of addresses) {
                if(addr['is_default'] == true){
                    setDefAddress(addr)
                }
            }
        }, [addresses])


    // formats the address for preview
    const addressFormat=(dict)=>{
        return(`${dict['house']} ${dict['street']}, ${dict['city']} — ${dict['pincode']}.`)
    }

    // formats the string to title case
    const toTitleCase = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    // handles the changes in form data
    const handleUserDataChange = (e) => {    
        setUserData(prev => ({...prev, [e.target.name]:e.target.value}))
    }


    const handleNewAddrDataChange = (e) => {
        if (e.target.id != 'is_default'){
            setNewAddrFormData(prev => ({...prev, [e.target.name]:e.target.value}))
        } else {
        const checked = e.target.checked
        setNewAddrFormData(prev => ({...prev, [e.target.name]:checked}))
        }
    }

    const addrTypeChange = (e) => {
        newAddrFormData['address_type'] = e.target.id
        setAddrTypeDropdown(false)
    }

    const addNewAddr = async (obj) => {
        let empty = false
        for (const key in obj) {
            if (obj[key] == "") {
                empty = true
            }
        }

        if (empty) {
            // alert("Make sure no field is left empty")
        }

        const formData = new FormData();
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
            // console.log(typeof(String(obj[key])), obj[key])
            formData.append(key, obj[key]);
            }
        }

        try{
            const response = await postAddress(formData)
        } catch(error) {
            console.log(error)
        } finally {
            setNewAddrPopup(false)
        }
    }

    // works inside the address pop up
    const selecttempNewDefAddr = (id) => {
        let theAddr = {}
        for(const a of addresses){
            if (a['id'] === id){
                
                theAddr = a
            }
        }
        setTempNewDefAddr(theAddr)

        setAddresses(prev => prev.map( addr => ( addr['id'] != id ? {...addr, ['selected']:false} : {...addr, ['selected']:true})) )
    }

    const handlePassFormChange = (e) =>{
        setChangePassForm(prev => ({...prev, [e.target.name]:e.target.value}))
    }

    const clearPassForm = () => {
        setChangePassForm({ current_pass:'',
                            new_pass:'',
                            confirm_pass:''
                            })
    }

    const initiatePasswordChange = async() => {
        const formData = new FormData()
        formData.append('current_password', changePassForm.current_pass)
        formData.append('new_password', changePassForm.new_pass)

        try{
            const response = await changePassword(userData.id, formData)
        } catch (error) {
            setPassError(error.response.data.error)
        } finally {
            clearPassForm()
            setPassError('')
            setChangePassPop(false)
        }
    }

    const saveUser = async() => {
        const formData = new FormData()
        formData.append('pfp', userData.pfp)
        formData.append("email", userData.email)
        formData.append("username", userData.username)
        formData.append("phone_number", userData.phone_number)
        formData.append("is_vendor", userData.is_vendor)

        try{
            const response = await saveUserInfo(userData.id, formData)
        } catch(error) {
                console.log(error)
        } finally {
            console.log("Changes Saved.")
        }

    }

    const savetempNewDefAddr = async (obj) => {
        const temp = {...obj, ['is_default']: true}
        const formData = new FormData();
        for (const key in temp) {
            if (temp.hasOwnProperty(key) && (key != 'user' && key != 'selected' )) {
            // console.log(typeof(String(obj[key])), obj[key])
            formData.append(key, key == 'id'? String(temp[key]): temp[key]);
            }
        }
        try{
            const response = await patchUserAddress(obj.id, formData)
        } catch(error) {
                console.log(error)
        } finally {
            setAddresses(prev => prev.map( addr => ( addr['id'] != obj.id ? {...addr, ['is_default']:false} : {...addr, ['is_default']:true})) )
        }
    }

    const vendorButton = async () =>{
        if(!userData.is_vendor){

            const response = await becomeVendor(userData.id)
            navigate(`/vendor/${response.data.vendor_profile.id}`)
        } else {
            navigate(`/vendor/${userData.vendor_profile.id}`)
        }
    }
    

    return(
        <div className="w-full h-fit min-h-screen bg-gradient-to-b from-zinc-800 to bg-zinc-950">
            {/* <div className="fixed flex h-full w-screen -z-5">
                <img className="h-full w-full object-cover object-right" src={bg} alt="" />
            </div> */}
            {pfpPopup && 
                <div className="fixed flex justify-center items-center h-full w-full bg-black/50 z-20 py-25 px-2">
                    <div className="relative flex flex-col w-full max-w-[600px] h-full max-h-fit py-8 px-4 sm:px-8 gap-4 bg-zinc-100 rounded-xl overflow-hidden">
                        <div className="absolute h-10 w-10 top-2 right-3 flex justify-center">
                            <svg onClick={() => setPfpPopup(false)} className="fill-black w-8 h-8 shrink-0 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg> 
                        </div>
                        <div className="flex flex-col mt-2">
                            <label className="font-semibold mb-2" htmlFor="pfp">Link for profile picture</label>
                            <input className="py-1 px-3 outline-1 outline-zinc-400 rounded-sm" name="pfp" value={userData['pfp']} onChange={(e)=> handleUserDataChange(e)} placeholder="" type="text" />
                        </div>
                    </div>
                </div>}
            {changePassPop && 
                <div className="fixed flex justify-center items-center h-full w-full bg-black/50 z-20 py-25 px-2">
                    <div className="relative flex flex-col w-full max-w-[600px] h-full max-h-fit py-8 px-4 sm:px-8 gap-4 bg-zinc-100 rounded-xl overflow-hidden">
                        <div    onClick={() => {setChangePassPop(false)
                                                setPassError('')
                                                clearPassForm()}}  
                                className="absolute top-2 right-2">
                            {/* <h1 className="font-bold text-2xl">Add New Address</h1> */}
                            <svg className={`fill-black w-8 h-8 shrink-0 hover:cursor-pointer `} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg> 
                        </div>
                        <div className="flex flex-col mt-2">
                            <label className="font-semibold" htmlFor="current_pass">Current Password</label>
                            <input className="py-1 px-3 outline-1 outline-zinc-400 rounded-sm" name="current_pass" value={changePassForm['current_pass']} onChange={(e)=> handlePassFormChange(e)} placeholder="" type="password" />
                        </div>
                        <div className="flex flex-col mt-2">
                            <label className="font-semibold" htmlFor="new_pass">New Password</label>
                            <input className="py-1 px-3 outline-1 outline-zinc-400 rounded-sm" name="new_pass" value={changePassForm['new_pass']}  onChange={(e)=> handlePassFormChange(e)} placeholder="" type="password" />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold" htmlFor="confirm_pass">Confirm Password</label>
                            <input className="py-1 px-3 outline-1 outline-zinc-400 rounded-sm" name="confirm_pass" value={changePassForm['confirm_pass']} onChange={(e)=> handlePassFormChange(e)} placeholder="" type="password" />
                        </div>
                        <p className="text-center text-red-500">{passError? passError:''}</p>
                        <button disabled={changePassForm['confirm_pass'] !== changePassForm['new_pass']} 
                                onClick={()=>initiatePasswordChange()}
                                className={`flex justify-center ${changePassForm['confirm_pass'] !== changePassForm['new_pass']?'bg-zinc-400':' bg-primary hover:cursor-pointer'} py-1 rounded-sm text-xl font-semibold `}>
                            Save
                        </button>
                    </div>
                </div>
            }

            {/* Change default address popup */}
            {selectAddrPopup && <div className="fixed flex justify-center items-center h-full w-full bg-black/50 z-20 py-25 px-2">
                <div className="relative flex flex-col w-full max-w-[600px] h-full bg-zinc-100 rounded-xl overflow-hidden">
                    <div className="absolute h-10 w-10 top-2 right-3 flex justify-center">
                        <svg onClick={() => setSelectAddrPopup(false)} className="fill-black w-8 h-8 shrink-0 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg> 
                    </div>
                    <div className="overflow-hidden overflow-y-scroll custom-scrollbar flex flex-col py-2 px-2 sm:px-15 gap-4">
                        {addresses.map(addr => {return(
                            <div key={addr['id']} className={`hover:cursor-pointer outline-2  w-full p-5 rounded-md ${addr['selected'] === true?' outline-primary bg-primary/10':'bg-zinc-200/80'}`} onClick={()=>selecttempNewDefAddr(addr['id'])}>
                                <div className="flex justify-between">
                                    <p>{toTitleCase(addr['name'])}</p>
                                    {addr['is_default'] == true && <p>(Default)</p>}
                                </div>
                                <p>{addr['phone']}</p>
                                <p>{addressFormat(addr)}</p>
                                <p>{addr['state']}</p>
                            </div>
                        )})}
                    </div>
                    {defAddress && tempNewDefAddr && defAddress.id != tempNewDefAddr.id &&<div className={`bottom-0 w-full absolute h-15 flex py-2 transition-all duration-300 ease-in-out   ${defAddress['id']!=tempNewDefAddr.id?'translate-y-0 delay-100':'translate-y-100 delay-150'}`}>

                        <button className={`bottom-0  mx- py-1 px-4 w-full bg-primary text-2xl rounded-[50px] mx-10 transition-all duration-300 ease-in-out delay-100 hover:cursor-pointer `} onClick={() => savetempNewDefAddr(tempNewDefAddr)}>Save</button>
                    </div>}
                    
                </div>
            </div>}

            {/* Add new address popup */}
            {newAddrPopup && <div className="fixed flex justify-center items-center h-full w-full bg-black/50 z-20 py-25 px-2">
                <div className="relative flex flex-col w-full max-w-[600px] h-full bg-zinc-100 rounded-xl overflow-hidden">
                    <div className="absolute w-full pl-4 pr-2 top-2 flex items-center justify-between bg-zinc-100">
                        <h1 className="font-bold text-2xl">Add New Address</h1>
                        <svg onClick={() => setNewAddrPopup(false)} className={`fill-black w-8 h-8 shrink-0 hover:cursor-pointer `} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg> 
                    </div>
                    <div className="mt-14 pb-4 px-8 flex flex-col gap-4 overflow-y-scroll custom-scrollbar">
                        <div className="flex flex-col">
                            <label className="font-semibold" htmlFor="address_type">Address Type</label>
                            <div  className="">
                                <div onClick={() => setAddrTypeDropdown(prev => !prev)} className="flex justify-between outline-1 outline-zinc-400 py-1 px-3 rounded-sm">
                                    <p>{newAddrFormData['address_type']}</p>
                                    <svg  className={`fill-black w-6 h-6 transition-transform duration-150 ease-in-out ${addrTypeDropdown?'scale-y-[-1]':''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
                                </div>
                                    <div className={`grid relative transition-all ease-in-out duration-200 ${addrTypeDropdown?'grid-rows-[1fr] mt-1':'grid-rows-[0fr]'}`}>
                                        <div className={`overflow-hidden bg-zinc-300 px-3 flex flex-col rounded-sm`}>
                                            <p onClick={(e) =>addrTypeChange(e)} id="home" className="py-1 hover:cursor-pointer">Home</p>
                                            <p onClick={(e) =>addrTypeChange(e)} id="work" className="py-1 hover:cursor-pointer">Work</p>
                                            <p onClick={(e) =>addrTypeChange(e)} id="other" className="py-1 hover:cursor-pointer">Other</p>
                                        </div>
                                    </div>
                                
                            </div>
                            {/* <input className="py-1 px-3 outline-1 outline-zinc-400 rounded-sm" name="address_type" value={newAddrFormData['address_type']} onChange={(e)=> handleNewAddrDataChange(e)} placeholder="" type='' /> */}
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold" htmlFor="name">Name</label>
                            <input required={true} className="py-1 px-3 outline-1 outline-zinc-400 rounded-sm" name="name" value={newAddrFormData['name']} onChange={(e)=> handleNewAddrDataChange(e)} placeholder="" type="text" />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold" htmlFor="phone">Phone</label>
                            <input className="py-1 px-3 outline-1 outline-zinc-400 rounded-sm" name="phone" value={newAddrFormData['phone']} onChange={(e)=> handleNewAddrDataChange(e)} placeholder="" type="text" />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold" htmlFor="house">House no.</label>
                            <input className="py-1 px-3 outline-1 outline-zinc-400 rounded-sm" name="house" value={newAddrFormData['house']} onChange={(e)=> handleNewAddrDataChange(e)} placeholder="" type="text" />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold" htmlFor="street">Street</label>
                            <input className="py-1 px-3 outline-1 outline-zinc-400 rounded-sm" name="street" value={newAddrFormData['street']} onChange={(e)=> handleNewAddrDataChange(e)} placeholder="" type="text" />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold" htmlFor="city">City</label>
                            <input className="py-1 px-3 outline-1 outline-zinc-400 rounded-sm" name="city" value={newAddrFormData['city']} onChange={(e)=> handleNewAddrDataChange(e)} placeholder="" type="text" />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold" htmlFor="state">State</label>
                            <input className="py-1 px-3 outline-1 outline-zinc-400 rounded-sm" name="state" value={newAddrFormData['state']} onChange={(e)=> handleNewAddrDataChange(e)} placeholder="" type="text" />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold" htmlFor="pincode">Pincode</label>
                            <input className="py-1 px-3 outline-1 outline-zinc-400 rounded-sm" name="pincode" value={newAddrFormData['pincode']} onChange={(e)=> handleNewAddrDataChange(e)} placeholder="" type="text" />
                        </div>
                        <div className="flex gap-3 items-center">
                            <label className="font-semibold" htmlFor="is_default">Default</label>
                            <input className="py-1 px-3 mb-1 rounded-sm" id="is_default" name="is_default"  onChange={(e)=> handleNewAddrDataChange(e)} placeholder="" type="checkbox" />
                        </div>
                        <button onClick={()=>addNewAddr(newAddrFormData)} className="flex justify-center bg-primary py-1 rounded-sm text-xl font-semibold">
                            Save
                        </button>
                    </div>
                </div>
            </div>}

            <div className="mt-22 flex flex-col items-center gap-4">
                <div className="relative flex justify-center max-w-[600px] w-full">
                    <div className="mt-22 w-full h-fit min-h-[150px] flex justify-center bg-zinc-200 rounded-2xl mx-2 shadow-md">
                        <h1 className="pt-21 text-3xl font-semibold tracking-wider">Hi, {userData['username']==""?"User":toTitleCase(userData['username'])}</h1>
                    </div>
                    <div
                        onClick={() => setPfpPopup(true)}
                        className="absolute w-36 h-36 bg-black/20 rounded-[50%] overflow-hidden shadow-lg group">
                        <img className="z-1" src={(userData.pfp == null || userData.pfp == '') || userData == undefined? 'https://i.pinimg.com/736x/2b/72/16/2b7216ec94eaed014688f94bb898c81d.jpg': userData.pfp} alt="" />
                        <div className="absolute w-full bottom-[-40px] group-hover:bottom-[0px] text-center z-5 bg-black/50 text-white font-bold tracking-wide py-2 transition-all duration-200 ease-in-out">Edit</div>
                    </div>
                </div>

                <div className="flex justify-center max-w-[600px] w-full">
                    <div className="bg-zinc-200 w-full rounded-2xl mx-2 shadow-md flex gap-4 justify-center px-8 py-4">
                        <p className="pt-1">{userData.is_vendor?'Vendor account active.':'Got a business?'}</p>
                        <button
                            className="py-1 px-3 bg-primary shadow-sm rounded-sm font-semibold hover:cursor-pointer"
                            disabled={userData.is_vendor === ""}
                            onClick={() => vendorButton()}
                            >
                            {userData.is_vendor?'Go to Dashboard':'Become a vendor'}
                        </button>
                    </div>
                </div>

                <div className="max-w-[600px] w-full h-fit min-h-[450px] flex justify-center mx-6 mb-6">
                    <form className="flex items-center flex-col w-full h-full gap-3  bg-zinc-200 mx-2 py-2 px-2 sm:py-8 sm:px-8 rounded-2xl shadow-md" action="">
                        <div className="w-[90%]">
                            <label className="w-[90px] pr-4 font-semibold" htmlFor="username">Username</label><br />
                            <input required={true} className="tracking-wide outline-1 outline-zinc-400c-400 py-1 px-2 rounded-md w-full" name="username" type="text" 
                            value={userData['username']} onChange={(e)=>handleUserDataChange(e)}/>
                        </div>
                        <div className="w-[90%]">
                            <label className="w-[90px] pr-4 font-semibold" htmlFor="email">Email</label><br />
                            <input className="tracking-wide outline-1 outline-zinc-400c-400 py-1 px-2 rounded-md w-full" name="email" type="text" 
                            value={userData['email']} onChange={(e)=>handleUserDataChange(e)}/>
                        </div>

                        <div className="w-[90%] flex flex-col sm:flex-row justify-between gap-4">
                            <div className="sm:w-[60%]">
                                <label className="w-[90px] pr-4 font-semibold" htmlFor="phone_number">Phone</label><br />
                                <input className="tracking-wide outline-1 outline-zinc-400c-400 py-1 px-2 rounded-md w-full" name="phone_number" type="text" 
                                value={userData['phone_number']==null?"":userData['phone_number']} placeholder="0123456789" onChange={(e)=>handleUserDataChange(e)}/>
                            </div>
                            <button onClick={(e) => {   e.preventDefault() 
                                                        setChangePassPop(true)}} 
                                    className="w-fit bg-primary px-[18px] h-[34px] shadow-sm rounded-md sm:self-end font-semibold  hover:cursor-pointer">
                                Change Password
                            </button>
                        </div>
                        
                        <div className="mt-4 flex flex-col bg-zinc-300 outline-white h-fit min-h-[120px] w-full rounded-lg px-2 py-2 sm:px-7 sm:py-4 pt-1 shadow-md">
                            <div className="w-full font-semibold text-2xl">
                                Address
                            </div>
                            <div className="flex flex-col sm-md:flex-row">
                                <div className=" flex justify-center  h-full min-h-[105px]">
                                <div className=" p-2 rounded-lg min-w-[250px] max-w-[300px] ">
                                    <p>{toTitleCase(defAddress['name'])}</p>
                                    <p>{defAddress['phone']}</p>
                                    {addresses.length != 0?<p>{addressFormat(defAddress)}</p>:<p></p>}
                                    <p>{defAddress['state']}</p>
                                </div>
                            </div>
                            <div className="flex flex-1 h-full flex-col gap-2 w-full items-center">
                                <button className="py-1 bg-primary rounded-md w-full max-w-[300px] shadow-sm font-semibold  hover:cursor-pointer"  onClick={(e) => { e.preventDefault() 
                                                                                                                                    setSelectAddrPopup(true)}}>
                                    Change
                                </button>
                                <button className="py-1 bg-primary rounded-md w-full max-w-[300px] shadow-sm font-semibold  hover:cursor-pointer" onClick={(e) => { e.preventDefault() 
                                                                                                                                    setNewAddrPopup(true)}}>
                                    Add New
                                </button>
                            </div>
                            </div>
                        </div>

                        <button 
                            onClick={(e)=>{
                                e.preventDefault()
                                saveUser()
                            }} 
                            className="py-1 px-3 bg-primary rounded-sm self-end shadow-sm font-semibold hover:cursor-pointer" >
                            Save changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Settings