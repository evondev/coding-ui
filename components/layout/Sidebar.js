import React from "react";
import Link from "next/link";
import classNames from "utils/classNames";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { menus } from "constant/global-constant";
import { auth } from "components/firebase/firebase-config";

const Sidebar = () => {
  return (
    <div
      aria-label="sidebar"
      className="relative hidden p-5 border-r border-slate-800 lg:block"
    >
      <Logo />
      <ul className="flex flex-col gap-y-2">
        {menus.map((item, index) => (
          <MenuItem key={index} menu={item}></MenuItem>
        ))}
      </ul>
      <ButtonLogout></ButtonLogout>
    </div>
  );
};
function ButtonLogout() {
  const handleSignOut = () => {
    signOut(auth).then(() => {
      toast.success("Sign out successfully");
    });
  };
  const IconLogout = (
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
  );
  return (
    <div className="absolute bottom-0 flex items-center w-full pb-5 gap-x-2">
      <button
        className="flex items-center px-4 py-3 bg-gray-800 rounded-lg gap-x-3 font-secondary"
        onClick={handleSignOut}
      >
        <span className="w-5">{IconLogout}</span>
        <span>Logout</span>
      </button>
    </div>
  );
}
function MenuItem({ menu }) {
  const router = useRouter();
  const currentRoute = router.pathname;
  return (
    <li>
      <Link href={menu.link}>
        <a
          className={classNames(
            "flex items-center px-4 py-3 rounded-lg gap-x-3 hover:bg-gray-800",
            currentRoute === menu.link && "bg-gray-800"
          )}
        >
          <span className="w-5">{menu.icon}</span>
          <span>{menu.title}</span>
        </a>
      </Link>
    </li>
  );
}

function Logo({}) {
  return (
    <Link href="/">
      <a className="flex items-center justify-start px-4 mt-5 mb-10 text-sm font-bold gap-x-3">
        <img src="/logo.png" alt="codingui" className="max-w-[25px]" />
        <span>CodingUI</span>
      </a>
    </Link>
  );
}
export default Sidebar;
