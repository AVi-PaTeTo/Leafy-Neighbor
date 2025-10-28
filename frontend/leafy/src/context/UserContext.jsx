import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"


const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('current_user');
    return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        const initializeUser = () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                    try{
                        const decodedToken = jwtDecode(token);
                        if (decodedToken.exp * 1000 < Date.now()) {
                            console.log('Token expired');
                            setCurrentUser(null);
                            localStorage.removeItem('access_token');
                            localStorage.removeItem('refresh_token');
                            localStorage.removeItem('current_user');
                        return;
                            }
                            setCurrentUser({
                                id: decodedToken.user_id
                                            });
                        } catch (err) {
                            console.error('Invalid Token:', err);
                            setCurrentUser(null);
                            localStorage.removeItem('access_token');
                            localStorage.removeItem('refresh_token');
                            localStorage.removeItem('current_user');
                        }       
                    }
                };

            initializeUser();
        }, []);


    useEffect(() => {
        if (currentUser) {
        localStorage.setItem('current_user', JSON.stringify(currentUser));
        } else {
        localStorage.removeItem('current_user');
        }
    }, [currentUser]);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        {children}
        </UserContext.Provider>
  );
};


export const useUser = () => useContext(UserContext);