import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { AuthRoutes } from "./AuthRoutes";
import { MainRoutes } from "./MainRoutes";
import useAuth from "../utils/hooks/useAuth";

import { Error } from "../pages";
import { useEffect } from "react";

export const AppRouter = () => {
  const { auth, loadingAuth } = useAuth();

  useEffect(() => {}, [auth]);

  if (loadingAuth) return;

  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route
        path="/*"
        element={
          <PrivateRoutes>
            <MainRoutes />
          </PrivateRoutes>
        }
      />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};
