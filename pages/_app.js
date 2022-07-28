import "../styles/globals.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";

Modal.setAppElement("#__next");
Modal.defaultStyles = {
  content: {},
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer
        bodyClassName="font-primary text-sm text-slate-500"
        hideProgressBar
      ></ToastContainer>
    </>
  );
}

export default MyApp;
