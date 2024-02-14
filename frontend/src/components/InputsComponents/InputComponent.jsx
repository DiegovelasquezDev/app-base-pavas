import React, { useState } from "react";

export default function InputComponent({
  id,
  type,
  name,
  label,
  value,
  onChange,
  placeholder,
  required,
}) {
  const [status, setStatus] = useState("normal");
  const [message, setMessage] = useState("");
  const [inputStatus, setInputStatus] = useState(status);

  const inputStyles = (inputStatus) => {
    if (inputStatus === "success") {
      return "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500";
    } else if (inputStatus === "error") {
      return "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";
    } else {
      return "bg-gray-100 border border-gray-500 text-gray-900 placeholder-gray-500 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:text-white";
    }
  };

  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className={`block mb-2 text-sm font-medium ${
          inputStatus === "success"
            ? "text-green-700 dark:text-green-500"
            : inputStatus === "error"
            ? "text-red-700 dark:text-red-500"
            : "text-gray-700 dark:text-gray-300"
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={inputStyles(inputStatus)}
        placeholder={placeholder}
        required={required}
      />
      <p
        className={`mt-2 text-sm ${
          inputStatus === "success"
            ? "text-green-600 dark:text-green-500"
            : inputStatus === "error"
            ? "text-red-600 dark:text-red-500"
            : "text-gray-700 dark:text-gray-300"
        }`}
      >
        {inputStatus === "success" ? (
          <span className="font-medium">Well done!</span>
        ) : inputStatus === "error" ? (
          <span className="font-medium">Oh, snap!</span>
        ) : (
          ""
        )}{" "}
        {message}
      </p>
    </div>
  );
}
