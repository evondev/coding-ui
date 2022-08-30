import { useAuth } from "contexts/auth-context";
import Head from "next/head";
import { useRouter } from "next/router";
import PageNotFound from "pages/404";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

const LayoutDashboard = ({ children, heading = "" }) => {
  const { userInfo, loading } = useAuth();
  // const router = useRouter();
  // useEffect(() => {
  //   if (!userInfo?.email) router.push("/login");
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userInfo]);
  if (loading) return null;
  if (!userInfo?.email) return <PageNotFound></PageNotFound>;
  return (
    <div className="min-h-screen grid lg:grid-cols-[300px,minmax(0,1fr)]">
      <Head>
        <title>CodingUI - {heading}</title>
      </Head>
      <Sidebar></Sidebar>
      <div className="relative p-10" aria-label="main">
        <h1 className="inline-flex items-center mb-10 text-3xl font-bold text-white gap-x-3">
          <div className="w-10 h-1 bg-blue-500"></div>
          <span>{heading}</span>
        </h1>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default LayoutDashboard;
