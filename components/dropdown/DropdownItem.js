import React from "react";

const DropdownItem = ({ children, onClick = (v) => {} }) => {
  return (
    <div
      className="p-3 capitalize rounded cursor-pointer hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-slate-800"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default DropdownItem;
