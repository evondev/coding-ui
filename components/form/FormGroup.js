import React from "react";

const FormGroup = ({ children }) => {
  return (
    <div className="flex flex-col items-start flex-1 mb-5 gap-y-3">
      {children}
    </div>
  );
};

export default FormGroup;
