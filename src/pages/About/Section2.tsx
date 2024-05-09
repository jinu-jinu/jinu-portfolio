import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TextMarquee from "./TextMarquee";

const Blind = ({
  idx,
  len,
  scrollYProgress,
  text,
}: {
  idx: number;
  len: number;
  text: string;
  scrollYProgress: MotionValue<number>;
}) => {
  const height = useTransform(
    scrollYProgress,
    [idx === 0 ? idx / len : (idx - 0.8) / len, (idx + 1) / len],
    ["0%", "10%"]
  );
  const opacity = useTransform(
    scrollYProgress,
    [idx === 0 ? idx / len : (idx - 0.8) / len, (idx + 1) / len],
    [0, 1]
  );

  return (
    <motion.div
      style={{
        height,
        opacity,
      }}
      className={`w-full border-b border-[#000] dark:border-[#fff] bg-[#fff] dark:bg-[#000] ${
        idx + 1 === len ? "text-orange-500 border-none" : ""
      }`}
    >
      <TextMarquee direction={idx % 2 ? "L" : "R"} text={text} textSize="text-[4vmax]" />
    </motion.div>
  );
};

const Section2 = () => {
  const ref = useRef<HTMLDivElement>(null!);
  const { scrollYProgress } = useScroll({
    offset: ["start", "center start"],
    target: ref,
  });

  const arr = [
    "HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO",
    "I'M JINU I'M JINU I'M JINU I'M JINU I'M JINU I'M JINU",
    "KIM KIM KIM KIM KIM KIM KIM KIM KIM KIM KIM KIM KIM KIM",
    "MAKE WONDERFUL MAKE WONDERFUL MAKE WONDERFUL MAKE WONDERFUL",
    "WEBSITE WEBSITE WEBSITE WEBSITE WEBSITE WEBSITE WEBSITE WEBSITE",
    "#15 #15 #15 #15 #15 #15 #15 #15 #15 #15 #15 #15 #15 #15",
    "SCROLL ANIMATION SCROLL ANIMATION SCROLL ANIMATION SCROLL ANIMATION",
    "WEBGL WEBGL WEBGL WEBGL WEBGL WEBGL WEBGL WEBGL WEBGL WEBGL WEBGL",
    "CALL ME CALL ME CALL ME CALL ME CALL ME CALL ME CALL ME CALL ME",
    "END END END END END END END END END END END END END END",
  ];

  return (
    <div ref={ref} className="w-full h-[400vh] relative">
      <div className="w-full h-screen flex flex-col sticky top-0 left-0">
        {arr.map((text, i) => (
          <Blind key={i} idx={i} len={arr.length} scrollYProgress={scrollYProgress} text={text} />
        ))}
      </div>
    </div>
  );
};

export default Section2;
