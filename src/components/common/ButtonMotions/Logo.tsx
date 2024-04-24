import { useScroll, useTransform, motion } from "framer-motion";

const Logo = () => {
  const { scrollYProgress } = useScroll();

  const t1 = useTransform(
    scrollYProgress,
    [0.0, 0.5],
    ["inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"]
  );
  const t2 = useTransform(
    scrollYProgress,
    [0.0, 0.5, 1],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"]
  );
  const t3 = useTransform(
    scrollYProgress,
    [0.5, 1],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );

  return (
    <motion.div
      className="relative w-[50px] h-[50px] logo__container"
      whileHover={{ scale: 1.2 }}
      transition={{ type: "spring", stiffness: 150 }}
    >
      <motion.div
        style={{
          clipPath: t1,
        }}
        className="logo bg-black dark:bg-white"
      >
        <div className="logo__text text-white dark:text-black">JINU</div>
      </motion.div>
      <motion.div
        style={{
          clipPath: t2,
        }}
        className="logo bg-white dark:bg-black"
      >
        <div className="logo__text text-black dark:text-white">JINU</div>
      </motion.div>
      <motion.div
        style={{
          clipPath: t3,
        }}
        className="logo bg-black dark:bg-white"
      >
        <div className="logo__text text-white dark:text-black">JINU</div>
      </motion.div>
    </motion.div>
  );
};

export default Logo;
