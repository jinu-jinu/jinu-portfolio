import Card from "./Card";
import "./cards.scss";
import { motion } from "framer-motion";
import { opacityYDownVisible } from "@/utils/Variants";
import { useState } from "react";
import { useIsLoading } from "@/stores/LoadingStore";
import { usePageTransitioning, usePathActions } from "@/stores/PathStore";
import { useProjectData, useProjectDataActions } from "@/stores/ProjectDataStore";

const Cards = () => {
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
      className="w-full grid grid-cols-1 gap-y-14 lg:grid-cols-2 lg:gap-x-14"
      onMouseMove={(e) => {
        const card = (e.target as HTMLElement).closest(".home-project-card");
        if (!card) return setIsHovered("gap");
        if (isHovered === card.id) return;
        setIsHovered(card.id);
      }}
      onMouseLeave={() => {
        setIsHovered(null);
      }}
      onClick={(e) => {
        const card = (e.target as HTMLElement).closest(".home-project-card");
        if (!card || pageTransitioning) return;

        handleCurrentData(card.id);
        handleNextPath(`/project/${card.id}`);
        handlePageTransitionWait(false);
        handlePageTransitioning(true);
      }}
    >
      {projectData.map((data) => {
        return <Card {...data} key={data.project_code} isHovered={isHovered} />;
      })}
    </motion.div>
  );
};

export default Cards;
