const { createContext, useContext, useEffect, useState } = require("react");

const VerifyTokenContext = createContext();

export const VerifyTokenProvider = ({ childen }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem("isLoggedIn") === "true";
    });

    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem("user")) || null;
    });

    useEffect(() => {
        localStorage.setItem("isLoggedIn", isLoggedIn);
    }, [isLoggedIn]);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    const verifyToken = async (token) => {
        try {
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
        }
    }

    const verifyTokenValues = {
        user,
        isLoggedIn,
        verifyToken,
    }

    return (<VerifyTokenContext.Provider value={verifyTokenValues}>{childen}</VerifyTokenContext.Provider>);
}

export const useVerifyToken = () => useContext(VerifyTokenContext);

export default VerifyTokenContext;