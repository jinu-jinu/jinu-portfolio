import { useIsAssetDownloaded, useLoadingActions } from "@/stores/LoadingStore";
import { animate, useMotionValue, motion, useTransform, useMotionValueEvent } from "framer-motion";
import { useEffect } from "react";

const Loading = () => {
  const isAssetDownloaded = useIsAssetDownloaded();
  const handleLoading = useLoadingActions("handleLoading");

  const count1 = useMotionValue(0);
  const count2 = useMotionValue(0);

  const first = useTransform(count1, (e) => {
    const round = Math.round(e);
    return round < 100 ? round * 0 : 1 % round;
  });
  const rounded = useTransform(count1, (e) => {
    const round = Math.round(e);
    if (round < 10) return `0${round}`;
    if (round === 100) return "00";
    return `${round}`;
  });

  const clipPath = useTransform(count2, [0, 1], ["inset(0% 0% 0% 0%)", "inset(100% 0% 0% 0%)"]);

  const startCountAnimation = async () => {
    await animate(count1, 100, { duration: 4, ease: "easeInOut" });
    await animate(count2, 1, { duration: 1, ease: "circOut" });
  };

  useEffect(() => {
    if (isAssetDownloaded) void startCountAnimation();
  }, [isAssetDownloaded]);

  useMotionValueEvent(count2, "animationComplete", () => {
    handleLoading(false);
  });

  return (
    <motion.div style={{ clipPath }} className="loading">
      <motion.div>{first}</motion.div>
      <motion.div>{rounded}</motion.div>
    </motion.div>
  );
};

export default Loading;
