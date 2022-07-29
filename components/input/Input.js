import React from "react";

const Input = (props) => {
  const { type = "text", ...rest } = props;
  return (
    <input
      type={type}
      className="w-full p-4 text-base text-white transition-all border border-transparent rounded-lg outline-none bg-slate-900 focus:border-blue-500"
      {...rest}
    ></input>
  );
};

export default Input;
