import { useAuth } from "contexts/auth-context";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import PageNotFound from "pages/404";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

const LayoutDashboard = ({
  children,
  heading = "",
  hasPermission = false,
  back = "",
}) => {
  const { userInfo, loading } = useAuth();

  if (loading) return null;
  if (!userInfo?.email || !hasPermission) return <PageNotFound></PageNotFound>;
  return (
    <div className="min-h-screen block lg:grid lg:grid-cols-[300px,minmax(0,1fr)]">
      <Head>
        <title>CodingUI - {heading}</title>
      </Head>
      <Sidebar></Sidebar>
      <div className="relative p-5 lg:p-10" aria-label="main">
        <div className="flex flex-col items-start gap-5 mb-10">
          {back && <GoBack back={back} />}
          <h1 className="inline-flex items-center text-3xl font-bold text-white gap-x-3">
            <span>{heading}</span>
          </h1>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default LayoutDashboard;

function GoBack({ back }) {
  return (
    <Link href={back}>
      <a className="flex items-center gap-x-2 text-slate-400">
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
            d="M7 16l-4-4m0 0l4-4m-4 4h18"
          />
        </svg>
        <span>Back</span>
      </a>
    </Link>
  );
}
