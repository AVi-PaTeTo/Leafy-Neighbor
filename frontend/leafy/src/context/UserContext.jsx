import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"
import { getUser } from "../api/ApiFunctions";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('current_user');
    return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        const initializeUser = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                    try{
                        const decodedToken = jwtDecode(token);
                        if (decodedToken.exp * 1000 < Date.now()) {
                            console.log('Token expired');
                            setUser(null);
                            localStorage.removeItem('access_token');
                            localStorage.removeItem('refresh_token');
                            localStorage.removeItem('current_user');
                            return;
                            }
                            
                        const response = await getUser(decodedToken.user_id);
                        const userData = response.data;

                        const userWithDefaults = {
                            ...userData,
                            pfp: userData.pfp && userData.pfp.trim() !== ""
                                ? userData.pfp
                                : "https://i.pinimg.com/736x/2b/72/16/2b7216ec94eaed014688f94bb898c81d.jpg",
                        };

                            setUser(userWithDefaults);
                        } catch (err) {
                            console.error('Invalid Token:', err);
                            setUser(null);
                            localStorage.removeItem('access_token');
                            localStorage.removeItem('refresh_token');
                            localStorage.removeItem('current_user');
                        }       
                    }
                };

            initializeUser();
        }, []);


    useEffect(() => {
        if (user) {
        localStorage.setItem('current_user', JSON.stringify(user));
        } else {
        localStorage.removeItem('current_user');
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
        {children}
        </UserContext.Provider>
  );
};


export const useUser = () => useContext(UserContext);