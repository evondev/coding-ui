import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import parse from "react-html-parser";
import copyToClipBoard from "../../utils/copyToClipboard";
import pretty from "pretty";
import cssbeautify from "cssbeautify";
import PropTypes from "prop-types";
import { IconEye, IconHeart } from "components/icons";
import { globalStore } from "store/global-store";
import shallow from "zustand/shallow";
const CardStyles = styled.div`
  ${(props) => props.css}
`;

const Card = (props) => {
  const {
    title,
    htmlCode,
    cssCode,
    filter,
    author = null,
    preview = false,
  } = props;
  const [htmlSourceCode, setHtmlSourceCode] = useState(htmlCode);
  const [cssSourceCode, setCssSourceCode] = useState(cssCode);

  useEffect(() => {
    setHtmlSourceCode(htmlCode);
    setCssSourceCode(cssCode);
  }, [htmlCode, cssCode, preview]);
  const { setIsShowCode, setHtmlCodeView, setCssCodeView } = globalStore(
    (state) => ({
      setIsShowCode: state.setIsShowCode,
      setHtmlCodeView: state.setHtmlCodeView,
      setCssCodeView: state.setCssCodeView,
    }),
    shallow
  );
  const handleViewCode = () => {
    setIsShowCode(true);
    setHtmlCodeView(pretty(htmlSourceCode, { ocd: true }));
    setCssCodeView(
      cssbeautify(cssSourceCode, {
        indent: `  `,
        autosemicolon: true,
      })
    );
  };
  return (
    <>
      <div
        data-filter={filter}
        className="relative flex flex-col p-5 transition-all border rounded border-slate-800 hover:border-slate-600 card"
      >
        <div className="flex items-center justify-between">
          <h4 className="relative z-10 flex items-center text-sm font-normal text-slate-500 gap-x-2">
            {author && (
              <>
                <span>Credit: </span>
                <span className="text-slate-400 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap font-medium">
                  {author}
                </span>
              </>
            )}
          </h4>
          {!preview && (
            <div className="flex items-center gap-x-2">
              <ButtonAction onClick={handleViewCode}>
                <IconEye></IconEye>
              </ButtonAction>
              {/* <ButtonAction onClick={handleViewCode}>
            <IconHeart></IconHeart>
          </ButtonAction> */}
            </div>
          )}
        </div>
        <div className="py-10 card-ui">
          <CardStyles css={!preview ? cssSourceCode : null}>
            {preview && <style>{cssSourceCode}</style>}
            {htmlSourceCode && <>{parse(htmlSourceCode)}</>}
          </CardStyles>
        </div>
        <div className="relative z-10 flex items-center justify-between mt-auto card-footer gap-x-2">
          <h3 className="text-sm font-semibold text-white card-title max-w-[100px] lg:max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
            {title}
          </h3>
          {!preview && (
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
          )}
        </div>
      </div>
    </>
  );
};

function ButtonAction({ children, onClick }) {
  return (
    <button
      className="flex items-center justify-center w-10 h-10 p-2 bg-black rounded-full bg-opacity-40 text-slate-400 hover:text-white"
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
  preview: PropTypes.bool,
};
export default memo(Card);
