import { motion } from "framer-motion";

const Fill = ({
  trigger,
  text,
  color,
  delay,
  duration,
}: {
  trigger: boolean;
  text: string;
  color: string;
  delay: number;
  duration: number;
}) => {
  const variants = {
    visible: {
      width: "100%",
      transition: {
        delay,
        duration,
      },
    },
    initial: { width: "0%" },
  };

  return (
    <motion.p className="fill-text font-black text-[#bbb] dark:text-[#444] text-[5vmax]">
      {text}
      <motion.span
        className={`fill-text__color ${color}`}
        variants={variants}
        initial="initial"
        animate={trigger ? "visible" : "initial"}
        exit="initial"
      >
        {text}
      </motion.span>
    </motion.p>
  );
};

export default Fill;
