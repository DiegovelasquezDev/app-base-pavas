import { Navigate } from "react-router-dom";
import useAuth from "../utils/hooks/useAuth";

import { LoaderComponent } from "../components";

export const PrivateRoutes = ({ children }) => {
  const { auth, loadingAuth } = useAuth();

  if (loadingAuth) return <LoaderComponent />

  const isAuthenticated = !!auth[0]?.id;
  return isAuthenticated ? children : <Navigate to="/auth/login" />;
};
