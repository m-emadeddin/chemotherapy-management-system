import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect, useState } from "react";

const CheckLoggedIn = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const handleChecking = async () => {
      try {
        console.log(`auth.userToken: ${auth.userToken}`);
        if (!auth.userToken) {
          throw new Error("No user token found.");
        }

        const response = await fetch("/users/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${auth.userToken}`,
          },
        });
        console.log(response);
        if (!response.ok) {
          auth.logout();
          throw new Error("Token was revoked, user logged out.");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setChecking(false);
      }
    };

    handleChecking();
  }, [auth.userToken, auth.logout, auth, location.pathname]);

  if (checking) {
    return <div>Loading...</div>;
  }

  if (!auth.userToken) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default CheckLoggedIn;
