import React from "react";

const ButtonAction = (props) => {
  const { onClick = () => null, className = "", children } = props;
  return (
    <button
      className={`flex items-center justify-center w-10 h-10 border rounded-lg border-slate-600 text-slate-600  ${className}`}
      onClick={onClick}
    >
      <span className="pointer-events-none">{children}</span>
    </button>
  );
};

export default ButtonAction;
