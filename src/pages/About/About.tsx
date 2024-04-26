import { useCurrentPath, usePageTransitioning } from "@/stores/PathStore";
import Hero from "./Hero";
import "./about.scss";
import { motion } from "framer-motion";
import Section1 from "./Section1";
import Section2 from "./Section2";

const About = () => {
  const pageTransitioning = usePageTransitioning();
  const currentPath = useCurrentPath();

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={
        currentPath !== "/about"
          ? { opacity: 0, filter: "blur(10px)" }
          : pageTransitioning
          ? { opacity: 0, filter: "blur(10px)" }
          : { opacity: 1, filter: "blur(0px)" }
      }
      className="w-full h-auto"
    >
      <Hero />
      <Section1 />
      <Section2 />
    </motion.div>
  );
};

export default About;
