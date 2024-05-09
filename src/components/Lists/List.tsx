import { ProjectDataType } from "@/types";
import { motion } from "framer-motion";
import { ArrowButton } from "../common/ButtonMotions";
import { imgUrl } from "@/utils/Utils";

const variants = {
  hovered: { opacity: 0.3 },
  initial: { opacity: 1 },
};

const imgVariants = {
  hovered: { opacity: 0.8 },
  initial: { opacity: 0 },
};

const List = ({
  project_code,
  year,
  name,
  technologies,
  project_main_image,
  isHovered,
}: ProjectDataType & {
  isHovered: null | string;
}) => {
  const hovered = isHovered === project_code;

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate={!isHovered || hovered ? "initial" : "hovered"}
      className="home-project-list dark:border-white"
      id={project_code}
      onClick={() => {
        if (isHovered !== project_code) return;
        console.log("asdf", project_code);
      }}
    >
      <div className="lg:flex-[0.2]">{year}</div>
      <div className="hidden lg:block lg:flex-[0.2]">{project_code}</div>
      <div className="text-[24px] lg:flex-[0.3] font-black">{name}</div>
      <div className="hidden lg:block lg:flex-[0.3]">{technologies}</div>

      <motion.img
        src={imgUrl(project_main_image[0].url)}
        variants={imgVariants}
        initial="initial"
        animate={hovered ? "hovered" : "initial"}
        width="100%"
        height="100%"
        className="home-project-list__img center pointer-events-none w-[40vmax]"
      />

      <ArrowButton isHovered={hovered} />
    </motion.div>
  );
};

export default List;
