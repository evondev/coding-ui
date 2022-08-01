import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

export default function useDarkMode() {
  const [enabledState, setEnabledState] = useLocalStorage("dark-mode-enabled");
  const enabled = enabledState;
  useEffect(() => {
    const className = "dark";
    const element = document.documentElement;
    if (enabled) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  }, [enabled]);
  return [enabled, setEnabledState];
}
