import { opacityVar } from "@/utils/Variants";
import { motion } from "framer-motion";

const ArrowButton = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <div className={`arrow-button ${isHovered ? "bg-orange-500" : "bg-white"}`}>
      <motion.div
        variants={opacityVar}
        initial={"initial"}
        animate={isHovered ? "hover" : "initial"}
        className="w-[8px] h-[8px] absolute arrow-button__arrow"
      />
      <motion.div
        variants={opacityVar}
        initial={"initial"}
        animate={isHovered ? "hover" : "initial"}
        className="w-[8px] h-[8px] absolute arrow-button__arrow-tail"
      />
      <motion.div
        variants={opacityVar}
        initial={"hover"}
        animate={isHovered ? "initial" : "hover"}
        className="bg-black w-[6px] h-[6px] rounded-full absolute center"
      />
    </div>
  );
};

export default ArrowButton;
