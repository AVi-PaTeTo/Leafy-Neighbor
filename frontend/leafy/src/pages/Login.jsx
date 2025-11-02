import { useState } from "react";
import bg from "../assets/bglog2.webp"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { jwtDecode } from "jwt-decode";
import { userSignUp, getUser } from "../api/ApiFunctions";

const Login = () => {
    const [loginFormData, setLoginFormData] = useState({email:'', password:''})
    const [signUpFormData,setSignUpFormData] = useState({sup_username: '', sup_email: '', sup_password: '', sup_confirm_password:''})
    const [signUpFormVisible, setSignUpFormVisible] = useState(false)
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {setUser} = useUser();

    const disableSignUpButton = signUpFormData.sup_password.length <8 || signUpFormData.sup_password != signUpFormData.sup_confirm_password

    const handleLogin = async (e, json) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
        const response = await axios.post("http://localhost:8000/api/token/", json);
        
        const { access, refresh } = response.data;

        // Save tokens in localStorage
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);


        //Decode the token to get user info
        const decodedToken = jwtDecode(access)
        const userId = decodedToken.user_id;
        
        const profileResponse = await getUser(userId)
        setUser(profileResponse.data);
        console.log('Login successful!');
        navigate('/');
        } catch (err) {
        setError(err.response?.data?.detail || 'Invalid credentials. Try again.');
        } finally {
        setLoading(false);
        }
    };

    const handleLoginForm = (e) => {
        const {id, value} = e.target
        setLoginFormData(prev => ({...prev, [id]:value}))
    }

    const handleSignUpForm = (e) => {
        const {id, value} = e.target
        setSignUpFormData(prev => ({...prev, [id]:value}))
    }

    async function initiateSignUp(e){
        const formData = new FormData()
        formData.append('username',signUpFormData.sup_username)
        formData.append('email',signUpFormData.sup_email)
        formData.append('password',signUpFormData.sup_password)

        const response = await userSignUp(formData)
        console.log("User Created:", response.data)

        handleLogin(e,{
                        email:signUpFormData.sup_email,
                        password:signUpFormData.sup_password
        })
    }


    return(
        <div className="w-full h-full z-50 ">
            <div className="fixed top-0 flex w-full h-full -z-5">
                <img className="object-cover object-center h-full w-full" src={bg} alt="" />
            </div>
            <div className="w-full h-screen p-4 flex justify-center items-center">
                <div className="w-full h-full overflow-clip max-h-[700px] max-w-[600px] backdrop-blur-[6px] bg-gradient-to-b from-white/50 to-primary/30 rounded-xl shadow-lg">
                    <div className="w-full h-full flex">

                        {/* sign in form */}
                        <form onSubmit={handleLogin} className={`flex flex-col items-center justify-center pt-10 pb-4 px-10 sm:py-16 sm:pb-10 sm:px-30 h-full w-full shrink-0 transition-transform duration-700 ease-in-out ${!signUpFormVisible?'translate-x-0':'-translate-x-[100%] pointer-events-none'}`} action="">
                            <div className="flex flex-col w-full items-center justify-center pb-8">
                                <h2 className="font-bold text-[2rem] text-center tracking-tight pb-2">Hello again, Neighbour!</h2>
                                <p className="text-center tracking-wide">Let’s get you back to growing your perfect space.</p>
                            </div>

                            <div className="flex flex-col w-full">
                                <div className="flex flex-col w-full group">
                                    <label className={`${loginFormData['email'] === ''? 'translate-y-8': 'translate-y-0'} translate-x-2 transition-transform duration-500 ease-in-out group-focus-within:translate-y-0`} htmlFor="email">Email</label>
                                    <input id="email" 
                                        className="border-b-2 p-1.5 focus:border-b-primary focus:outline-0 mb-4" type="email" value={loginFormData['email']} onChange={handleLoginForm}/>
                                </div>

                                <div className="flex flex-col w-full group">
                                    <label className={`transition-transform duration-500 ease-in-out  translate-x-2 ${loginFormData['password'] === ''? 'translate-y-8': 'translate-y-0'} group-focus-within:translate-y-0`} htmlFor="password">Password</label>
                                    <input id="password" 
                                            className="border-b-2 p-2 focus:border-b-primary focus:outline-0 mb-6" type="password" value={loginFormData['password']} onChange={handleLoginForm}/>
                                </div>
                            </div>

                            <a className="self-end text-accent mb-6" href="">Forgot Password?</a>

                            <button onClick={(e) => handleLogin(e, loginFormData)} className="hover:cursor-pointer w-full  py-2 bg-primary rounded-md mb-6 font-semibold shadow-md">Sign In</button>

                            <p>or sign in with</p>

                            <div className="flex w-full justify-evenly mt-6">
                                <div className="py-1 px-4 outline-2 outline-primary bg-primary rounded-md shadow-md" href="">
                                    <svg className="stroke-text stroke-1 fill-transparent h-6 w-6 sm:h-8 sm:w-8" xmlns="http://www.w3.org/2000/svg" width="32" height="32" enableBackground="new 0 0 32 32" viewBox="0 0 32 32" id="google">
                                        <title>feature for the future</title>
                                        <path fill="#263238" d="M16.33,31c-5.777,0-10.942-3.203-13.481-8.358C1.828,20.565,1.31,18.331,1.31,16
                                                c0-2.333,0.518-4.569,1.54-6.644C5.388,4.202,10.553,1,16.33,1c3.66,0,7.083,1.296,9.898,3.748c0.105,0.091,0.167,0.221,0.171,0.36
                                                c0.005,0.139-0.048,0.273-0.146,0.371L22.03,9.697c-0.182,0.181-0.472,0.195-0.67,0.033c-1.44-1.177-3.18-1.799-5.03-1.799
                                                c-3.497,0-6.58,2.224-7.67,5.533C8.388,14.291,8.25,15.144,8.25,16c0,0.854,0.137,1.705,0.408,2.53
                                                c1.091,3.312,4.174,5.538,7.672,5.538c1.744,0,3.319-0.412,4.556-1.191c0.854-0.539,1.534-1.238,2.021-2.081
                                                c0.138-0.239,0.442-0.321,0.684-0.183c0.239,0.139,0.321,0.444,0.183,0.684c-0.569,0.984-1.361,1.8-2.354,2.426
                                                c-1.397,0.88-3.156,1.345-5.089,1.345c-3.93,0-7.395-2.502-8.622-6.226C7.404,17.916,7.25,16.96,7.25,16
                                                c0-0.963,0.155-1.921,0.46-2.849c1.226-3.72,4.689-6.22,8.62-6.22c1.933,0,3.757,0.602,5.305,1.746l3.526-3.521
                                                C22.611,3.089,19.569,2,16.33,2C10.937,2,6.116,4.988,3.747,9.797C2.793,11.734,2.31,13.821,2.31,16c0,2.176,0.483,4.263,1.437,6.2
                                                C6.115,27.011,10.937,30,16.33,30c3.464,0,6.704-1.236,9.121-3.48c2.774-2.575,4.24-6.212,4.24-10.52c0-0.601-0.071-1.272-0.212-2
                                                H17v4.466h7.118c0.276,0,0.5,0.224,0.5,0.5s-0.224,0.5-0.5,0.5H16.5c-0.276,0-0.5-0.224-0.5-0.5V13.5c0-0.276,0.224-0.5,0.5-0.5
                                                h13.385c0.234,0,0.438,0.163,0.488,0.392c0.21,0.95,0.317,1.828,0.317,2.608c0,4.593-1.577,8.484-4.559,11.253
                                                C23.528,29.669,20.048,31,16.33,31z"></path>
                                    </svg>
                                    
                                </div>

                                <div className="py-1 px-4 outline-2 outline-primary bg-primary rounded-md shadow-md" href="">
                                    <svg className="stroke-1.5  h-6 w-6 sm:h-8 sm:w-8" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                                    <title>feature for the future</title>
                                    </svg>
                                </div>
                                
                                <div className="py-1 px-4 outline-2 outline-primary bg-primary rounded-md shadow-md" href="">
                                    <svg className="stroke-1.5 h-6 w-6 sm:h-8 sm:w-8" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" ><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                                    <title>feature for the future</title>
                                    </svg>
                                </div>
                            </div>

                            <p className="mt-auto">
                                Don't have an account? 
                                <a  onClick={(e) => {e.preventDefault() 
                                                    setSignUpFormVisible(prev => !prev)}} 
                                    className="text-accent pl-1 " href="">
                                    Sign Up
                                </a>
                            </p>
                        </form>

                    {/* Sign up form */}
                    <form className={`relative flex flex-col  items-center justify-center pt-10 pb-4 px-10 sm:py-16 sm:pb-10 sm:px-30 h-full w-full shrink-0 transition-transform duration-700 ease-in-out ${!signUpFormVisible?'translate-x-0 pointer-events-none':'-translate-x-[100%]'}`} action="">
                        <button tabIndex={signUpFormVisible === true? 0:-1} 
                                onClick={(e) =>  {  e.preventDefault() 
                                                    setSignUpFormVisible(prev => !prev)
                                                    }} 
                                className="absolute shadow-md top-4 left-4 py-2 px-4 rounded-4xl bg-primary">

                            <svg className="fill-black" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z"/></svg>
                        </button>

                        <div className="flex flex-col w-full items-center justify-center pb-4">
                            <h2 className="font-bold text-[1.8rem] text-center tracking-tight pb-2">Welcome to your new plant paradise</h2>
                        </div>

                        <div className="flex flex-col w-full">
                            <div className="flex flex-col w-full group">
                                <label className={`${signUpFormData['sup_username'] === ''? 'translate-y-8': 'translate-y-0'} pointer-events-none  translate-x-2 transition-transform duration-500 ease-in-out group-focus-within:translate-y-0`} htmlFor="sup_username">Username</label>
                                <input id="sup_username" 
                                    className="border-b-2 p-1.5 focus:border-b-primary focus:outline-0 mb-4" type="text" value={signUpFormData['sup_username']} onChange={handleSignUpForm}/>
                            </div>

                            <div className="flex flex-col w-full group">
                                <label className={`${signUpFormData['sup_email'] === ''? 'translate-y-8': 'translate-y-0'} pointer-events-none  translate-x-2 transition-transform duration-500 ease-in-out group-focus-within:translate-y-0`} htmlFor="sup_email">Email</label>
                                <input id="sup_email" 
                                    className="border-b-2 p-1.5 focus:border-b-primary focus:outline-0 mb-4" type="email" value={signUpFormData['sup_email']} onChange={handleSignUpForm}/>
                            </div>

                            <div className="flex flex-col w-full group">
                                <label className={` pointer-events-none transition-transform duration-500 ease-in-out  translate-x-2 ${signUpFormData['sup_password'] === ''? 'translate-y-8': 'translate-y-0'} group-focus-within:translate-y-0`} htmlFor="sup_password">Password</label>
                                <input  id="sup_password" 
                                        className="border-b-2 p-2 focus:border-b-primary focus:outline-0 mb-6" type="password" value={signUpFormData['sup_password']} onChange={handleSignUpForm}/>
                            </div>

                            <div className="flex flex-col w-full group">
                                <label className={` pointer-events-none transition-transform duration-500 ease-in-out  translate-x-2 ${signUpFormData['sup_confirm_password'] === ''? 'translate-y-8': 'translate-y-0'} group-focus-within:translate-y-0`} htmlFor="sup_confirm_password">Confirm Password</label>
                                <input  id="sup_confirm_password" 
                                        className="border-b-2 p-2 focus:border-b-primary focus:outline-0 mb-6" type="password" value={signUpFormData['sup_confirm_password']} onChange={handleSignUpForm}/>
                            </div>
                        </div>

                        <button disabled={disableSignUpButton} 
                                className={`w-full  py-2 ${disableSignUpButton?'bg-zinc-500 cursor-not-allowed':'bg-primary cursor-pointer'} rounded-md my-8 font-semibold shadow-md`}
                                onClick={(e)=> initiateSignUp(e)}>
                                    Sign Up
                        </button>
                    </form>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Login;