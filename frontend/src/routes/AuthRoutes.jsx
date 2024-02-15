import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Login } from "../pages";

export const AuthRoutes = () => (
  <Routes>
    <Route path="login" element={<Login />} />
    <Route exact path="/*" element={<Navigate to="/auth/login" />} />
  </Routes>
);
