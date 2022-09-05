import Label from "components/label/Label";
import React from "react";
import ReactModal from "react-modal";
import { globalStore } from "store/global-store";
import classNames from "utils/classNames";
import shallow from "zustand/shallow";
import ModalClose from "./ModalClose";

const ModalReject = () => {
  const { isShowReasonModal, setIsShowReasonModal, reason } = globalStore(
    (state) => ({
      reason: state.reason,
      isShowReasonModal: state.isShowReasonModal,
      setIsShowReasonModal: state.setIsShowReasonModal,
    }),
    shallow
  );
  return (
    <ReactModal
      isOpen={isShowReasonModal}
      overlayClassName="bg-black bg-opacity-40 fixed inset-0 z-[99] flex items-center justify-center cursor-pointer"
      className="max-w-2xl p-5 rounded-lg bg-slate-800 max-h-[80vh] overflow-y-auto w-full relative scrollbar-style"
      onRequestClose={() => setIsShowReasonModal(false)}
    >
      <ModalClose onClick={() => setIsShowReasonModal(false)}></ModalClose>
      <div className="mt-10"></div>
      <div className="flex flex-col mb-5 gap-y-3">
        <Label className="text-xl">Reject reason:</Label>
        <p
          className={classNames(
            "px-4 py-2 text-sm leading-normal tracking-normal border rounded-lg border-slate-600",
            reason ? "bg-red-50 text-red-500" : "bg-green-50 text-green-500"
          )}
        >
          {reason || "Good job 👍"}
        </p>
      </div>
    </ReactModal>
  );
};

export default ModalReject;
