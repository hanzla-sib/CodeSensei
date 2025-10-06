import { useRef, useEffect, useState } from "react";
import Select from "react-select";
import type { StylesConfig } from "react-select";
import type { LanguageOption } from "../constants/languages";
import { languageOptions } from "../constants/languages";

interface LanguageSelectorProps {
  selectedLanguage: LanguageOption | null;
  onLanguageChange: (option: LanguageOption | null) => void;
}

const LanguageSelector = ({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) => {
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

  // Custom styles for react-select to match app colors (dark bg and purple accent)
  const selectStyles: StylesConfig<LanguageOption, false> = {
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
    menuPortal: (provided) => ({
      ...provided,
      width: controlWidth ?? "auto",
      zIndex: 9999,
    }),
  };

  return (
    <div ref={selectWrapperRef} className="select-wrapper">
      <Select
        defaultValue={selectedLanguage}
        value={selectedLanguage}
        onChange={onLanguageChange}
        options={languageOptions}
        styles={selectStyles}
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
  );
};

export default LanguageSelector;