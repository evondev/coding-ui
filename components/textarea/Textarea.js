import React from "react";

const Textarea = (props) => {
  const { name, ...rest } = props;
  return (
    <textarea
      name={name}
      className="font-normal w-full p-4 text-base text-white transition-all border border-transparent rounded-lg outline-none bg-slate-900 focus:border-blue-500 resize-none min-h-[200px] overflow-y-auto font-mono"
      {...rest}
    ></textarea>
  );
};

export default Textarea;
