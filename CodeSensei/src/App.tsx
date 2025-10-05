import { Editor } from "@monaco-editor/react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Select from "react-select";
import type { StylesConfig } from "react-select";
import { useState, useRef, useEffect } from "react";
import { ReviewCode } from "./helper/AiHelper";
import Markdown from "react-markdown";
function App() {
  const options = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "cpp", label: "C++" },
    { value: "c", label: "C" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
    { value: "ruby", label: "Ruby" },
    { value: "php", label: "PHP" },
    { value: "swift", label: "Swift" },
    { value: "kotlin", label: "Kotlin" },
    { value: "scala", label: "Scala" },
    { value: "dart", label: "Dart" },
    { value: "elixir", label: "Elixir" },
    { value: "haskell", label: "Haskell" },
    { value: "clojure", label: "Clojure" },
    { value: "erlang", label: "Erlang" },
    { value: "perl", label: "Perl" },
    { value: "r", label: "R" },
    { value: "matlab", label: "MATLAB" },
    { value: "sql", label: "SQL" },
    { value: "shell", label: "Shell (bash/zsh)" },
    { value: "powershell", label: "PowerShell" },
    { value: "objective-c", label: "Objective-C" },
    { value: "assembly", label: "Assembly" },
    { value: "vbnet", label: "VB.NET" },
    { value: "fortran", label: "Fortran" },
    { value: "groovy", label: "Groovy" },
    { value: "lua", label: "Lua" },
    { value: "nim", label: "Nim" },
    { value: "julia", label: "Julia" },
    { value: "solidity", label: "Solidity" },
    { value: "graphql", label: "GraphQL" },
  ];

  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  } | null>(options[0]);

  // Custom styles for react-select to match app colors (dark bg and purple accent)
  const selectStyles: StylesConfig<{ value: string; label: string }, false> = {
    control: (
      provided,
      state: { isDisabled?: boolean; isFocused?: boolean; isSelected?: boolean }
    ) => ({
      ...provided,
      background: "#0b0b0b",
      borderColor: state.isFocused ? "#9333ea" : "#2d2d2d",
      boxShadow: state.isFocused ? "0 0 0 1px rgba(147,51,234,0.25)" : "none",
      "&:hover": {
        borderColor: "#9333ea",
      },
    }),
    menu: (provided) => ({
      ...provided,
      background: "#0b0b0b",
      borderRadius: 6,
      overflow: "hidden",
    }),
    option: (
      provided,
      state: { isDisabled?: boolean; isFocused?: boolean; isSelected?: boolean }
    ) => ({
      ...provided,
      background: state.isFocused ? "rgba(147,51,234,0.12)" : "transparent",
      color: "#ffffff",
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#ffffff",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9ca3af",
    }),
    input: (provided) => ({
      ...provided,
      color: "#ffffff",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: "#2d2d2d",
    }),
    dropdownIndicator: (
      provided,
      state: { isDisabled?: boolean; isFocused?: boolean; isSelected?: boolean }
    ) => ({
      ...provided,
      color: state.isFocused ? "#9333ea" : "#9ca3af",
      "&:hover": { color: "#9333ea" },
    }),
    // menuPortal styles will be set dynamically through measured width
    menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
  };
  const [response, setResponse] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  // Ref and measured width so the menu portal can match the control width and avoid clipping
  const selectWrapperRef = useRef<HTMLDivElement | null>(null);
  const [controlWidth, setControlWidth] = useState<number | null>(null);

  useEffect(() => {
    const updateWidth = () => {
      const el = selectWrapperRef.current;
      if (el) setControlWidth(el.getBoundingClientRect().width);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const getResponse = async () => {
    if (loading) return; // Prevent multiple clicks
    setError(null);
    setResponse("");
    setLoading(true);
    try {
      const responseAi = await ReviewCode(
        selectedOption ? selectedOption.value : "javascript",
        code
      );
      setResponse(responseAi?.toString() || "No response");
    } catch (err: unknown) {
      console.error("ReviewCode error:", err);
      let msg = "Unknown error";
      if (typeof err === "string") msg = err;
      else if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof (err as { message?: unknown }).message === "string"
      ) {
        msg = (err as { message?: unknown }).message as string;
      }
      setError(msg);
      setResponse("");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="">
      <Navbar />
      <div
        className="main flex items-center justify-between"
        style={{ height: "calc(100vh - 90px)" }}
      >
        <div className="left h-[100%] w-[50%] bg-zinc-900">
          <div className="flex items-center gap-4 px-2 w-[100%] h-[50px]">
            <div ref={selectWrapperRef} style={{ width: "82%" }}>
              <Select
                defaultValue={selectedOption}
                onChange={(option) =>
                  setSelectedOption(
                    option as { value: string; label: string } | null
                  )
                }
                options={options}
                // Merge base styles with dynamic menuPortal width to avoid duplicate props
                styles={{
                  ...selectStyles,
                  menuPortal: (provided) => ({
                    ...provided,
                    width: controlWidth ?? "auto",
                    zIndex: 9999,
                  }),
                }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 6,
                  colors: {
                    ...theme.colors,
                    primary25: "rgba(147,51,234,0.12)",
                    primary: "#9333ea",
                    neutral0: "#0b0b0b",
                    neutral20: "#2d2d2d",
                    neutral30: "#2d2d2d",
                    neutral80: "#ffffff",
                  },
                })}
                menuPortalTarget={
                  typeof document !== "undefined" ? document.body : null
                }
                menuPosition="fixed"
                menuPlacement="auto"
              />
            </div>
            <div className="actions flex gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => console.log("Fix Code clicked", selectedOption)}
                className="btn-secondary"
                disabled={loading}
              >
                Fix
              </button>
              <button
                type="button"
                onClick={() => getResponse()}
                className="btn-primary flex items-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loader mr-2" />
                    Reviewing...
                  </>
                ) : (
                  "Review"
                )}
              </button>
            </div>
          </div>

            <Editor
              height="calc(100% - 50px)"
              theme="vs-dark"
              language={selectedOption ? selectedOption.value : "javascript"}
              value={code}
              onChange={(value) => setCode(value || "")}
            />
        </div>
        <div className="right !p-[10px] h-[100%] w-[50%] bg-zinc-900">
          <div className="toptab border-b-[1px] border-t-[1px] border-[#27272a] flex items-center justify-between h-[60px]">
            <p className="font-[700] text-[17px]">Response</p>
          </div>
          <div className="response-container mt-[10px] h-[88%] p-4 bg-[#070707] rounded">
            {error ? (
              <div style={{ color: "#ff6b6b" }}>Error: {error}</div>
            ) : loading ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div className="loader" />
                <div>Waiting for response...</div>
              </div>
            ) : response ? (
              <div
                className="response-scroll"
                style={{ whiteSpace: "pre-wrap" }}
              >
                <Markdown>{response}</Markdown>
              </div>
            ) : ( 
              <div style={{ color: "#9ca3af" }}>
                No response yet. Click Review to start.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
