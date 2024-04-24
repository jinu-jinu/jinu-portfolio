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
      initial={{ opacity: 0 }}
      animate={
        currentPath !== "/about"
          ? { opacity: 0 }
          : pageTransitioning
          ? { opacity: 0 }
          : { opacity: 1 }
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

/*
  블라인드는 제일 마지막에만 하는걸로 하고
  텍스트 업, 스케일로 변경하기

  폰트 prompt체로 변경하기

  스크롤 애니메이션과 웹그래픽스를 사용해서
  시선을 끄는 웹사이트를 제작합니다

  안녕하세요 크리에이티브 개발자 김진우입니다 스크롤 애니메이션과 웹그래픽스로 시선을 사로잡는 웹사이트를 만듭니다

*/
