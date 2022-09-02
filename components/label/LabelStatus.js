import React from "react";

const LabelStatus = ({ children, className = "bg-green-500", ...rest }) => {
  return (
    <span
      className={`cursor-pointer inline-block px-4 py-2 rounded-full text-white ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
};

export default LabelStatus;
