import Head from "next/head";
import Link from "next/link";
import React from "react";

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center w-full h-[90vh] relative">
      <Head>
        <title>Oops! Page not found</title>
      </Head>
      <Link href="/">
        <a className="absolute z-10 flex items-center justify-center p-4 text-white bg-blue-500 rounded-lg cursor-pointer top-5 left-5 gap-x-3">
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to home
        </a>
      </Link>
      <img src="/404.png" alt="page-not-found" />
    </div>
  );
};

export default PageNotFound;
