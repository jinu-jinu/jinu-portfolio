import { DarkMode, ToggleSwitch, Logo } from "@/components/common/ButtonMotions";
import { useCurrentPath, usePageTransitioning, usePathActions } from "@/stores/PathStore";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const currentPath = useCurrentPath();
  const pageTransitioning = usePageTransitioning();
  const handleNextPath = usePathActions("handleNextPath") as (v: string) => void;
  const handlePageTransitionWait = usePathActions("handlePageTransitionWait") as (
    v: boolean
  ) => void;
  const handlePageTransitioning = usePathActions("handlePageTransitioning") as (v: boolean) => void;

  const clickHandler = () => {
    if (currentPath === "/" || pageTransitioning) return;

    handleNextPath("/");
    handlePageTransitionWait(false);
    handlePageTransitioning(true);
  };

  return (
    <header className="header h-[100px] md:h-[150px] px-[24px] md:px-[48px] lg:px-[72px]">
      <div className="header__left" onClick={clickHandler}>
        <Logo />
      </div>
      <div className="header__right">
        {/* 뒤로 가기 버튼 */}
        <AnimatePresence>{location.pathname === "/" ? <ToggleSwitch /> : null}</AnimatePresence>

        <DarkMode />
      </div>
    </header>
  );
};

export default Header;
