import React from "react";

const Button = ({ children, className = "", type = "button", ...rest }) => {
  return (
    <button
      type="type"
      className={`inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px] ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
