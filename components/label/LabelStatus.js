import { cardStatus } from "constant/global-constant";
import React from "react";

const LabelStatus = ({ children, type = cardStatus.APPROVED }) => {
  let bgClassName = "bg-green-500";
  if (type === cardStatus.REJECTED) bgClassName = "bg-red-500";
  return (
    <span
      className={`inline-block px-4 py-2 rounded-full text-white ${bgClassName}`}
    >
      {children}
    </span>
  );
};

export default LabelStatus;
