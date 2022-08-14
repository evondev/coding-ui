import React from "react";

const FormGroup = ({ children, className = "" }) => {
  return (
    <div
      className={`flex flex-col items-start flex-1 mb-10 gap-y-3 ${className}`}
    >
      {children}
    </div>
  );
};

export default FormGroup;
