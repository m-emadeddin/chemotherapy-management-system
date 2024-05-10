import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem("isLoggedIn") === "true";
    });
    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem("user")) || null;
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token") || null;
    });

    useEffect(() => {
        localStorage.setItem("token", token);
    }, [token])

    useEffect(() => {
        localStorage.setItem("isLoggedIn", isLoggedIn);
    }, [isLoggedIn]);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    const login = async (username, password) => {
        try {
            const response = await axios.post("/users/signin", {
                identifier: username,
                password: password,
            });
            if (!response.status) {
                throw new Error("Invalid username or password");
            }
            const data = await response.data;
            //console.log("userToken: " + data.token);
            const token = data.token;
            const userResponse = await axios.get("/users/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!userResponse.status) {
                throw new Error("Failed to fetch user information");
            }
            const userData = await userResponse.data;
            setUser(userData.user);
            setIsLoggedIn(true);
            setToken(token);
        } catch (error) {
            setIsLoggedIn(false);
            setToken(null);
            setUser(null);
            console.log(error.message);
        }
    };

    const logout = async () => {
        try {
            const response = await axios.post("/users/logout", null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.status === 200) {
                setIsLoggedIn(false);
                setUser(null);
                setToken(null);
                localStorage.removeItem("token");
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("user");
                console.log("Logged out successfully.");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const authValues = {
        isLoggedIn,
        user,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
