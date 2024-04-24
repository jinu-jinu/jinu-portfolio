import { MotionValue, motion, useScroll, useTransform } from "framer-motion";

const Letter = ({
  word,
  scroll,
  idx,
  len,
}: {
  word: string;
  idx: number;
  len: number;
  scroll: MotionValue<number>;
}) => {
  const opacity = useTransform(scroll, [(idx - 1) / len, idx / len], [0, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block whitespace-pre">
      {word}
    </motion.span>
  );
};

const RevealScroll = ({ text }: { text: string }) => {
  const textArr = [...text];
  const len = textArr.length;
  const { scrollYProgress } = useScroll({
    offset: ["30vh", "70vh"],
  });

  return (
    <motion.p>
      {[...text].map((word, i) => (
        <Letter key={`${word}-${i}`} word={word} idx={i + 1} len={len} scroll={scrollYProgress} />
      ))}
    </motion.p>
  );
};

export default RevealScroll;
