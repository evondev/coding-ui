import React, { useEffect, useState } from "react";

const Dropdown = ({
  placeholder = "Select filter",
  show = false,
  onClick = () => {},
  children,
}) => {
  const ref = React.useRef(null);
  const [showDropdown, setShowDropdown] = useState(show);
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <div className="relative w-full">
      <div
        className="w-full p-4 text-base text-white capitalize transition-all border rounded-lg outline-none cursor-pointer bg-slate-900 border-slate-700 h-[55px] flex items-center justify-start"
        onClick={handleToggleDropdown}
        ref={ref}
      >
        {placeholder}
      </div>
      {showDropdown && (
        <div className="absolute left-0 z-50 w-full p-2 mt-2 border rounded-lg shadow-sm bg-slate-900 top-full border-slate-700">
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
