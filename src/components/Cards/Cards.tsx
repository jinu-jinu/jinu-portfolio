import Card from "./Card";
import "./cards.scss";
import { motion } from "framer-motion";
import { opacityYDownVisible } from "@/utils/Variants";
import { useState } from "react";
import { useIsLoading } from "@/stores/LoadingStore";
import { usePageTransitioning, usePathActions } from "@/stores/PathStore";
import { useProjectData, useProjectDataActions } from "@/stores/ProjectDataStore";

const Cards = () => {
  const projectData = useProjectData();
  const isLoading = useIsLoading();
  const pageTransitioning = usePageTransitioning();
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const handleCurrentData = useProjectDataActions("handleCurrentData");
  const handleNextPath = usePathActions("handleNextPath") as (v: string) => void;
  const handlePageTransitionWait = usePathActions("handlePageTransitionWait") as (
    v: boolean
  ) => void;
  const handlePageTransitioning = usePathActions("handlePageTransitioning") as (v: boolean) => void;

  return (
    <motion.div
      variants={opacityYDownVisible}
      initial="initial"
      transition={{
        delay: 0.2,
        duration: 1,
      }}
      animate={isLoading ? "initial" : "visible"}
      className="w-full grid grid-cols-1 gap-y-14 lg:grid-cols-2 lg:gap-x-14"
      onMouseMove={(e) => {
        const card = (e.target as HTMLElement).closest(".home-project-card");
        if (!card) return setIsHovered("gap");
        if (isHovered === card.id) return;
        setIsHovered(card.id);
      }}
      onMouseLeave={() => {
        setIsHovered(null);
      }}
      onClick={(e) => {
        const card = (e.target as HTMLElement).closest(".home-project-card");
        if (!card || pageTransitioning) return;

        handleCurrentData(card.id);
        handleNextPath(`/project/${card.id}`);
        handlePageTransitionWait(false);
        handlePageTransitioning(true);
      }}
    >
      {projectData.map((data) => {
        return <Card {...data} key={data.projectCode} isHovered={isHovered} />;
      })}
    </motion.div>
  );
};

export default Cards;

/*
  블렌더

  1. 바이킹(애니메이션)
  2. 자이로 스윙(애니메이션)
  3. 관람차(애니메이션)
  4. 워크맨(하드서피스 모델링) = 제품 홍보 페이지 하나 만들기
  5. 빈티지 카(섭디 모델링) = 커스텀 페이지 하나 만들기
  6. 믹시티(로우폴리, 실제 배경 커버) 
  7. 믹스룸(실제 배경 커버, 섭페 텍스쳐)

  그래픽

  1. fbo 파티클
  2. 레이마칭
  3. 커서를 따라오는 fbo 파티클
  4. 유체 시뮬레이션 
  
  웹 사이트

  1. 믹스룸
  2. 이번꺼
*/

/*
    작은 화면 = 한줄로

    노트북 이상 = 두줄

    패턴1 = 왼쪽 크고, 오른쪽 작고, 아래 오른쪽 한 줄
    패턴2 = 왼쪽 작고, 오른쪽 크고, 아래 왼쪽 한 줄
  */
