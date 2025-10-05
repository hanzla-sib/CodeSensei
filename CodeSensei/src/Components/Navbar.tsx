import { View,Sun } from "lucide-react";

const Navbar = () => {
  return (
    <>
      <div className="nav flex items-center justify-between px-6 md:px-16 h-20 md:h-[90px] bg-zinc-900">
        <div className="logo flex items-center">
          <View size={38} color="#9333ea" className="md:scale-100" />
          <span className="text-white text-lg md:text-2xl font-bold ml-2">CodeSensei</span>
        </div>
        <div className="icons flex items-center">
          <button className="p-1 rounded hover:text-[#9333ea] transition-colors" aria-label="toggle-theme">
            <Sun size={24} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
