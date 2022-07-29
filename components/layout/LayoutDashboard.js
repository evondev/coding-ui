import React, { useState } from "react";
import Sidebar from "./Sidebar";

const LayoutDashboard = ({ children }) => {
  return (
    <div className="min-h-screen grid grid-cols-[300px,minmax(0,1fr)]">
      <Sidebar></Sidebar>
      <div className="p-10" aria-label="main">
        {children}
      </div>
    </div>
  );
};

export default LayoutDashboard;
