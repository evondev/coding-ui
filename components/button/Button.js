import React from "react";
import PropTypes from "prop-types";

const Button = ({ children, className = "", type = "button", ...rest }) => {
  const child = rest.isLoading ? (
    <div className="w-10 h-10 border-4 rounded-full border-white-500 animate-spin border-t-transparent"></div>
  ) : (
    children
  );
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-third rounded-lg h-[55px] disabled:cursor-not-allowed ${className}`}
      disabled={rest.isLoading}
      {...rest}
    >
      {child}
    </button>
  );
};
Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default Button;
