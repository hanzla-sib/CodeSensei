import { Editor } from "@monaco-editor/react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  theme: string;
}

const CodeEditor = ({ value, onChange, language, theme }: CodeEditorProps) => {
  return (
    <div className="flex-1">
      <Editor
        height="100%"
        theme={theme}
        language={language}
        value={value}
        onChange={(value) => onChange(value || "")}
      />
    </div>
  );
};

export default CodeEditor;