import React from "react";
import { HeaderComponent } from "..";

export default function WrapperComponent({ category, title, children }) {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10  dark:text-gray-200 animate__animated animate__fadeIn">
      <HeaderComponent category={category} title={title} />
      {children}
    </div>
  );
}
