import { useAuth } from "contexts/auth-context";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Avatar from "./image/Avatar";

const Header = () => {
  const { userInfo } = useAuth();
  return (
    <div className="py-5 border-b l-container border-slate-800">
      <div className="flex items-center justify-between">
        <Link href="/">
          <a className="inline-flex items-center font-bold gap-x-3">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="codingUI"
                width={20}
                height={22}
              ></Image>
            </div>
            <span>CodingUI</span>
          </a>
        </Link>
        {userInfo?.email && (
          <Link href="/manage/cards">
            <a className="flex items-center gap-x-3">
              <Avatar className="w-10 h-10 text-xl"></Avatar>
              <p>
                <span>Hello,</span>
                <strong className="ml-1 font-bold text-transparent font-secondary bg-clip-text bg-gradient-primary">
                  {userInfo?.username || userInfo?.fullname || "user"}
                </strong>
              </p>
            </a>
          </Link>
        )}
        {!userInfo?.email && (
          <div className="flex items-center gap-x-3">
            <Link href="/signup">
              <a className="flex items-center px-6 py-3 text-sm font-medium text-white rounded-lg">
                Sign up
              </a>
            </Link>
            <Link href="/login">
              <a className="flex items-center px-6 py-3 text-sm font-medium text-white rounded-lg bg-gradient-secondary button-effect">
                Login
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
