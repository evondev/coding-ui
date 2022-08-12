import create from "zustand";

export const globalStore = create((set) => ({
  // state
  isShowCode: false,
  htmlCodeView: "",
  cssCodeView: "",
  // actions
  setIsShowCode: () => set((state) => ({ isShowCode: !state.isShowCode })),
  setHtmlCodeView: (htmlCodeView) => set({ htmlCodeView }),
  setCssCodeView: (cssCodeView) => set({ cssCodeView }),
}));
