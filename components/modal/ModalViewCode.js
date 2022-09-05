import CodeEditorBlock from "components/CodeEditorBlock";
import Label from "components/label/Label";
import React from "react";
import ReactModal from "react-modal";
import { globalStore } from "store/global-store";
import shallow from "zustand/shallow";
import ModalClose from "./ModalClose";

const ModalViewCode = () => {
  const { isShowCode, setIsShowCode, htmlCodeView, cssCodeView } = globalStore(
    (state) => ({
      isShowCode: state.isShowCode,
      setIsShowCode: state.setIsShowCode,
      htmlCodeView: state.htmlCodeView,
      cssCodeView: state.cssCodeView,
    }),
    shallow
  );
  return (
    <ReactModal
      isOpen={isShowCode}
      overlayClassName="bg-black bg-opacity-40 fixed inset-0 z-[99] flex items-center justify-center cursor-pointer"
      className="max-w-2xl p-5 rounded-lg bg-slate-800 max-h-[80vh] overflow-y-auto w-full relative scrollbar-style"
      onRequestClose={() => setIsShowCode(false)}
    >
      <ModalClose onClick={() => setIsShowCode(false)}></ModalClose>
      <div className="mt-10"></div>
      <div className="flex flex-col mb-5 gap-y-3">
        <Label>HTML</Label>
        <CodeEditorBlock
          code={htmlCodeView}
          name="htmlCodeView"
          language="html"
        ></CodeEditorBlock>
      </div>
      <div className="flex flex-col mb-5 gap-y-3">
        <Label>CSS</Label>
        <CodeEditorBlock
          code={cssCodeView}
          name="cssCodeView"
          language="css"
        ></CodeEditorBlock>
      </div>
    </ReactModal>
  );
};

export default ModalViewCode;
