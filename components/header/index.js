import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="sticky top-0 z-30 h-[72px] bg-gray-900 bg-opacity-50 backdrop-blur backdrop-filter  firefox:bg-opacity-90">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex items-center justify-between border-b border-gray-800 px-4 py-5 sm:px-6 lg:px-8 xl:px-0">
          <Link href="/">
            <a className="flex items-center gap-x-2 text-lg font-bold text-white">
              <img
                src="/logo.png"
                alt="codingui"
                className="block max-w-[20px]"
              />
              <span>CodingUI</span>
            </a>
          </Link>
          <a href="#" className="text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
