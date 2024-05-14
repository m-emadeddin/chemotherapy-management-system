import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RequireAuth = ({ children }) => {
  const auth = useAuth();
  if (!auth.isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default RequireAuth;
