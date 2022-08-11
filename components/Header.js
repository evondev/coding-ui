import { useAuth } from "contexts/auth-context";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { userInfo } = useAuth();
  return (
    <div className="py-5 border-b l-container border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between">
        <Link href="/">
          <a className="inline-flex items-center font-bold gap-x-3">
            <img
              src="/logo.png"
              alt="coding-ui"
              className="mx-auto max-w-[20px]"
            />
            <span>CodingUI</span>
          </a>
        </Link>
        {userInfo?.email && (
          <Link href="/profile">
            <a className="flex items-center gap-x-3">
              <img
                src="https://source.unsplash.com/random"
                alt=""
                className="object-cover w-10 h-10 rounded-full"
              />
              <p>
                <span>Hello,</span>
                <strong className="ml-1 font-bold text-transparent bg-clip-text bg-gradient-primary">
                  User
                </strong>
              </p>
            </a>
          </Link>
        )}
        {!userInfo?.email && (
          <Link href="/login">
            <a className="flex items-center px-6 py-3 text-sm font-bold text-white rounded-lg bg-gradient-secondary">
              Login to account
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
