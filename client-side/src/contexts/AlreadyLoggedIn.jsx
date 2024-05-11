import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AlreadyLoggedIn = ({ children }) => {
  const auth = useAuth();
  if (auth.isLoggedIn) {
    return <Navigate to="/select_patient" />;
  }
  return children;
};

export default AlreadyLoggedIn;
