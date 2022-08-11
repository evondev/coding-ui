import React from "react";

const Heart = () => {
  return (
    <div className="fixed flex items-center justify-center text-pink-500 bg-black bg-opacity-50 rounded-full cursor-pointer w-14 h-14 bottom-5 right-5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default Heart;
