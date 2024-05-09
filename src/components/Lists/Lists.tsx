import List from "./List";
import { useState } from "react";
import "./lists.scss";
import { motion } from "framer-motion";
import { opacityYDownVisible } from "@/utils/Variants";
import { useIsLoading } from "@/stores/LoadingStore";
import { useProjectData, useProjectDataActions } from "@/stores/ProjectDataStore";
import { usePageTransitioning, usePathActions } from "@/stores/PathStore";

const Lists = () => {
  const projectData = useProjectData();
  const isLoading = useIsLoading();
  const pageTransitioning = usePageTransitioning();
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const handleCurrentData = useProjectDataActions("handleCurrentData") as (v: string) => void;
  const handleNextPath = usePathActions("handleNextPath") as (v: string) => void;
  const handlePageTransitionWait = usePathActions("handlePageTransitionWait") as (
    v: boolean
  ) => void;
  const handlePageTransitioning = usePathActions("handlePageTransitioning") as (v: boolean) => void;

  if (!projectData) return null;

  return (
    <motion.div
      variants={opacityYDownVisible}
      initial="initial"
      transition={{
        delay: 0.2,
        duration: 1,
      }}
      animate={isLoading ? "initial" : "visible"}
      onMouseMove={(e) => {
        const elem = e.target as HTMLElement;
        if (elem.tagName === "IMG") return;
        const list = elem.closest(".home-project-list");

        if (!list) return setIsHovered(null);
        if (isHovered === list.id) return;
        setIsHovered(list.id);
      }}
      className="space-y-4"
      onMouseLeave={() => {
        setIsHovered(null);
      }}
      onClick={(e) => {
        const list = (e.target as HTMLElement).closest(".home-project-list");
        if (!list || pageTransitioning) return;

        handleCurrentData(list.id);
        handleNextPath(`/project/${list.id}`);
        handlePageTransitionWait(false);
        handlePageTransitioning(true);
      }}
    >
      {projectData.map((data) => (
        <List key={data.project_code} {...data} isHovered={isHovered} />
      ))}
    </motion.div>
  );
};

export default Lists;
