import Head from "next/head";
import React, { useState } from "react";
import Sidebar from "./Sidebar";

const LayoutDashboard = ({ children, heading = "" }) => {
  return (
    <div className="min-h-screen grid grid-cols-[300px,minmax(0,1fr)]">
      <Head>
        <title>CodingUI - {heading}</title>
      </Head>
      <Sidebar></Sidebar>
      <div className="p-10" aria-label="main">
        <h1 className="inline-flex items-center text-3xl font-bold dark:text-white gap-x-3">
          <div className="w-10 h-1 bg-blue-500"></div>
          <span>{heading}</span>
        </h1>
        {children}
      </div>
    </div>
  );
};

export default LayoutDashboard;
