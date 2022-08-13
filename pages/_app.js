import "../styles/globals.scss";
import { ToastContainer } from "react-toastify";
import "@uiw/react-textarea-code-editor/dist.css";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import useDarkMode from "hooks/useDarkMode";
import { AuthProvider } from "contexts/auth-context";
import "lazysizes";
import ReactModal from "react-modal";
import CodeEditorBlock from "components/CodeEditorBlock";
import Label from "components/label/Label";
import { globalStore } from "store/global-store";
import shallow from "zustand/shallow";

Modal.setAppElement("#__next");
Modal.defaultStyles = {
  content: {},
};

function MyApp({ Component, pageProps }) {
  // useDarkMode();
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
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer
        bodyClassName="font-primary text-sm text-slate-500"
        hideProgressBar
      ></ToastContainer>
      <ReactModal
        isOpen={isShowCode}
        overlayClassName="bg-black bg-opacity-40 fixed inset-0 z-[99] flex items-center justify-center cursor-pointer"
        className="max-w-2xl p-5 rounded-lg bg-slate-800 max-h-[80vh] overflow-y-auto w-full relative scrollbar-style"
        onRequestClose={() => setIsShowCode(false)}
      >
        <div
          aria-label="modal-close"
          className="absolute flex items-center justify-center w-8 h-8 rounded-full cursor-pointer bg-slate-900 right-5 top-5"
          onClick={() => setIsShowCode(false)}
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
    </AuthProvider>
  );
}

export default MyApp;
