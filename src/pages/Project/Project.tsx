import { useCurrentData, useProjectData } from "@/stores/ProjectDataStore";
import "./project.scss";
import Title from "./Title";
import Images from "./Images";
import { motion } from "framer-motion";
import NextProject from "./NextProject";
import { usePageTransitioning } from "@/stores/PathStore";
import Footer from "@/components/Footer/Footer";

const Project = () => {
  const currentData = useCurrentData();
  const projectData = useProjectData();
  const pageTransitioning = usePageTransitioning();

  if (!currentData || !projectData) return null;

  const nextProjectIdx = currentData.idx === projectData.length ? 0 : currentData.idx;
  const nextProject = projectData[nextProjectIdx];

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={
        pageTransitioning
          ? { opacity: 0, filter: "blur(10px)" }
          : { opacity: 1, filter: "blur(0px)" }
      }
      className="w-full h-auto px-[24px] md:px-[48px] lg:px-[64px] pt-[7rem] sm:pt-[20vmin] lg:pt-0"
    >
      <div className="w-full space-y-[2rem] flex flex-col items-center lg:flex-row lg:items-start lg:space-y-0">
        <Title {...currentData} />
        <Images images={currentData.project_images} />
      </div>

      <NextProject projectCode={nextProject.project_code} projectName={nextProject.name} />

      <Footer />
    </motion.div>
  );
};

export default Project;
