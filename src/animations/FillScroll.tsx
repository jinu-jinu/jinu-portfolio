import { motion, useScroll, useTransform } from "framer-motion";

const FillScroll = ({ text, offset }: { text: string; offset: any }) => {
  const { scrollYProgress } = useScroll({
    offset,
  });

  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="fill-text text-2xl">
      {text}
      <motion.span className="fill-text__color" style={{ width }}>
        {text}
      </motion.span>
    </div>
  );
};

export default FillScroll;
