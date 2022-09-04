import React from "react";

const FormRow = ({ children, className = "" }) => {
  return (
    <div className={`grid grid-cols-2 gap-10 ${className}`}>{children}</div>
  );
};

export default FormRow;
