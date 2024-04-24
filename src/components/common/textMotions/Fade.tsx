import { motion } from "framer-motion";

const Fade = ({
  text,
  trigger,
  direction,
  duration,
  delay,
  classList,
}: {
  duration: number;
  delay: number;
  text: string;
  classList: string;
  trigger: boolean;
  direction: "LR" | "RL" | "TB" | "BT";
}) => {
  const variants = {
    visible: {
      x: "0%",
      y: "0%",
      transition: {
        duration,
        delay,
      },
    },
    initial: {
      x: direction === "TB" || direction === "BT" ? "0%" : direction === "LR" ? "-100%" : "100%",
      y: direction === "LR" || direction === "RL" ? "0%" : direction === "TB" ? "-100%" : "100%",
    },
  };

  return (
    <div className={`overflow-hidden ${classList}`}>
      <motion.p
        initial="initial"
        animate={trigger ? "visible" : "initial"}
        exit="initial"
        variants={variants}
      >
        {text}
      </motion.p>
    </div>
  );
};

export default Fade;
