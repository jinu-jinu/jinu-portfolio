import { useDataDisplay, useDataDisplayActions } from "@/stores/DataDisplayStore";
import { dataDisplayElement } from "@/types";
import { motion } from "framer-motion";
import React from "react";

const variants = {
  move: { x: "100%" },
  initial: { x: "0%" },
};

const ToggleSwitch = () => {
  const display = useDataDisplay();
  const handleDataDisplay = useDataDisplayActions("handleDataDisplay");

  const toggleSwitchHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const clickedDisplay = (e.target as dataDisplayElement).dataset.display;

    if (display === clickedDisplay) return;
    handleDataDisplay(clickedDisplay);
  };

  return (
    <motion.div whileHover={{ scale: 1.1 }} className="toggle-switch" onClick={toggleSwitchHandler}>
      <motion.div
        data-display="grid"
        className={`toggle-switch__btn ${
          display === "grid" ? "text-orange-500" : "text-black dark:text-white"
        }`}
      >
        GRID
      </motion.div>
      <motion.div
        data-display="list"
        className={`toggle-switch__btn ${
          display === "list" ? "text-orange-500" : "text-black dark:text-white"
        }`}
      >
        LIST
      </motion.div>
      <motion.span
        variants={variants}
        initial="initial"
        animate={display === "grid" ? "initial" : "move"}
        className="toggle-switch__bg bg-[rgba(0,0,0,.8)] dark:bg-[rgba(255,255,255,.8)]"
      />
    </motion.div>
  );
};

export default ToggleSwitch;
