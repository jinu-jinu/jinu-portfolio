import { Underline } from "@/components/common/textMotions";
import { useCurrentPath, usePathActions, usePageTransitioning } from "@/stores/PathStore";
import { MouseEvent } from "react";

const Nav = () => {
  const currentPath = useCurrentPath();
  const pageTransitioning = usePageTransitioning();
  const handleNextPath = usePathActions("handleNextPath") as (v: string) => void;
  const handlePageTransitionWait = usePathActions("handlePageTransitionWait") as (
    v: boolean
  ) => void;
  const handlePageTransitioning = usePathActions("handlePageTransitioning") as (v: boolean) => void;

  const clickHandler = (e: MouseEvent) => {
    e.preventDefault();
    const target = (e.target as HTMLElement).closest(".nav__btn") as HTMLElement;
    if (!target) return;
    const path = target.dataset.path!;

    if (currentPath === path || pageTransitioning) return;

    handleNextPath(path);
    handlePageTransitionWait(false);
    handlePageTransitioning(true);
  };

  return (
    <nav onClick={clickHandler} className="nav bg-[rgba(0,0,0,.8)] dark:bg-[rgba(255,255,255,.8)]">
      <div className="nav__btn cursor-pointer" data-path="/">
        <Underline title="HOME" path="/" />
      </div>
      <div className="nav__btn cursor-pointer" data-path="/about">
        <Underline title="ABOUT" path="/about" />
      </div>
      <div className="nav__btn cursor-pointer" data-path="/contact">
        <Underline title="CONTACT" path="/contact" />
      </div>
    </nav>
  );
};

export default Nav;
