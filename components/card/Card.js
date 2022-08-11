import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import parse from "react-html-parser";
import copyToClipBoard from "../../utils/copyToClipboard";
import pretty from "pretty";
import cssbeautify from "cssbeautify";
import ReactModal from "react-modal";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { filterItems } from "constant/global-constant";
import { IconEye, IconHeart } from "components/icons";

const CardStyles = styled.div`
  ${(props) => props.css}
`;
const Card = (props) => {
  const { title, htmlCode, cssCode, filter } = props;
  const [htmlSourceCode, setHtmlSourceCode] = useState(htmlCode);
  const [cssSourceCode, setCssSourceCode] = useState(cssCode);
  const mountedRef = React.useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    if (mountedRef.current) {
      setHtmlSourceCode(htmlCode);
      setCssSourceCode(cssCode);
    }
    return () => {
      mountedRef.current = false;
    };
  }, [htmlCode, cssCode]);
  const handleViewCode = () => {
    toast.warning("This featured will coming soon");
  };
  return (
    <>
      <div
        data-filter={filter}
        className="relative flex flex-col p-5 border rounded border-slate-200 dark:border-slate-800 card"
      >
        <div className="absolute flex items-center right-2 top-2 gap-x-2">
          <ButtonAction onClick={handleViewCode}>
            <IconEye></IconEye>
          </ButtonAction>
          <ButtonAction onClick={handleViewCode}>
            <IconHeart></IconHeart>
          </ButtonAction>
        </div>
        <div className="pt-10 pb-5 my-5 card-ui">
          <CardStyles css={cssSourceCode}>
            {htmlSourceCode && <>{parse(htmlSourceCode)}</>}
          </CardStyles>
        </div>
        <div className="flex items-center justify-between mt-auto card-footer gap-x-2">
          <h3 className="text-sm font-semibold card-title text-slate-900 dark:text-white">
            {title}
          </h3>
          <div
            className="flex items-center gap-x-2"
            aria-label="button-combination"
          >
            <ButtonCopy
              type="css"
              onClick={() =>
                copyToClipBoard(
                  cssbeautify(cssSourceCode, {
                    indent: `  `,
                    autosemicolon: true,
                  })
                )
              }
            >
              CSS
            </ButtonCopy>
            <ButtonCopy
              type="html"
              onClick={() =>
                copyToClipBoard(pretty(htmlSourceCode, { ocd: true }))
              }
            >
              HTML
            </ButtonCopy>
          </div>
        </div>
      </div>
      {/* <ReactModal
        isOpen
        overlayClassName="bg-black bg-opacity-50 fixed inset-0 flex items-center justify-center"
        className="max-w-2xl p-5 rounded-lg bg-slate-800"
      >
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est nulla
          vero laboriosam maxime sunt dignissimos iure? Et libero amet, quod
          necessitatibus modi qui voluptatibus id, tenetur adipisci cum, sint
          quis.
        </div>
      </ReactModal> */}
    </>
  );
};

function ButtonAction({ children, onClick }) {
  return (
    <button
      className="flex items-center justify-center w-10 h-10 p-2 rounded-full dark:bg-black bg-opacity-40 dark:text-slate-400 text-slate-900 bg-slate-400 hover:text-white"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function ButtonCopy({ children, onClick = () => {}, type = "html" }) {
  let bgClassName =
    type === "html" ? "hover:bg-blue-500" : "hover:bg-orange-500";

  return (
    <button
      className={`inline-flex items-center gap-x-2 py-2 px-3 hover:text-white text-slate-500 rounded-lg transition-all text-sm font-medium ${bgClassName}`}
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
          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
      <span>{children}</span>
    </button>
  );
}
Card.propTypes = {
  title: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  htmlCode: PropTypes.string,
  cssCode: PropTypes.string,
};
export default memo(Card);
