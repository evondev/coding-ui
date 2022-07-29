import React from "react";
import { LoadingBar, LoadingCircle, LoadingCircleDashed } from "./Loader";

const LoaderList = () => {
  return (
    <>
      <LoadingCircle></LoadingCircle>
      <LoadingBar></LoadingBar>
      <LoadingCircleDashed></LoadingCircleDashed>
    </>
  );
};

export default LoaderList;
