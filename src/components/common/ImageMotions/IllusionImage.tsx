import { imgUrl } from "@/utils/Utils";
import { useScroll, useTransform, motion } from "framer-motion";

const variants = {
  hovered: { filter: "saturate(1)" },
  initial: { filter: "saturate(0)" },
};

const IllusionImage = ({ img, hovered }: { img: string; hovered: boolean }) => {
  const { scrollYProgress } = useScroll({
    offset: ["start", "end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <motion.img
      variants={variants}
      initial="initial"
      animate={hovered ? "hovered" : "initial"}
      style={{
        y,
      }}
      width="100%"
      height="100%"
      src={imgUrl(img)}
      className="w-[100%] h-[180%] object-cover saturate(0)"
    />
  );
};

export default IllusionImage;
