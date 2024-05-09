import { usePageTransitioning, usePathActions } from "@/stores/PathStore";
import { useProjectDataActions } from "@/stores/ProjectDataStore";
import { motion } from "framer-motion";

const NextProject = ({
  projectCode,
  projectName,
}: {
  projectCode: string;
  projectName: string;
}) => {
  const pageTransitioning = usePageTransitioning();
  const handleCurrentData = useProjectDataActions("handleCurrentData") as (v: string) => void;
  const handleNextPath = usePathActions("handleNextPath") as (v: string) => void;
  const handlePageTransitionWait = usePathActions("handlePageTransitionWait") as (
    v: boolean
  ) => void;
  const handlePageTransitioning = usePathActions("handlePageTransitioning") as (v: boolean) => void;

  const clickHandler = () => {
    if (pageTransitioning) return;

    handlePageTransitionWait(false);
    handlePageTransitioning(true);
    handleCurrentData(projectCode);
    handleNextPath(`/project/${projectCode}`);
  };

  return (
    <div className="w-full h-[50vh] flex flex-col justify-center items-center">
      <div className="text-[5vmax] font-black text-orange-500">NEXT</div>
      <motion.button
        whileHover={{
          scale: 1.1,
        }}
        whileTap={{
          scale: 0.5,
          filter: "blur(10px)",
        }}
        onClick={clickHandler}
        className="bg-black text-white font-bold rounded-xl px-10 py-5 dark:bg-white dark:text-black"
      >
        {projectName}
      </motion.button>
    </div>
  );
};

export default NextProject;
