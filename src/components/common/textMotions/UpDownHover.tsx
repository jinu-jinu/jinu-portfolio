import { motion } from "framer-motion";

const UpDownHover = ({
  text,
  isHovered,
  direction,
}: {
  text: string;
  isHovered: boolean;
  direction: "up" | "down";
}) => {
  const variants = {
    hovered: { y: direction === "up" ? "100%" : "-100%" },
    initial: { y: "0%" },
  };

  return (
    <div className="relative overflow-hidden">
      <motion.div variants={variants} initial="initial" animate={isHovered ? "hovered" : "initial"}>
        {text}
      </motion.div>
      <motion.div
        variants={variants}
        initial="initial"
        animate={isHovered ? "hovered" : "initial"}
        className={`absolute top-[${direction === "up" ? "100%" : "-100%"}] left-0`}
      >
        {text}
      </motion.div>
    </div>
  );
};

export default UpDownHover;
