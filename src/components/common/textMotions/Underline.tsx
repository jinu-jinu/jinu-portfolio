import { useCurrentPath } from "@/stores/PathStore";
import { motion } from "framer-motion";
import { useState } from "react";

const variants = {
  hover: {
    width: "100%",
  },
  initial: {
    width: "0%",
  },
};

const Underline = ({ title, path }: { title: string; path: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const currentPath = useCurrentPath();

  return (
    <div
      className={`relative ${
        currentPath === path ? "text-orange-500" : "text-white dark:text-black"
      }`}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {title}
      <motion.span
        variants={variants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
        className={`${
          currentPath === path ? "bg-orange-500" : "bg-white dark:bg-black"
        } absolute bottom-[-4px] left-0 h-[2px]`}
      />
    </div>
  );
};

export default Underline;
