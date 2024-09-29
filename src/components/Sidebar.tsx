import { useLocation, useNavigate } from "react-router-dom";

import { logo } from "../assets";
import { navlinks } from "../constants";

const NavLink = ({ icon: Icon, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive ? "bg-primary-dark text-[#ffd100]" : ""
    } flex justify-center items-center ${!disabled ? "cursor-pointer" : ""}`}
    onClick={handleClick}
  >
    <Icon className={`w-1/2 h-1/2 ${!isActive && "text-[#ffd00066]"}`} />
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <div className="w-[48px] h-[48px] rounded-[10px] bg-primary-dark flex justify-center items-center cursor-pointer">
        <img
          src={logo}
          alt="user"
          className="w-[60%] h-[60%] object-contain"
          onClick={() => {
            navigate("/dashboard");
          }}
        />
      </div>
      <div className="flex-1 flex flex-col justify-between items-center bg-background rounded-[20px] w-[76px] py-4 mt-4">
        <div className="flex flex-col justify-center items-center gap-3">
          <nav>
            <ul>
              {navlinks.map((navlink) => (
                <NavLink
                  key={navlink.name}
                  handleClick={() => {
                    navigate(navlink.link);
                  }}
                  isActive={pathname === navlink.link}
                  {...navlink}
                />
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
