import React from "react";
import { Outlet } from "react-router-dom";
import {
  NavbarComponent,
  SidebarComponent,
  FooterComponent,
} from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";

function Layout() {
  const { activeMenu, currentMode } = useStateContext();

  const sidebarStyle = activeMenu
    ? "w-72 fixed sidebar dark:bg-gray-800 bg-white"
    : "w-0 dark:bg-gray-800 bg-white";

  const mainContentStyle = activeMenu
    ? "dark:bg-gray-900 bg-main-bg min-h-screen md:ml-72 w-full"
    : "bg-main-bg dark:bg-gray-900 w-full min-h-screen flex-2";

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-[#0614E] bg-[#F5F7D8]">
        <div className={sidebarStyle}>
          <SidebarComponent />
        </div>
        <div className={mainContentStyle}>
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
