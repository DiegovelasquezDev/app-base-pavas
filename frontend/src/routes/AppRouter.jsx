import React from "react";
import { Route, Routes } from "react-router-dom";

import { PrivateRoutes } from "./PrivateRoutes";
import { AuthRoutes } from "./AuthRoutes";
import { MainRoutes } from "./MainRoutes";
import useAuth from "../utils/hooks/useAuth";

import { LoaderComponent } from "../components"
import { Error } from "../pages";

export const AppRouter = () => {
  const { loadingAuth } = useAuth();

  if (loadingAuth) {
    return <LoaderComponent />
  }

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
