import "../styles/globals.scss";
import { ToastContainer } from "react-toastify";
import "@uiw/react-textarea-code-editor/dist.css";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { AuthProvider } from "contexts/auth-context";
import "lazysizes";
import Head from "next/head";
import ModalReject from "components/modal/ModalReject";
import ModalViewCode from "components/modal/ModalViewCode";

Modal.setAppElement("#__next");
Modal.defaultStyles = {
  content: {},
};

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
      <ToastContainer
        bodyClassName="font-primary text-sm text-slate-500"
        autoClose={1000}
      ></ToastContainer>
      <ModalViewCode></ModalViewCode>
      <ModalReject></ModalReject>
    </AuthProvider>
  );
}

export default MyApp;
