import React from "react";

type NavLinkProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  name?: string;
  isActive: boolean;
  hideName?: boolean;
  disabled?: boolean;
  handleClick: () => void;
};

const NavLink = ({
  icon: Icon,
  name,
  hideName,
  isActive,
  disabled,
  handleClick,
}: NavLinkProps) => (
  <div
    className={`w-full h-[48px] rounded-[10px] px-2 ${
      isActive ? "bg-primary-dark text-navIcon" : ""
    } flex justify-start items-center ${!disabled ? "cursor-pointer" : ""} ${
      !hideName ? "gap-2" : "justify-center"
    }`}
    onClick={handleClick}
  >
    <Icon className={`w-6 h-6 ${!isActive && "text-[#ffd00066]"}`} />
    {!hideName && <span className="text-gray-300 font-medium">{name}</span>}
  </div>
);

export default NavLink;
