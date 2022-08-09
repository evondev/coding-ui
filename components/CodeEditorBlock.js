import dynamic from "next/dynamic";
import PropTypes from "prop-types";

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);
function CodeEditorBlock(props) {
  const { language = "css", placeholder = "", name, code, onChange } = props;
  return (
    <CodeEditor
      name={name}
      value={code}
      language={language}
      placeholder={placeholder}
      onChange={onChange}
      padding={15}
    />
  );
}
CodeEditorBlock.propTypes = {
  language: PropTypes.oneOf(["css", "html", "javascript"]).isRequired,
  placeholder: PropTypes.string,
  code: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
};
export default CodeEditorBlock;
