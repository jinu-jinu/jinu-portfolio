import { usePathActions, usePageTransitioning } from "@/stores/PathStore";
import { sleep } from "@/utils/Utils";
import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { useEffect } from "react";

let step = 0;

const Bridge = () => {
  const pageTransitioning = usePageTransitioning();
  const handlePageTransitionEnd = usePathActions("handlePageTransitionEnd") as (v: boolean) => void;

  const count = useMotionValue(0);
  const clipPath = useTransform(
    count,
    [0, 0.5, 1],
    ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)", "inset(100% 0% 0% 0%)"]
  );

  const startCountAnimation = async () => {
    ++step;
    await animate(count, 0.5, { duration: 1, ease: "circIn" });
    await sleep(1000);
    count.set(0.5);
    ++step;
    await animate(count, 1, { duration: 1, ease: "circIn" });
  };

  useEffect(() => {
    if (pageTransitioning) void startCountAnimation();
  }, [pageTransitioning]);

  useMotionValueEvent(count, "animationComplete", () => {
    if (step === 2) {
      handlePageTransitionEnd(true);
      count.set(0);
      step = 0;
    }
  });

  return (
    <motion.div
      style={{ clipPath }}
      className="bridge flex justify-center items-center font-black text-[5vmax] text-white"
    >
      JINU
    </motion.div>
  );
};

export default Bridge;
