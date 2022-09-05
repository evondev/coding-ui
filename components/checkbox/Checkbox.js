import React from "react";
import classNames from "utils/classNames";

const Checkbox = ({ checked = false, onClick = () => {} }) => {
  return (
    <label
      className={classNames(
        "flex items-center justify-center w-8 h-8 p-1 border rounded-lg border-slate-700",
        checked ? "text-white bg-third" : "text-transparent"
      )}
      onClick={onClick}
    >
      <input
        type="checkbox"
        name=""
        id=""
        className="hidden"
        onChange={() => {}}
        checked={checked}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  );
};

export default Checkbox;
