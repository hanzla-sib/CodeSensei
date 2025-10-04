import { Editor } from "@monaco-editor/react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Select from "react-select";
import { useState } from "react";

function App() {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedOption, setSelectedOption] = useState<{ value: string; label: string } | null>(options[0]);

  return (
    <div className="">
      <Navbar />
      <div
        className="main flex items-center justify-between"
        style={{ height: "calc(100vh - 90px)" }}
      >
        <div className="left h-[80%] w-[50%] border-r border-gray-300">
          <Select
            defaultValue={selectedOption}
            onChange={(option) => setSelectedOption(option as { value: string; label: string } | null)}
            options={options}
            className="bg-zinc-900"
          />
          <Editor
            height="100%"
            theme="vs-dark"
            language="javascript"
            value="// some comment"
          />
          ;
        </div>
      </div>
    </div>
  );
}

export default App;
