import React from "react";
import classNames from "utils/classNames";

const Input = (props) => {
  const { type = "text", className = "", ...rest } = props;
  const [inputType, setInputType] = React.useState(type);
  function togglePassword() {
    setInputType(inputType === "password" ? "text" : "password");
  }
  return (
    <div className="relative w-full">
      <input
        autoComplete="off"
        type={inputType}
        className={classNames(
          "w-full p-4 text-base text-white transition-all border rounded-lg outline-none bg-slate-900 focus:border-blue-500 border-slate-700",
          className
        )}
        {...rest}
      ></input>
      {type === "password" && (
        <>
          {inputType === "password" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute w-6 h-6 text-gray-400 transform cursor-pointer right-4 top-2/4 -translate-y-2/4 hover:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={togglePassword}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute w-6 h-6 text-gray-400 transform cursor-pointer right-4 top-2/4 -translate-y-2/4 hover:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={togglePassword}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              />
            </svg>
          )}
        </>
      )}
    </div>
  );
};

export default Input;
