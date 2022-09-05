import React from "react";

const ModalClose = ({ onClick = () => {} }) => {
  return (
    <div
      aria-label="modal-close"
      className="absolute flex items-center justify-center w-8 h-8 rounded-full cursor-pointer bg-slate-900 right-5 top-5"
      onClick={onClick}
    >
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
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
};

export default ModalClose;
