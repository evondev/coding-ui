import React from "react";

const Label = ({ children, className = "" }) => {
  return (
    <label
      className={`text-base font-semibold cursor-pointer inline-block ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
