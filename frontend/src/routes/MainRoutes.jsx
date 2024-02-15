import React from "react";
import { Route, Routes } from "react-router-dom";

import { Layout, Home, Users, EditData, Profile, Calendar } from "../pages";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<Users />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/editData" element={<EditData />} />
        <Route path="/*" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
};
