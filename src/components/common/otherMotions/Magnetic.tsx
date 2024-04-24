import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";

const Magnetic = ({
  children,
  acticity = 1,
  size,
}: {
  children: ReactNode;
  acticity?: number;
  size: string;
}) => {
  const ref = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const xTo = gsap.quickTo(ref.current, "x", { duration: 2, ease: "power3.out" });
    const yTo = gsap.quickTo(ref.current, "y", { duration: 2, ease: "power3.out" });

    const mouseMoveHandler = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { top, left, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const x = (clientX - centerX) * acticity;
      const y = (clientY - centerY) * acticity;

      xTo(x);
      yTo(y);
    };

    const mouseLeaveHandler = () => {
      xTo(0);
      yTo(0);
    };

    const elem = ref.current;
    elem.addEventListener("mousemove", mouseMoveHandler);
    elem.addEventListener("mouseleave", mouseLeaveHandler);

    return () => {
      elem.removeEventListener("mousemove", mouseMoveHandler);
      elem.removeEventListener("mouseleave", mouseLeaveHandler);
    };
  }, []);

  return (
    <div ref={ref} className={`${size} cursor-pointer ghost-cursor`} data-id="basic">
      {children}
    </div>
  );
};

export default Magnetic;
