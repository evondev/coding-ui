import React from "react";
import PropTypes from "prop-types";
import useDarkMode from "hooks/useDarkMode";

const ToggleDarkMode = (props) => {
  const [darkMode, setDarkMode] = useDarkMode();
  return (
    <label className="flex items-center cursor-pointer select-none gap-x-3">
      <div
        className={`flex items-center justify-center rounded-full cursor-pointer w-14 h-14 gap-x-3 ${
          darkMode ? "bg-slate-800 text-white" : "bg-white text-yellow-500"
        }`}
      >
        <input
          type="checkbox"
          checked={darkMode}
          className="hidden"
          onChange={() => {}}
          onClick={() => setDarkMode(!darkMode)}
        />
        {darkMode ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        )}
      </div>
      <span className="text-white">{darkMode ? "DarkMode" : "LightMode"}</span>
    </label>
  );
};

ToggleDarkMode.propTypes = {
  on: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

export default ToggleDarkMode;
