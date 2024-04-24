import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const variants = {
  visible: {
    opacity: 1,
    y: 0,
  },
  initial: {
    opacity: 0,
    y: 20,
  },
};

const Letter = ({ word }: { word: string }) => {
  return (
    <motion.span className="inline-block whitespace-pre" variants={variants}>
      {word}
    </motion.span>
  );
};

// 부모에만 설정하면 된다. 자식은 variants만 넣으면 된다
// 트랜스폼이 동작안하면 inline 속성은 inline-block으로 변경해야함
const Reveal = ({ text, trigger }: { text: string; trigger: boolean }) => {
  const controls = useAnimation();

  useEffect(() => {
    let key: number;
    const show = () => {
      key = setTimeout(async () => {
        await controls.start("visible");
        await controls.start("initial");
      }, 1000);
    };

    if (trigger) show();
    else void controls.start("initial");

    return () => {
      controls.stop();
      clearTimeout(key);
    };
  }, [trigger, controls]);

  return (
    <motion.p
      initial="initial"
      animate={controls}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.02,
          },
        },
        hidden: {},
      }}
    >
      {[...text].map((word, i) => (
        <Letter key={`${word}-${i}`} word={word} />
      ))}
    </motion.p>
  );
};

export default Reveal;
