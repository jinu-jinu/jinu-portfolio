import { MotionValue, useTransform, motion, useScroll } from "framer-motion";
import { useRef } from "react";

const Text1 = ({
  text,
  scrollYProgress,
  idx,
  len,
}: {
  text: string;
  scrollYProgress: MotionValue<number>;
  idx: number;
  len: number;
}) => {
  const y = useTransform(scrollYProgress, [idx / len, (idx + 1) / len], ["0%", "-110%"]);
  const scale = useTransform(scrollYProgress, [(idx - 1) / len, idx / len], [0, 1]);

  return (
    <motion.div
      style={{
        y,
        scale: idx === 0 ? 1 : scale,
        transformOrigin: "left bottom",
      }}
      className="font-black text-[6vmax] h-[6.5vmax] flex justify-start items-center absolute top-0 left-[10%]"
    >
      {text}
    </motion.div>
  );
};

const Text2 = ({
  text,
  scrollYProgress,
  idx,
  len,
}: {
  text: string;
  scrollYProgress: MotionValue<number>;
  idx: number;
  len: number;
}) => {
  const maxY = -len * 100;
  const idxY = -(idx - 1) * 100;

  const scale = useTransform(scrollYProgress, [(idx - 1) / len, idx / len], [1, 0]);
  const y = useTransform(scrollYProgress, (e) => {
    if (idx < 2) return "0%";

    const currentY = e * maxY;

    if (currentY <= idxY) return `${idxY}%`;
    return `${currentY}%`;
  });

  return (
    <motion.div
      style={{
        y,
        scale: idx === 0 ? 1 : scale,
        transformOrigin: "right top",
      }}
      className="font-black text-[6vmax] h-[6.5vmax] flex justify-start items-center"
    >
      {text}
    </motion.div>
  );
};

const Section1 = () => {
  const ref = useRef<HTMLDivElement>(null!);
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end"],
    target: ref,
  });

  const arr = [
    "ABOUT",
    "안녕하세요",
    "크리에이티브",
    "개발자",
    "김진우입니다",
    "스크롤",
    "애니메이션과",
    "웹그래픽스로",
    "시선을",
    "사로잡는",
    "웹사이트를",
    "만듭니다",
  ];

  return (
    <div ref={ref} className="relative w-full h-[300vh]">
      <div className=" w-full h-screen sticky top-0 left-0">
        <div className="absolute top-[15%] left-[0%] w-full overflow-hidden h-[50%]">
          {arr.map((text, i, arr) => (
            <Text1 key={i} text={text} idx={i} len={arr.length} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        <div className="absolute top-[45%] right-0 flex flex-col items-end mr-[10%]">
          {arr.map((text, i, arr) => (
            <Text2 key={i} text={text} idx={i} len={arr.length} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section1;
