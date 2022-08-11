import Link from "next/link";
import React from "react";
import { IconChat, IconGithub } from "./icons";

const Banner = () => {
  return (
    <div className="py-20 select-none">
      <div className="flex items-center justify-center w-20 h-20 mx-auto mb-5 border-4 border-blue-500 bg-opacity-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 pointer-effect"
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
      <div className="flex flex-col justify-center gap-5 mb-10 sm:items-center sm:flex-row">
        <a
          href="https://github.com/evondev/coding-ui"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-x-3 px-8 py-4 font-sans font-semibold tracking-wide text-white bg-slate-800 rounded-lg h-[60px] w-full sm:w-[230px] button-effect"
        >
          <IconGithub></IconGithub>
          View on Github
        </a>
        <a
          href="https://fb.com/tuan.trananh.0509"
          target="_blank"
          className="inline-flex items-center justify-center gap-x-3 px-8 py-4 font-sans font-semibold tracking-wide text-white bg-gradient-secondary rounded-lg h-[60px] w-full sm:w-[230px] button-effect"
          rel="noreferrer"
        >
          <IconChat></IconChat>
          <span>Contact me</span>
        </a>
      </div>
      <div className="flex items-center justify-center gap-x-5">
        <SocialIcon href="https://www.facebook.com/evondevblog">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16ZM16 8C20.4 8 24 11.6 24 16C24 20 21.1 23.4 17.1 24V18.3H19L19.4 16H17.2V14.5C17.2 13.9 17.5 13.3 18.5 13.3H19.5V11.3C19.5 11.3 18.6 11.1 17.7 11.1C15.9 11.1 14.7 12.2 14.7 14.2V16H12.7V18.3H14.7V23.9C10.9 23.3 8 20 8 16C8 11.6 11.6 8 16 8Z"
              fill="white"
            />
          </svg>
        </SocialIcon>
        <SocialIcon href="https://www.youtube.com/c/evondevfrontend">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.6 16L14.4 13.6V18.4L18.6 16Z" fill="white" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16ZM22.2 10.7C22.9 10.9 23.4 11.4 23.6 12.1C24 13.4 24 16 24 16C24 16 24 18.6 23.7 19.9C23.5 20.6 23 21.1 22.3 21.3C21 21.6 16 21.6 16 21.6C16 21.6 10.9 21.6 9.7 21.3C9 21.1 8.5 20.6 8.3 19.9C8 18.6 8 16 8 16C8 16 8 13.4 8.2 12.1C8.4 11.4 8.90001 10.9 9.60001 10.7C10.9 10.4 15.9 10.4 15.9 10.4C15.9 10.4 21 10.4 22.2 10.7Z"
              fill="white"
            />
          </svg>
        </SocialIcon>
        <SocialIcon href="https://www.tiktok.com/@evon.dev">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 0C7.16345 0 0 7.16344 0 16C0 24.8366 7.16345 32 16 32C24.8365 32 32 24.8366 32 16C32 7.16344 24.8365 0 16 0ZM19.1182 8C19.1182 8.23775 19.1404 8.4719 19.1813 8.69851C19.3781 9.74606 19.998 10.645 20.8592 11.2059C21.4605 11.5997 22.1732 11.8263 22.9415 11.8263L22.9413 12.4393V14.5753C21.516 14.5753 20.1946 14.1184 19.1182 13.3457V18.9366C19.1182 21.7265 16.8466 24 14.0591 24C12.9827 24 11.9805 23.6581 11.1602 23.0824C9.85367 22.1648 9 20.6491 9 18.9366C9 16.143 11.2679 13.8732 14.0554 13.8769C14.2892 13.8769 14.5157 13.8955 14.7384 13.9252V14.5753L14.7302 14.5792L14.7383 14.579V16.7337C14.5231 16.6668 14.2929 16.6259 14.0554 16.6259C12.7823 16.6259 11.7467 17.6624 11.7467 18.9366C11.7467 19.8245 12.2515 20.5934 12.9864 20.9835C12.9933 20.9929 13.0002 21.0023 13.0072 21.0116L13.0195 21.0278C13.0111 21.0115 13.0013 20.9955 12.9901 20.9798C13.313 21.1507 13.6768 21.2473 14.0628 21.2473C15.3062 21.2473 16.3233 20.2554 16.3678 19.0221L16.3715 8H19.1182Z"
              fill="white"
            />
          </svg>
        </SocialIcon>
        <SocialIcon href="https://evondev.com">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0ZM19.2078 12.3782C18.3787 11.5855 17.3241 11.1818 16.1496 11.1818C14.066 11.1818 12.3026 12.589 11.6735 14.48C11.5135 14.96 11.4226 15.4727 11.4226 16C11.4226 16.5272 11.5132 17.04 11.6732 17.52C12.3023 19.4109 14.066 20.8181 16.1496 20.8181C17.226 20.8181 18.1426 20.5346 18.859 20.0546C19.7063 19.4873 20.2699 18.64 20.4554 17.64H16.1499V14.5455H23.6845C23.779 15.0691 23.8299 15.6146 23.8299 16.1818C23.8299 18.6182 22.9572 20.6691 21.4445 22.0619C20.1208 23.2837 18.3096 24 16.1496 24C13.0223 24 10.3169 22.2072 9.00049 19.5927C8.45867 18.5127 8.1499 17.2909 8.1499 16C8.1499 14.709 8.45899 13.4872 9.00081 12.4072C10.3172 9.79268 13.0223 8 16.1496 8C18.306 8 20.1169 8.79273 21.5023 10.0836L19.2078 12.3782Z"
              fill="white"
            />
          </svg>
        </SocialIcon>
      </div>
    </div>
  );
};

function SocialIcon({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-center p-1 rounded-full w-11 h-11 dark:bg-slate-700 bg-slate-300"
    >
      {children}
    </a>
  );
}

export default Banner;
