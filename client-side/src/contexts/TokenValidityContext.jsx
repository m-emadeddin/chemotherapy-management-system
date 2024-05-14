import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const TokenValidityContext = createContext();

export const TokenValidityProvider = ({ children }) => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [isValidToken, setIsValidToken] = useState(true);

    useEffect(() => {
        const checkTokenValidity = async () => {
            try {
                const response = await fetch("/users/user", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${auth.userToken}`,
                    },
                });
                // console.log(`Token Checked!, UserToken: ${auth.userToken}`);
                if (!response.ok) {
                    const errorData = await response.json();
                    console.log(errorData.error);
                    if (errorData.error !== 'undefined') {
                        auth.logout(() => {
                            navigate("/login");
                        });
                        setIsValidToken(false);
                    }
                } else {
                    setIsValidToken(true);
                }
            } catch (error) {
                console.error("Error checking token validity:", error);
            }
        };

        const tokenValidityInterval = setInterval(checkTokenValidity, 5000);

        return () => clearInterval(tokenValidityInterval);
    }, [auth.userToken, auth.logout, navigate]);

    return (
        <TokenValidityContext.Provider value={{ isValidToken }}>
            {children}
        </TokenValidityContext.Provider>
    );
};

export const useTokenValidity = () => {
    return useContext(TokenValidityContext);
};

export default TokenValidityContext;
