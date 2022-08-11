import React from "react";

const Dropdown = ({
  placeholder = "Select filter",
  show = false,
  onClick = () => {},
  children,
}) => {
  return (
    <div className="relative w-full">
      <div
        className="w-full p-4 text-base capitalize transition-all bg-white border border-transparent rounded-lg outline-none cursor-pointer text-slate-900 dark:text-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
        onClick={onClick}
      >
        {placeholder}
      </div>
      {show && (
        <div className="absolute left-0 z-50 w-full p-2 mt-2 bg-white border rounded-lg shadow-sm dark:bg-slate-900 top-full border-slate-200 dark:border-slate-700">
          {/*  */}
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
