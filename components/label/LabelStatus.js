import React from "react";

const LabelStatus = ({ children, className = "bg-green-500" }) => {
  return (
    <span
      className={`inline-block px-4 py-2 rounded-full text-white ${className}`}
    >
      {children}
    </span>
  );
};

export default LabelStatus;
