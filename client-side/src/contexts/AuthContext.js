import React, { createContext, useState, useContext, useEffect } from "react";

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
    }, [userToken])

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
            setIsLoggedIn(true);
        } catch (error) {
            setIsLoggedIn(false);
            setUserToken(null);
            setUser(null);
            console.log(error.message);
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
                console.log("Logged out successfully.");
            }
        } catch (error) {
            console.log(error.message);
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
        <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
