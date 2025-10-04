import { Editor } from "@monaco-editor/react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Select from "react-select";
import type { StylesConfig } from 'react-select';
import { useState, useRef, useEffect } from "react";

function App() {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
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
        <div className="left h-[80%] w-[50%] border-r border-gray-300">
          <div ref={selectWrapperRef}>
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
          <Editor
            height="100%"
            theme="vs-dark"
            language="javascript"
            value="// some comment"
          />
        
        </div>
      </div>
    </div>
  );
}

export default App;
