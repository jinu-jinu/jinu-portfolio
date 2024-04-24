import { useEffect, useRef } from "react";
import gsap from "gsap";

const GhostManetic = ({ parentClass }: { parentClass: string }) => {
  const ghost = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const parent = document.querySelector(parentClass) as HTMLElement;
    const xTo = gsap.quickTo(ghost.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(ghost.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const mouseMoveHandler = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { top, left, width, height } = ghost.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const x = (clientX - centerX) * 0.5;
      const y = (clientY - centerY) * 0.5;
      xTo(x);
      yTo(y);
    };

    const mouseLeaveHandler = () => {
      xTo(0);
      yTo(0);
    };

    parent.addEventListener("mousemove", mouseMoveHandler);
    parent.addEventListener("mouseleave", mouseLeaveHandler);

    return () => {
      parent.removeEventListener("mousemove", mouseMoveHandler);
      parent.removeEventListener("mouseleave", mouseLeaveHandler);
    };
  }, [parentClass]);

  return <div ref={ghost} className="absolute bottom-[-30%] right-[-10%] ghost-btn" />;
};

export default GhostManetic;
