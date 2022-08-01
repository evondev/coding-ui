import Banner from "components/Banner";
import Head from "next/head";
import React from "react";

const LayoutMain = ({ children, title = "CodingUI" }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Banner></Banner>
      {children}
    </>
  );
};

export default LayoutMain;
