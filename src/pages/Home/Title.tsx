import { motion } from "framer-motion";
import "./home.scss";
import { opacityYDownVisible } from "@/utils/Variants";
import { useIsLoading } from "@/stores/LoadingStore";

const Title = () => {
  const isLoading = useIsLoading();

  return (
    <section className="w-full h-full pt-[7rem] sm:pt-[20vmin] pb-[3rem] flex flex-col space-y-[2rem] sm:flex-row sm:space-y-0 text-black dark:text-white">
      <motion.div
        variants={opacityYDownVisible}
        initial="initial"
        transition={{
          duration: 1,
        }}
        animate={isLoading ? "initial" : "visible"}
        className="space-y-[1vmin] flex-1"
      >
        <p className="text-orange-500 text-[1vmax] font-bold">PORTFOLIO</p>
        <div className="text-[5vmax] font-black leading-[5vmax]">
          <h1>CREATIVE</h1>
          <h1>DEVELOPER</h1>
          <h1>JINU KIM</h1>
        </div>
      </motion.div>

      <motion.div
        variants={opacityYDownVisible}
        initial="initial"
        transition={{
          delay: 0.1,
          duration: 1,
        }}
        animate={isLoading ? "initial" : "visible"}
        className="space-y-[3vmin] flex-1 sm:self-end"
      >
        <h2 className="text-[1.6vmax]">
          Create websites that stimulate users’ curiosity. Use graphic technology for better visual
          effects.
        </h2>
        <div className="flex items-baseline sm:justify-end text-orange-500 font-bold">
          <div className="relative mr-3">
            <div className="title__arrow border-orange-500" />
            <div className="title__arrow-tail border-orange-500" />
          </div>
          <div className="text-[1vmax]">SCROLL DOWN</div>
        </div>
      </motion.div>
    </section>
  );
};

export default Title;
