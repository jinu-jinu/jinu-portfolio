import { CardData } from "@/data";
import List from "./List";
import { useState } from "react";
import "./lists.scss";
import { motion } from "framer-motion";
import { opacityYDownVisible } from "@/utils/Variants";
import FollowCursor from "../common/otherMotions/FollowCursor";
import { useIsLoading } from "@/stores/LoadingStore";

const Lists = () => {
  const isLoading = useIsLoading();
  const [isHovered, setIsHovered] = useState<string | null>(null);

  return (
    <motion.div
      variants={opacityYDownVisible}
      initial="initial"
      transition={{
        delay: 0.2,
        duration: 1,
      }}
      animate={isLoading ? "initial" : "visible"}
      onMouseMove={(e) => {
        const elem = e.target as HTMLElement;
        if (elem.tagName === "IMG") return;
        const list = elem.closest(".list");

        if (!list) return setIsHovered(null);
        if (isHovered === list.id) return;
        setIsHovered(list.id);
      }}
      className="space-y-4"
      onMouseLeave={() => {
        setIsHovered(null);
      }}
    >
      {CardData.map((data) => (
        <List key={data.projectCode} {...data} isHovered={isHovered} />
      ))}

      <FollowCursor trigger={!!isHovered} />
    </motion.div>
  );
};

export default Lists;
