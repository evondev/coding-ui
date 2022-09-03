import Banner from "components/Banner";
import Header from "components/Header";
import Heart from "components/Heart";
import Head from "next/head";
import React from "react";

const LayoutMain = ({ children, title = "CodingUI", hideBanner = false }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header></Header>
      <Heart></Heart>
      <main className="l-container">
        {!hideBanner && <Banner></Banner>}
        {children}
      </main>
    </>
  );
};

export default LayoutMain;
