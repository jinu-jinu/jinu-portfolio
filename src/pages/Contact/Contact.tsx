import { Fill } from "@/components/common/textMotions";
import { useCurrentPath, usePageTransitionEnd, usePageTransitioning } from "@/stores/PathStore";
import { motion } from "framer-motion";

const Contact = () => {
  const pageTransitionEnd = usePageTransitionEnd();
  const pageTransitioning = usePageTransitioning();
  const currentPath = useCurrentPath();

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={
        currentPath !== "/contact"
          ? { opacity: 0, filter: "blur(10px)" }
          : pageTransitioning
          ? { opacity: 0, filter: "blur(10px)" }
          : { opacity: 1, filter: "blur(0px)" }
      }
      className="w-full h-[100dvh] flex justify-center p-6"
    >
      <div className="w-full max-w-[50vmax] relative flex flex-col">
        <motion.div
          transition={{ duration: 0.5 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 flex flex-col justify-center items-start"
        >
          <Fill
            text="HELLO"
            trigger={!pageTransitionEnd}
            color="text-orange-500"
            delay={0.8}
            duration={1}
          />
          <div className="text-[1.5vmax] leading-[1.7vmax]">
            <p>I'm based in Seoul</p>
            <p>Let's create a space together!</p>
          </div>
        </motion.div>
        <motion.div
          transition={{ delay: 0.2, duration: 0.5 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 flex flex-col justify-center items-end text-[1.5vmax] leading-[1.7vmax]"
        >
          <p>kjwkjw5153@gmail.com</p>
          <p>010-8738-4513</p>
          <p>JINU KIM</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
