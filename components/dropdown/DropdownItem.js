import React from "react";

const DropdownItem = ({ children, onClick = (v) => {} }) => {
  return (
    <div
      className="p-3 capitalize rounded cursor-pointer hover:text-blue-500 hover:bg-slate-800"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default DropdownItem;
