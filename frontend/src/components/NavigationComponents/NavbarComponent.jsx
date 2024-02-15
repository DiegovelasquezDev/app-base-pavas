import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";

import avatar from "../../utils/img/profile.png";
import { NotificationComponent, UserProfileComponent } from "../";
import { useStateContext } from "../../contexts/ContextProvider";
import getGreetings from "../../utils/functions/getGreetings";
import useAuth from "../../utils/hooks/useAuth";

const NavButton = ({ customFunc, icon, color, dotColor }) => (
  <button
    type="button"
    onClick={() => customFunc()}
    className={`relative text-xl rounded-xl p-3 hover:bg-light-gray mr-1 dark:bg-gray-800 dark:hover:bg-gray-900 ${color ? `text-${color}` : ""}`}
  >
    <span
      style={{ background: dotColor }}
      className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2 shadow-dot"
    />
    {icon}
  </button>
);

export default function NavbarComponent() {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();
  const { auth } = useAuth();

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    function updateGreeting() {
      setGreeting(getGreetings());
    }
    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <nav className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={"text-black dark:text-white"}
        icon={<AiOutlineMenu />}
      />
      <div className="flex items-center gap-2">
        <div onClick={() => handleClick("notification")} className="text-black dark:text-white cursor-pointer">
          <RiNotification3Line className={`text-xl ${currentColor ? `text-${currentColor}` : ""}`} />
        </div>
        <div
          className={`flex items-center gap-2 cursor-pointer p-1 ml-2 hover:bg-light-gray dark:hover:bg-gray-800 rounded-lg`}
          onClick={() => handleClick("userProfile")}
        >
          <img
            className="rounded-full w-8 h-8"
            src={avatar}
            alt="user-profile"
          />
          <p>
            <span className="text-gray-400 text-sm">{greeting},</span>{" "}
            <span className="text-gray-400 font-bold ml-1 text-sm">
              {auth[0]?.id ? auth[0].firstName + " " + auth[0].lastName : ""}
            </span>
          </p>
          <MdKeyboardArrowDown className="text-gray-400 text-sm" />
        </div>

        {isClicked.userProfile && <UserProfileComponent />}
        {isClicked.notification && <NotificationComponent />}
      </div>
    </nav>
  );
}
