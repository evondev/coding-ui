import Link from "next/link";
import React from "react";
import { IconChat, IconGithub } from "./icons";

const Banner = () => {
  return (
    <div className="py-20">
      <div className="flex items-center justify-center w-20 h-20 mx-auto mb-5 border border-blue-500 bg-opacity-10">
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
            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
          />
        </svg>
      </div>
      <h1 className="max-w-xl mx-auto mb-10 text-4xl font-bold leading-relaxed text-center text-slate-900 dark:text-white">
        Get your free UI components with just few click
      </h1>
      <div className="flex flex-col justify-center gap-5 sm:items-center sm:flex-row">
        <a
          href="https://github.com/evondev/coding-ui"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-x-3 px-8 py-4 font-sans font-semibold tracking-wide text-white bg-slate-800 rounded-lg h-[60px] w-full sm:w-[230px]"
        >
          <IconGithub></IconGithub>
          View on Github
        </a>
        <a
          href="https://evondev.com"
          target="_blank"
          className="inline-flex items-center justify-center gap-x-3 px-8 py-4 font-sans font-semibold tracking-wide text-white bg-pink-500 rounded-lg h-[60px] w-full sm:w-[230px]"
          rel="noreferrer"
        >
          <IconChat></IconChat>
          <span>Contact me</span>
        </a>
      </div>
    </div>
  );
};

export default Banner;
