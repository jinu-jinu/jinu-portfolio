import { CardDataType } from "@/types";
import { motion } from "framer-motion";
import { ArrowButton } from "../common/ButtonMotions";

const variants = {
  hovered: { opacity: 0.3 },
  initial: { opacity: 1 },
};

const imgVariants = {
  hovered: { opacity: 0.8 },
  initial: { opacity: 0 },
};

const List = ({
  projectCode,
  year,
  title,
  technology,
  image,
  isHovered,
}: CardDataType & {
  isHovered: null | string;
}) => {
  const hovered = isHovered === projectCode;

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate={!isHovered || hovered ? "initial" : "hovered"}
      className="list dark:border-white"
      id={projectCode}
      onClick={() => {
        if (isHovered !== projectCode) return;
        console.log("asdf", projectCode);
      }}
    >
      <div className="lg:flex-[0.2]">{year}</div>
      <div className="hidden lg:block lg:flex-[0.2]">{projectCode}</div>
      <div className="text-[24px] lg:flex-[0.3] font-black">{title}</div>
      <div className="hidden lg:block lg:flex-[0.3]">{technology}</div>

      <motion.img
        src={image}
        variants={imgVariants}
        initial="initial"
        animate={hovered ? "hovered" : "initial"}
        className="list__img center pointer-events-none w-[40vmax]"
      />

      <ArrowButton isHovered={hovered} />
    </motion.div>
  );
};

export default List;
