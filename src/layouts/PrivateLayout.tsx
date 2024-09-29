import { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

type PrivateLayoutProps = { children: ReactNode };

const PrivateLayout = ({ children }: PrivateLayoutProps) => {
  return (
    <div className="relative p-4 bg-background-dark min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-4 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default PrivateLayout;
