import { LoadingBar, LoadingCircle } from "components/loader/Loader";
import React from "react";

const CardList = () => {
  return (
    <div
      className="grid grid-cols-1 gap-10 lg:grid-cols-3"
      aria-label="layout-grid-equals"
    >
      <LoadingCircle></LoadingCircle>
      <LoadingBar></LoadingBar>
    </div>
  );
};

export default CardList;
