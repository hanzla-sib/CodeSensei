import { View } from "lucide-react";
import { Sun } from "lucide-react";

const Navbar = () => {
  return (
    <>
      <div className="nav flex items-center justify-between px-[60px] h-[90px] bg-zinc-900">
        <div className="logo flex items-center">
          <View size={50} color="#9333ea" />
          <span className="text-white text-2xl font-bold ml-2">CodeSensei</span>
        </div>
        <div className="icons flex items-center">
          <i className="cursor-pointer transition-all hover:text-[#9333ea]">
            {" "}
            <Sun size={30} />
          </i>
        </div>
      </div>
    </>
  );
};

export default Navbar;
