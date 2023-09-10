import {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(() => {
        const sessionUser = sessionStorage.getItem('user');
        return sessionUser ? sessionUser : null;
    });

    useEffect(() => {
        const token = sessionStorage.getItem('jwt');
        const username = sessionStorage.getItem('user');

        if (token && username) {
            setCurrentUser({token, username});
        }
    }, []);


    useEffect(() => {
        if (currentUser) {
            sessionStorage.setItem('user', currentUser.username);
            sessionStorage.setItem('jwt', currentUser.token);
        }
    }, [currentUser]);


    const login = async (username, password) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
                username,
                password,
            });
            setCurrentUser({token: res.data.token, username: res.data.username});
            return {success: true};
        } catch (error) {
            console.error("Couldn't log in:", error);
            return {error: 'Failed to log in.'};
        }
    };

    const register = async (username, password) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/register`, {
                username,
                password,
            });
            setCurrentUser({token: res.data.token, username: res.data.username});
            return {success: true};
        } catch (error) {
            console.error("Couldn't register:", error);
            return {error: 'Username already exists.'};
        }
    };


    const logout = () => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('jwt');
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        setCurrentUser,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
