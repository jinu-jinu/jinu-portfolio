import { motion } from "framer-motion";
import { UpDownClick } from "@/components/common/textMotions";

const DarkMode = () => {
  return (
    <motion.div className="dark-mode" whileHover={{ scale: 1.3 }}>
      <div className="dark-mode__circle bg-[rgba(0,0,0,.8)] dark:bg-[rgba(255,255,255,.8)] text-white dark:text-black">
        <div className="dark-mode__text w-full h-full">
          <UpDownClick />
        </div>
      </div>
    </motion.div>
  );
};

export default DarkMode;
