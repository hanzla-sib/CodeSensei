import "./App.css";
import Navbar from "./Components/Navbar";
import LanguageSelector from "./Components/LanguageSelector";
import ActionButtons from "./Components/ActionButtons";
import CodeEditor from "./Components/CodeEditor";
import ResponsePanel from "./Components/ResponsePanel";
import { useState } from "react";
import { useCodeReview, useCodeFix } from "./hooks/useCodeActions";
import type { LanguageOption } from "./constants/languages";
import { languageOptions } from "./constants/languages";
function App() {
  const [code, setCode] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<LanguageOption | null>(languageOptions[0]);
  const [navBarcolor, setNavBarcolor] = useState<string>("");

  // Custom hooks for API calls
  const { response, loading, error: reviewError, reviewCode } = useCodeReview();
  const { fixLoading, error: fixError, fixCode } = useCodeFix();

  // Combined error from both hooks
  const error = reviewError || fixError;

  const handleReview = async () => {
    if (!selectedOption) return;
    await reviewCode(selectedOption.value, code);
  };

  const handleFix = async () => {
    if (!selectedOption) return;
    await fixCode(
      selectedOption.value,
      code,
      setCode,
      () => {} // We don't need to update response for fix as it's handled in the hook
    );
  };
  return (
    <div className="">
      <Navbar setNavBarcolor={setNavBarcolor} />
      <div
        className="main flex items-center justify-between"
        style={{ height: "calc(100vh - 90px)" }}
      >
        <div className="left h-[100%] w-[50%] bg-zinc-900 flex flex-col">
          <div className="flex items-center gap-4 px-2 w-[100%] controls-row py-2">
            <LanguageSelector
              selectedLanguage={selectedOption}
              onLanguageChange={setSelectedOption}
            />
            <ActionButtons
              onFix={handleFix}
              onReview={handleReview}
              isLoading={loading}
              isFixLoading={fixLoading}
            />
          </div>

          <CodeEditor
            value={code}
            onChange={setCode}
            language={selectedOption ? selectedOption.value : "javascript"}
            theme={navBarcolor}
          />
        </div>
        
        <ResponsePanel
          response={response}
          error={error}
          isLoading={loading}
        />
      </div>
    </div>
  );
}

export default App;
