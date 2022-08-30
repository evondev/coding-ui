import React from "react";

const CardLoading = () => {
  return (
    <div className="relative flex flex-col p-5 border rounded border-slate-800 card">
      <div className="absolute flex items-center right-2 top-2 gap-x-2">
        <div className="w-10 h-10 overflow-hidden rounded-full">
          <div
            aria-label="loading-skeleton"
            className="w-full h-full bg-slate-200 animate-pulse"
          ></div>
        </div>
      </div>
      <div className="pt-10 pb-5 my-5 card-ui">
        <div
          aria-label="loading-skeleton"
          className="w-full h-5 bg-slate-200 animate-pulse"
        ></div>
      </div>
      <div className="flex items-center justify-between mt-auto card-footer gap-x-2">
        <h3 className="text-sm font-semibold text-white card-title">
          <div
            aria-label="loading-skeleton"
            className="w-20 h-2 bg-slate-200 animate-pulse"
          ></div>
        </h3>
        <div
          className="flex items-center gap-x-2"
          aria-label="button-combination"
        >
          <div
            aria-label="loading-skeleton"
            className="h-5 w-14 bg-slate-200 animate-pulse"
          ></div>
          <div
            aria-label="loading-skeleton"
            className="h-5 w-14 bg-slate-200 animate-pulse"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CardLoading;
