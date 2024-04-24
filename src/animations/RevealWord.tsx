import { motion } from "framer-motion";

const variants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  initial: {
    opacity: 0,
    y: 20,
  },
};

const Word = ({ word, classList }: { word: string | JSX.Element; classList: string }) => {
  return (
    <motion.div className={classList} variants={variants}>
      {word}
    </motion.div>
  );
};

const RevealWord = ({
  childs,
  trigger,
  stagger = 0.1,
  delay = 0,
  classList,
}: {
  childs: { word: string | JSX.Element; classList: string; uId: string }[];
  trigger: boolean;
  delay?: number;
  stagger?: number;

  classList: string;
}) => {
  return (
    <motion.div
      className={`text-black dark:text-white ${classList}`}
      initial="initial"
      animate={trigger ? "visible" : "initial"}
      variants={{
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
        hidden: {},
      }}
    >
      {childs.map((child, i) => (
        <Word key={`${child.uId}-${i}`} word={child.word} classList={child.classList} />
      ))}
    </motion.div>
  );
};

export default RevealWord;
