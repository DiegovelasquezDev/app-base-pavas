import { Navigate } from "react-router-dom";
import useAuth from "../utils/hooks/useAuth";

export const PrivateRoutes = ({ children }) => {
  const { auth, loadingAuth } = useAuth();

  if (loadingAuth) return;

  return auth[0]?.id ? children : <Navigate to="/auth/login" />;
};
