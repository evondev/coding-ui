import { auth } from "components/firebase/firebase-config";
import ToggleDarkMode from "components/ToggleDarkMode";
import { menus } from "constant/global-constant";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Sidebar = () => {
  const handleSignOut = () => {
    signOut(auth).then(() => {
      toast.success("Sign out successfully");
    });
  };
  const router = useRouter();
  const currentRoute = router.pathname;
  return (
    <div
      aria-label="sidebar"
      className="relative hidden p-5 border-r border-slate-800 lg:block"
    >
      <Link href="/">
        <a className="flex items-center justify-start px-4 mt-5 mb-10 text-sm font-bold gap-x-3">
          <img src="/logo.png" alt="codingui" className="max-w-[25px]" />
          <span>CodingUI</span>
        </a>
      </Link>
      <ul className="flex flex-col gap-y-2">
        {menus.map((menu, index) => (
          <li key={menu.title}>
            <Link href={menu.link}>
              <a
                className={`flex items-center px-4 py-3 rounded-lg gap-x-3  hover:text-blue-500 ${
                  currentRoute === menu.link ? "text-blue-500" : ""
                }`}
              >
                <span className="w-5">{menu.icon}</span>
                <span>{menu.title}</span>
              </a>
            </Link>
          </li>
        ))}
        <li>
          <button
            className="flex items-center w-full px-4 py-3 rounded-lg gap-x-3 hover:text-blue-500"
            onClick={handleSignOut}
          >
            <span className="w-5">
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </span>
            <span>Logout</span>
          </button>
        </li>
      </ul>
      <div className="absolute bottom-0 flex items-center w-full pb-5 gap-x-2">
        {/* <ToggleDarkMode
          on={isDarkMode}
          onClick={() => setIsDarkMode(!isDarkMode)}
        ></ToggleDarkMode> */}
      </div>
    </div>
  );
};

export default Sidebar;
