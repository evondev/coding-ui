import { toast } from "react-toastify";

export default function copyToClipBoard(text = "") {
  navigator.clipboard?.writeText && navigator.clipboard.writeText(text);
  toast.success("Copy to clipboard successfully");
}
