import Link from "next/link";
import React from "react";

const ButtonNew = ({ href = "/" }) => {
  return (
    <Link href={href}>
      <a className="fixed flex items-center justify-center p-1 text-white rounded-full bg-third w-14 h-14 bottom-5 right-5">
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
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </a>
    </Link>
  );
};

export default ButtonNew;
