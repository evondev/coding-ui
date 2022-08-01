import React from "react";

const Input = (props) => {
  const { type = "text", ...rest } = props;
  return (
    <input
      type={type}
      className="w-full p-4 text-base text-white transition-all bg-white border border-transparent rounded-lg outline-none dark:bg-slate-900 focus:border-blue-500 border-slate-200 dark:border-slate-700"
      {...rest}
    ></input>
  );
};

export default Input;
