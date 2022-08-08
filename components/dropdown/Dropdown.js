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
        className="w-full p-4 text-base text-white capitalize transition-all bg-white border border-transparent rounded-lg outline-none cursor-pointer dark:bg-slate-900 border-slate-200 dark:border-slate-700"
        onClick={onClick}
      >
        {placeholder}
      </div>
      {show && (
        <div className="absolute left-0 w-full p-2 mt-2 border rounded-lg shadow bg-slate-900 top-full border-slate-200 dark:border-slate-700">
          {/*  */}
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
