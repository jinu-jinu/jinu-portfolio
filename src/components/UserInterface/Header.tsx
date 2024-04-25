import { DarkMode, ToggleSwitch, Logo } from "@/components/common/ButtonMotions";
import { useCurrentPath, usePageTransitioning, usePathActions } from "@/stores/PathStore";
import { AnimatePresence } from "framer-motion";
import BackButton from "../common/ButtonMotions/BackButton";

const Header = () => {
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
        <AnimatePresence>{currentPath === "/" ? <ToggleSwitch /> : <BackButton />}</AnimatePresence>
        <DarkMode />
      </div>
    </header>
  );
};

export default Header;
