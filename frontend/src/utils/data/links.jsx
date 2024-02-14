import React from "react";
import { FaCalendar } from "react-icons/fa6";
import { FiGrid, FiUser } from "react-icons/fi";

export const links = [
  {
    title: "Pages",
    links: [
      {
        path: "home",
        name: "Home",
        icon: <FiGrid />,
      },
      {
        path: "users",
        name: "Usuarios",
        icon: <FiUser />,
      },
      // {
      //   path: "calendar",
      //   name: "Calendario",
      //   icon: <FaCalendar />,
      // },
    ],
  },
];
