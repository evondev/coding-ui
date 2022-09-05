import React from "react";

const Toggle = ({ onChange = () => {}, on = false, name = "status" }) => {
  return (
    <label className="cursor-pointer">
      <input
        type="checkbox"
        name={name}
        onChange={onChange}
        id=""
        className="hidden"
      />
      <span
        className={`transition-all rounded-full w-[100px] p-2 inline-block h-12 ${
          on ? "bg-third" : "bg-slate-800"
        }`}
      >
        <span
          className={`transition-all inline-block w-8 h-8 bg-white rounded-full ${
            on ? "translate-x-[52px]" : ""
          }`}
        ></span>
      </span>
    </label>
  );
};

export default Toggle;
