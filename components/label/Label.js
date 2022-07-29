import React from "react";

const Label = ({ children }) => {
  return (
    <label className="text-base font-semibold cursor-pointer">{children}</label>
  );
};

export default Label;
