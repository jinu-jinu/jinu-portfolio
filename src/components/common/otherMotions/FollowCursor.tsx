import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./other.scss";
import useMouse from "@/utils/useMouse";

const FollowCursor = ({ trigger }: { trigger: boolean }) => {
  const cursor = useRef<HTMLDivElement>(null!);
  const [[mouseX, mouseY]] = useMouse();

  useEffect(() => {
    gsap.set(cursor.current, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(cursor.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(cursor.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const scaleToX = gsap.quickTo(cursor.current, "scaleX", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    const scaleToY = gsap.quickTo(cursor.current, "scaleY", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    if (trigger) {
      scaleToX(1);
      scaleToY(1);
    } else {
      scaleToX(0);
      scaleToY(0);
    }

    xTo(mouseX);
    yTo(mouseY);
  }, [cursor, trigger, mouseX, mouseY]);

  return <div ref={cursor} className="follw-cursor" />;
};

export default FollowCursor;
