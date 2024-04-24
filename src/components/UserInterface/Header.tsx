import { DarkMode, ToggleSwitch, Logo } from "@/components/common/ButtonMotions";
import { AnimatePresence } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="header h-[100px] md:h-[150px] px-[24px] md:px-[48px] lg:px-[72px]">
      <div className="header__left">
        <NavLink to="/">
          <Logo />
        </NavLink>
      </div>
      <div className="header__right">
        <AnimatePresence>{location.pathname === "/" ? <ToggleSwitch /> : null}</AnimatePresence>

        <DarkMode />
      </div>
    </header>
  );
};

export default Header;
