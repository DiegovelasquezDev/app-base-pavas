import React from "react";

import {
  NavbarComponent,
  SidebarComponent,
  FooterComponent,
} from "../../components";

import { Outlet } from "react-router-dom";

import { useStateContext } from "../../contexts/ContextProvider";

function Layout() {
  const { activeMenu, currentMode } = useStateContext();

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-[#0614E] bg-[#F5F7D8]">
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-gray-800 bg-white">
            <SidebarComponent />
          </div>
        ) : (
          <div className="w-0 dark:bg-gray-800 bg-white">
            <SidebarComponent />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "dark:bg-gray-900  bg-main-bg min-h-screen md:ml-72 w-full"
              : "bg-main-bg dark:bg-gray-900  w-full min-h-screen flex-2"
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-gray-900 navbar w-full">
            <NavbarComponent />
          </div>
          <Outlet />
          <FooterComponent />
        </div>
      </div>
    </div>
  );
}

export default Layout;
