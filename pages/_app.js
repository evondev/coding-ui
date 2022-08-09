import "../styles/globals.scss";
import { ToastContainer } from "react-toastify";
import "@uiw/react-textarea-code-editor/dist.css";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import useDarkMode from "hooks/useDarkMode";
import { AuthProvider } from "contexts/auth-context";

Modal.setAppElement("#__next");
Modal.defaultStyles = {
  content: {},
};

function MyApp({ Component, pageProps }) {
  // useDarkMode();
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer
        bodyClassName="font-primary text-sm text-slate-500"
        hideProgressBar
      ></ToastContainer>
    </AuthProvider>
  );
}

export default MyApp;
