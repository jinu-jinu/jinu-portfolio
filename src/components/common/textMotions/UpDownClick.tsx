import { useTheme, useThemeActions } from "@/stores/ThemeStore";
import { isDarkMode } from "@/utils/Utils";
import { motion } from "framer-motion";
import { useState } from "react";

const variants = {
  hover: {
    y: "-100%",
  },
  initial: {
    y: "0%",
  },
};

const UpDownClick = () => {
  const theme = useTheme();
  const handleTheme = useThemeActions("handleTheme");
  const [clicked, setClicked] = useState(false);

  return (
    <div
      onClick={() => {
        setClicked((prev) => !prev);
        handleTheme(theme === "dark" ? "light" : "dark");
      }}
      className="relative overflow-hidden w-full h-full flex flex-col items-center"
    >
      <motion.h1 variants={variants} initial="initial" animate={clicked ? "hover" : "initial"}>
        {isDarkMode() === "dark" ? "D" : "L"}
      </motion.h1>
      <motion.h1 variants={variants} initial="initial" animate={clicked ? "hover" : "initial"}>
        {isDarkMode() === "dark" ? "L" : "D"}
      </motion.h1>
    </div>
  );
};

export default UpDownClick;
