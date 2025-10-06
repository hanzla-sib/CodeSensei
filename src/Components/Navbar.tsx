import { View, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = ({setNavBarcolor}: {setNavBarcolor: React.Dispatch<React.SetStateAction<string>>}) => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // initialize theme from localStorage or prefers-color-scheme
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      if(stored === "light") setNavBarcolor("vs-light");
      else setNavBarcolor("vs-dark");
      document.documentElement.classList.toggle("light", stored === "light");
      document.dispatchEvent(new CustomEvent("themeChange", { detail: stored }));
    } else if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      setTheme("light");
      setNavBarcolor("vs-light")
      document.documentElement.classList.add("light");
      document.dispatchEvent(new CustomEvent("themeChange", { detail: "light" }));
    } else {
      setTheme("dark");
      setNavBarcolor("vs-dark");
      document.documentElement.classList.remove("light");
      document.dispatchEvent(new CustomEvent("themeChange", { detail: "dark" }));
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    setNavBarcolor(next === "dark" ? "vs-dark" : "vs-light");
    if (typeof window !== "undefined") localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("light", next === "light");
    document.dispatchEvent(new CustomEvent("themeChange", { detail: next }));
  };

  return (
    <>
      <div className="nav flex items-center justify-between px-6 md:px-16 h-20 md:h-[90px]">
        <div className="logo flex items-center">
          <View size={38} color="var(--accent)" className="md:scale-100" />
          <span className="text-[var(--text)] text-lg md:text-2xl font-bold ml-2">CodeSensei</span>
        </div>
        <div className="icons flex items-center">
          <button
            onClick={toggleTheme}
            className="p-1 rounded hover:text-[var(--accent)] transition-colors"
            aria-label="toggle-theme"
            title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
