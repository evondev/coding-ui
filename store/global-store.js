import create from "zustand";

export const globalStore = create((set) => ({
  // state
  isShowCode: false,
  htmlCodeView: "",
  cssCodeView: "",
  isShowReasonModal: false,
  reason: "",
  // actions
  setIsShowReasonModal: () =>
    set((state) => ({ isShowReasonModal: !state.isShowReasonModal })),
  setIsShowCode: () => set((state) => ({ isShowCode: !state.isShowCode })),
  setHtmlCodeView: (htmlCodeView) => set({ htmlCodeView }),
  setCssCodeView: (cssCodeView) => set({ cssCodeView }),
  setReason: (reason) => set({ reason }),
}));
