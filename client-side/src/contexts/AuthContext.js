import React, { createContext, useState, useContext, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem("isLoggedIn") === "true";
    });
    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem("user")) || null;
    });

    const [userToken, setUserToken] = useState(() => {
        return localStorage.getItem("userToken") || null;
    });

    useEffect(() => {
        localStorage.setItem("isLoggedIn", isLoggedIn);
    }, [isLoggedIn]);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        localStorage.setItem("userToken", userToken);
    }, [userToken]);

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
            setIsLoggedIn(true);
            const data = await response.json();
            const token = data.token;
            console.log(`userToken: ${token}`)
            setUserToken(token);
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
            toast.success("Logged in successfully!", { duration: 1000 });
        } catch (error) {
            setIsLoggedIn(false);
            setUserToken(null);
            setUser(null);
            toast.error(error.message);
        }
    };

    const logout = async () => {
        try {
            const response = await fetch("/users/logout", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });

            if (response.ok) {
                setIsLoggedIn(false);
                setUser(null);
                setUserToken(null);
                localStorage.removeItem("userToken");
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("user");
                toast.success("Logged out successfully!");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const authValues = {
        isLoggedIn,
        userToken,
        user,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={authValues}>
            {children}
            <Toaster />
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
