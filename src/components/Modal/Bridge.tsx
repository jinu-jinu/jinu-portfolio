import {
  usePathActions,
  usePageTransitioning,
  useNextPath,
  usePageTransitionEnd,
  useCurrentPath,
} from "@/stores/PathStore";
import { useCurrentData } from "@/stores/ProjectDataStore";
import { preloadImg, sleep } from "@/utils/Utils";
import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

let step = 0;

const Bridge = () => {
  const navigate = useNavigate();
  const currentData = useCurrentData();
  const currentPath = useCurrentPath();
  const nextPath = useNextPath();
  const pageTransitioning = usePageTransitioning();
  const pageTransitionEnd = usePageTransitionEnd();
  const handlePrevPath = usePathActions("handlePrevPath") as (v: string) => void;
  const handleCurrentPath = usePathActions("handleCurrentPath") as (v: string) => void;
  const handlePageTransitionWait = usePathActions("handlePageTransitionWait") as (
    v: boolean
  ) => void;
  const handlePageTransitioning = usePathActions("handlePageTransitioning") as (v: boolean) => void;
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
    if (currentData?.project_images) await preloadImg(currentData.project_images);
    await sleep(500);
    count.set(0.5);
    window.scrollTo(0, 0);
    ++step;
    await animate(count, 1, { duration: 1, ease: "circIn" });
  };

  useEffect(() => {
    if (pageTransitioning) {
      void startCountAnimation();
      handlePrevPath(currentPath);
    }
  }, [pageTransitioning]);

  useEffect(() => {
    if (pageTransitionEnd) {
      handlePageTransitionWait(true);
      navigate(nextPath!);
      handleCurrentPath(nextPath!);
      handlePageTransitionEnd(false);
      handlePageTransitioning(false);
    }
  }, [pageTransitionEnd]);

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
