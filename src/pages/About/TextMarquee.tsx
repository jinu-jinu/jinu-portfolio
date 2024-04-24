import {
  AnimationPlaybackControls,
  animate,
  useInView,
  useMotionValue,
  motion,
} from "framer-motion";
import { useEffect, useRef } from "react";

const TextMarquee = ({
  text,
  direction,
  textSize,
}: {
  text: string;
  direction: "L" | "R";
  textSize: string;
}) => {
  const ref1 = useRef<HTMLDivElement>(null!);
  const ref2 = useRef<HTMLDivElement>(null!);
  const value = useMotionValue(0);
  const view = useInView(ref1);

  useEffect(() => {
    let controls: AnimationPlaybackControls;

    if (!ref1.current && !ref2.current) return;

    const resizeHandler = () => {
      const width = ref1.current.scrollWidth;

      if (direction === "L") {
        ref1.current.style.left = "0px";
        ref2.current.style.left = `${width}px`;
      }
      if (direction === "R") {
        ref1.current.style.right = "0px";
        ref2.current.style.right = `${width}px`;
      }

      const end = direction === "L" ? -width : width;

      controls = animate(value, [0, end], {
        duration: 15,
        ease: "linear",
        repeat: Infinity,
        repeatDelay: 0,
        repeatType: "loop",
      });

      if (!view) controls.pause();
    };

    resizeHandler();

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      controls.stop();
    };
  }, [value, view]);

  return (
    <div className={`w-full h-full text-[${textSize}] overflow-hidden relative font-black`}>
      <motion.span
        style={{
          x: value,
          y: "-50%",
        }}
        ref={ref1}
        className="whitespace-nowrap absolute top-[50%]"
      >
        &nbsp;{text}
      </motion.span>
      <motion.span
        style={{
          x: value,
          y: "-50%",
        }}
        ref={ref2}
        className="whitespace-nowrap absolute top-[50%]"
      >
        &nbsp;{text}
      </motion.span>
    </div>
  );
};

export default TextMarquee;
