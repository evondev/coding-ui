import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const CardManage = (props) => {
  return (
    <div className="mt-10">
      <div className="flex justify-end">
        <Link href="/manage/add-new-card">
          <a className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]">
            Add new card
          </a>
        </Link>
      </div>
    </div>
  );
};

CardManage.propTypes = {};

export default CardManage;
