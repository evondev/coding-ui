import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const IconBack = (
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
);
const PageNotFound = () => {
  const router = useRouter();
  const goBack = () => {
    router.push("/login");
  };
  return (
    <div className="flex items-center justify-center w-full h-[90vh] relative">
      <Head>
        <title>Oops! Page not found</title>
      </Head>
      <button
        className="absolute z-10 flex items-center justify-center p-3 text-white rounded-lg cursor-pointer bg-gradient-primary top-5 left-5 gap-x-2"
        onClick={goBack}
      >
        {IconBack}
        Go back
      </button>
      <img src="/404.png" alt="page-not-found" />
    </div>
  );
};

export default PageNotFound;
