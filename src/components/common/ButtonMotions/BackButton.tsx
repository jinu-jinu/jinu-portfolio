import { usePageTransitioning, usePathActions, usePrevPath } from "@/stores/PathStore";
import { motion } from "framer-motion";

const BackButton = () => {
  const prevPath = usePrevPath();
  const pageTransitioning = usePageTransitioning();
  const handleNextPath = usePathActions("handleNextPath") as (v: string) => void;
  const handlePageTransitionWait = usePathActions("handlePageTransitionWait") as (
    v: boolean
  ) => void;
  const handlePageTransitioning = usePathActions("handlePageTransitioning") as (v: boolean) => void;

  const clickHandler = () => {
    if (!prevPath || pageTransitioning) return;

    handleNextPath(prevPath);
    handlePageTransitionWait(false);
    handlePageTransitioning(true);
  };

  return (
    <motion.div
      onClick={clickHandler}
      whileHover={{ scale: 1.3 }}
      className="cursor-pointer w-[24px] h-[24px] rounded-[6px] flex justify-center items-center bg-[rgba(0,0,0,.8)] dark:bg-[rgba(255,255,255,.8)]"
    >
      <svg viewBox="-5 0 32 32" className="w-[20px] h-[20px]">
        <path
          className="fill-white dark:fill-black"
          d="M21.531 19.156v-6.719c0-0.813-0.594-1.406-1.406-1.406h-7.813v-5.313c0-0.5-0.25-0.844-0.688-1.063-0.156-0.031-0.313-0.063-0.438-0.063-0.313 0-0.563 0.094-0.75 0.313l-10.125 10.125c-0.438 0.375-0.406 1.125 0 1.563l10.125 10.125c0.625 0.688 1.875 0.219 1.875-0.813v-5.375h7.813c0.813 0 1.406-0.563 1.406-1.375z"
        />
      </svg>
    </motion.div>
  );
};

export default BackButton;
