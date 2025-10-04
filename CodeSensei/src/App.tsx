import { Editor } from "@monaco-editor/react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Select from "react-select";
import type { StylesConfig } from 'react-select';
import { useState, useRef, useEffect } from "react";

function App() {
  const options = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'php', label: 'PHP' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'scala', label: 'Scala' },
    { value: 'dart', label: 'Dart' },
    { value: 'elixir', label: 'Elixir' },
    { value: 'haskell', label: 'Haskell' },
    { value: 'clojure', label: 'Clojure' },
    { value: 'erlang', label: 'Erlang' },
    { value: 'perl', label: 'Perl' },
    { value: 'r', label: 'R' },
    { value: 'matlab', label: 'MATLAB' },
    { value: 'sql', label: 'SQL' },
    { value: 'shell', label: 'Shell (bash/zsh)' },
    { value: 'powershell', label: 'PowerShell' },
    { value: 'objective-c', label: 'Objective-C' },
    { value: 'assembly', label: 'Assembly' },
    { value: 'vbnet', label: 'VB.NET' },
    { value: 'fortran', label: 'Fortran' },
    { value: 'groovy', label: 'Groovy' },
    { value: 'lua', label: 'Lua' },
    { value: 'nim', label: 'Nim' },
    { value: 'julia', label: 'Julia' },
    { value: 'solidity', label: 'Solidity' },
    { value: 'graphql', label: 'GraphQL' },
  ];
  const [selectedOption, setSelectedOption] = useState<{ value: string; label: string } | null>(options[0]);

  // Custom styles for react-select to match app colors (dark bg and purple accent)
  const selectStyles: StylesConfig<{ value: string; label: string }, false> = {
    control: (provided, state: { isDisabled?: boolean; isFocused?: boolean; isSelected?: boolean }) => ({
      ...provided,
      background: '#0b0b0b',
      borderColor: state.isFocused ? '#9333ea' : '#2d2d2d',
      boxShadow: state.isFocused ? '0 0 0 1px rgba(147,51,234,0.25)' : 'none',
      '&:hover': {
        borderColor: '#9333ea',
      },
    }),
    menu: (provided) => ({
      ...provided,
      background: '#0b0b0b',
      borderRadius: 6,
      overflow: 'hidden',
    }),
    option: (provided, state: { isDisabled?: boolean; isFocused?: boolean; isSelected?: boolean }) => ({
      ...provided,
      background: state.isFocused ? 'rgba(147,51,234,0.12)' : 'transparent',
      color: '#ffffff',
      cursor: 'pointer',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#ffffff',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9ca3af',
    }),
    input: (provided) => ({
      ...provided,
      color: '#ffffff',
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: '#2d2d2d',
    }),
    dropdownIndicator: (provided, state: { isDisabled?: boolean; isFocused?: boolean; isSelected?: boolean }) => ({
      ...provided,
      color: state.isFocused ? '#9333ea' : '#9ca3af',
      '&:hover': { color: '#9333ea' },
    }),
    // menuPortal styles will be set dynamically through measured width
    menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
  };

  // Ref and measured width so the menu portal can match the control width and avoid clipping
  const selectWrapperRef = useRef<HTMLDivElement | null>(null);
  const [controlWidth, setControlWidth] = useState<number | null>(null);

  useEffect(() => {
    const updateWidth = () => {
      const el = selectWrapperRef.current;
      if (el) setControlWidth(el.getBoundingClientRect().width);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <div className="">
      <Navbar />
      <div
        className="main flex items-center justify-between"
        style={{ height: "calc(100vh - 90px)" }}
      >
        <div className="left h-[100%] w-[50%]">
          <div className="flex items-center gap-4 px-2 w-[100%] h-[50px]">
            <div ref={selectWrapperRef} style={{ width: '82%' }}>
              <Select
                defaultValue={selectedOption}
                onChange={(option) => setSelectedOption(option as { value: string; label: string } | null)}
                options={options}
                // Merge base styles with dynamic menuPortal width to avoid duplicate props
                styles={{
                  ...selectStyles,
                  menuPortal: (provided) => ({ ...provided, width: controlWidth ?? 'auto', zIndex: 9999 }),
                }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 6,
                  colors: {
                    ...theme.colors,
                    primary25: 'rgba(147,51,234,0.12)',
                    primary: '#9333ea',
                    neutral0: '#0b0b0b',
                    neutral20: '#2d2d2d',
                    neutral30: '#2d2d2d',
                    neutral80: '#ffffff',
                  },
                })}
                menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                menuPosition="fixed"
                menuPlacement="auto"
              />
            </div>
            <button
              type="button"
              onClick={() => console.log('Review clicked', selectedOption)}
              style={{
                background: '#9333ea',
                color: '#fff',
                padding: '8px 70px',
                borderRadius: 6,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Review
            </button>
          </div>
          <Editor
            height="calc(100% - 50px)"
            theme="vs-dark"
            language="javascript"
            value="// some comment"
          />
        
        </div>
        <div className="right !p-[10px] h-[100%] w-[50%] bg-zinc-900">

        </div>
      </div>
    </div>
  );
}

export default App;
