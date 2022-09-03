import IconWebsite from "./icons/IconWebsite";
import IconTiktok from "./icons/IconTiktok";
import IconPointer from "./icons/IconPointer";
import { IconFacebook } from "./icons/IconFacebook";
import Link from "next/link";
import React from "react";
import { IconChat, IconGithub } from "./icons";

const Banner = () => {
  return (
    <div className="py-20 select-none">
      <div className="flex items-center justify-center w-20 h-20 mx-auto mb-5 border-4 border-third bg-opacity-10">
        <IconPointer />
      </div>
      <h1 className="max-w-xl mx-auto mb-10 text-3xl font-bold leading-snug text-center text-white lg:leading-relaxed lg:text-4xl">
        Get your free UI components with just few click
      </h1>
      <div className="flex flex-col justify-center gap-5 mb-10 sm:items-center sm:flex-row">
        <a
          href="https://github.com/evondev/coding-ui"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-x-3 px-8 py-4 font-sans font-semibold tracking-wide text-white bg-slate-800 rounded-lg h-[60px] w-full sm:w-[230px] button-effect"
        >
          <IconGithub></IconGithub>
          View on Github
        </a>
        <a
          href="https://fb.com/tuan.trananh.0509"
          target="_blank"
          className="inline-flex items-center justify-center gap-x-3 px-8 py-4 font-sans font-semibold tracking-wide text-white bg-gradient-primary rounded-lg h-[60px] w-full sm:w-[230px] button-effect"
          rel="noreferrer"
        >
          <IconChat></IconChat>
          <span>Contact me</span>
        </a>
      </div>
      <div className="flex items-center justify-center gap-x-5">
        <SocialIcon href="https://www.facebook.com/evondevblog">
          <IconFacebook />
        </SocialIcon>
        <SocialIcon href="https://www.youtube.com/c/evondevfrontend">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.6 16L14.4 13.6V18.4L18.6 16Z" fill="currentColor" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16ZM22.2 10.7C22.9 10.9 23.4 11.4 23.6 12.1C24 13.4 24 16 24 16C24 16 24 18.6 23.7 19.9C23.5 20.6 23 21.1 22.3 21.3C21 21.6 16 21.6 16 21.6C16 21.6 10.9 21.6 9.7 21.3C9 21.1 8.5 20.6 8.3 19.9C8 18.6 8 16 8 16C8 16 8 13.4 8.2 12.1C8.4 11.4 8.90001 10.9 9.60001 10.7C10.9 10.4 15.9 10.4 15.9 10.4C15.9 10.4 21 10.4 22.2 10.7Z"
              fill="currentColor"
            />
          </svg>
        </SocialIcon>
        <SocialIcon href="https://www.tiktok.com/@evon.dev">
          <IconTiktok />
        </SocialIcon>
        <SocialIcon href="https://evondev.com">
          <IconWebsite />
        </SocialIcon>
      </div>
    </div>
  );
};

function SocialIcon({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-center p-1 rounded-full w-11 h-11 bg-slate-700 hover:opacity-70"
    >
      {children}
    </a>
  );
}

export default Banner;
