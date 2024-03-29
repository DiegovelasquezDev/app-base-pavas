import React from "react";
import { useStateContext } from "../../contexts/ContextProvider";

export default function ButtonComponent({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  width,
  customFunction,
}) {
  const { setIsClicked, initialState } = useStateContext();

  return (
    <button
      type="button"
      onClick={() => setIsClicked(initialState)}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
}
