import ToggleDarkMode from "components/ToggleDarkMode";
import { menus } from "constant/global-constant";
import Link from "next/link";
import React, { useState } from "react";

const Sidebar = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div
      aria-label="sidebar"
      className="relative p-5 border-r border-slate-200 dark:border-slate-800"
    >
      <Link href="/">
        <a className="flex items-center justify-start mb-20 text-lg gap-x-5">
          <img src="/logo.png" alt="codingui" className="max-w-[30px]" />
          <span>CodingUI</span>
        </a>
      </Link>
      <ul className="flex flex-col gap-y-2">
        {menus.map((menu, index) => (
          <li key={menu.title}>
            <Link href={menu.link}>
              <a className="flex items-center px-4 py-3 rounded-lg gap-x-3 hover:bg-blue-500 hover:text-white">
                <span>{menu.icon}</span>
                <span>{menu.title}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-0 flex items-center w-full pb-5 gap-x-2">
        <ToggleDarkMode
          on={isDarkMode}
          onClick={() => setIsDarkMode(!isDarkMode)}
        ></ToggleDarkMode>
      </div>
    </div>
  );
};

export default Sidebar;
