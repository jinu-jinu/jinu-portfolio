import List from "./List";
import { useState } from "react";
import "./lists.scss";
import { motion } from "framer-motion";
import { opacityYDownVisible } from "@/utils/Variants";
import FollowCursor from "../common/otherMotions/FollowCursor";
import { useIsLoading } from "@/stores/LoadingStore";
import { useProjectData, useProjectDataActions } from "@/stores/ProjectDataStore";
import { usePageTransitioning, usePathActions } from "@/stores/PathStore";

const Lists = () => {
  const projectData = useProjectData();
  const isLoading = useIsLoading();
  const pageTransitioning = usePageTransitioning();
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const handleCurrentData = useProjectDataActions("handleCurrentData");
  const handleNextPath = usePathActions("handleNextPath") as (v: string) => void;
  const handlePageTransitionWait = usePathActions("handlePageTransitionWait") as (
    v: boolean
  ) => void;
  const handlePageTransitioning = usePathActions("handlePageTransitioning") as (v: boolean) => void;

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

        const clickedData = projectData.find((data) => data.projectCode === list.id);
        if (!clickedData) return;

        handleCurrentData(clickedData);
        handleNextPath(`/project/${list.id}`);
        handlePageTransitionWait(false);
        handlePageTransitioning(true);
      }}
    >
      {projectData.map((data) => (
        <List key={data.projectCode} {...data} isHovered={isHovered} />
      ))}

      <FollowCursor trigger={!!isHovered} />
    </motion.div>
  );
};

export default Lists;
