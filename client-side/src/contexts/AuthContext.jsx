import React, { createContext, useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    });
    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem('user')) || null;
    });

    useEffect(() => {
        localStorage.setItem('isLoggedIn', isLoggedIn);
    }, [isLoggedIn]);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    const login = async (username, password) => {
        try {
            const response = await fetch("/users/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    identifier: username,
                    password: password,
                }),
            });
            if (!response.ok) {
                throw new Error("Invalid username or password");
            }
            const data = await response.json();
            console.log("userToken: " + data.token);
            const token = data.token;
            const userResponse = await fetch("/users/user", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!userResponse.ok) {
                throw new Error("Failed to fetch user information");
            }
            const userData = await userResponse.json();
            setUser(userData.user);
            setIsLoggedIn(true);

        } catch (error) {
            setIsLoggedIn(false);
            setUser(null);
            console.log(error.message);
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        console.log('Logged out successfully.');
    };

    const authValues = {
        isLoggedIn,
        user,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={authValues}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
