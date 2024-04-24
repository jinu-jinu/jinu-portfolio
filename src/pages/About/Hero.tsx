import { usePageTransitionEnd } from "@/stores/PathStore";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import { DoubleText, SingleText, SlotText } from "./TextMotions";
import { xVar, yVar } from "./variants";

const Hero = () => {
  const pageTransitionEnd = usePageTransitionEnd();

  const l1t1Control = useAnimationControls();
  const l1t2Control = useAnimationControls();
  const l1t3Control = useAnimationControls();

  const l2t1Control = useAnimationControls();
  const l2t2Control = useAnimationControls();
  const l2t3Control = useAnimationControls();
  const l2t4Control = useAnimationControls();

  const l3t1Control = useAnimationControls();
  const l3t2Control = useAnimationControls();
  const l3t3Control = useAnimationControls();

  const l4t1Control = useAnimationControls();
  const l4t2Control = useAnimationControls();
  const l4t3Control = useAnimationControls();

  useEffect(() => {
    const tl = () => {
      void l1t1Control.start("animate");
      void l1t2Control.start("animate");
      void l1t3Control.start("animate");

      void l2t1Control.start("animate");
      void l2t2Control.start("animate");
      void l2t3Control.start("animate");
      void l2t4Control.start("animate");

      void l3t1Control.start("animate");
      void l3t2Control.start("animate");
      void l3t3Control.start("animate");

      void l4t1Control.start("animate");
      void l4t2Control.start("animate");
      void l4t3Control.start("animate");
    };

    if (!pageTransitionEnd) tl();
  }, [
    l1t1Control,
    l1t2Control,
    l1t3Control,
    l2t1Control,
    l2t2Control,
    l2t3Control,
    l2t4Control,
    l3t1Control,
    l3t2Control,
    l3t3Control,
    l4t1Control,
    l4t2Control,
    l4t3Control,
    pageTransitionEnd,
  ]);

  const springOpt = { stiffness: 50, mass: 1, damping: 10 };

  const delays = [0, 0.4, 0.8, 1.2, 1.2, 1.6, 1.8, 2.2, 2.5, 2.8, 3.2, 3.5, 3.8];

  return (
    <section className="text-black dark:text-white w-full h-[100vh]">
      <div className="font-Prompt flex flex-col items-center  justify-center w-full h-full">
        <div className="flex">
          <div className="overflow-hidden">
            <motion.div
              style={{
                y: "-100%",
              }}
              className="font-bold text-[2vmax] text-pink-400"
              variants={yVar("0%", delays[10], springOpt)}
              animate={l4t1Control}
            >
              (hi)
            </motion.div>
          </div>
          <SingleText
            control={l1t1Control}
            style={{ x: "-100%" }}
            variants={xVar("0%", delays[0], springOpt)}
            text="I"
          />
          <SlotText
            control={l1t2Control}
            style={{ y: "200%" }}
            texts={["A", "A", "A"]}
            variants={yVar("0%", delays[7], {
              stiffness: 500,
              damping: 10,
              mass: 1,
            })}
          />
          <SingleText
            control={l1t3Control}
            style={{ x: "100%" }}
            variants={xVar("0%", delays[3], springOpt)}
            text="m"
          />
        </div>

        <div className="ml-[3rem] flex">
          <SingleText
            control={l2t1Control}
            style={{ y: "100%" }}
            variants={yVar("0%", delays[2], springOpt)}
            text="J"
          />
          <SlotText
            control={l2t2Control}
            style={{ y: "200%" }}
            texts={["i", "i", "i"]}
            variants={yVar("0%", delays[8], {
              stiffness: 500,
              damping: 10,
              mass: 1,
            })}
          />
          <DoubleText
            control={l2t3Control}
            style={{ y: "100%" }}
            variants={yVar("-100%", delays[5], springOpt)}
            text="N"
          />
          <DoubleText
            control={l2t3Control}
            style={{ y: "100%" }}
            variants={yVar("-100%", delays[6], springOpt)}
            text="u"
          />

          <div className="overflow-hidden">
            <motion.div
              style={{
                y: "-110%",
              }}
              className="text-[2vmax] font-bold bg-blue-400 text-white px-4 py-2 rounded-[1vmax]"
              variants={yVar("0%", delays[11], springOpt)}
              animate={l4t2Control}
            >
              #15
            </motion.div>
          </div>
        </div>

        <div className="flex relative">
          <DoubleText
            control={l3t1Control}
            style={{ x: "-100%" }}
            variants={xVar("100%", delays[4], springOpt)}
            text="K"
          />
          <SlotText
            control={l3t2Control}
            style={{ y: "200%" }}
            texts={["!", "!", "!"]}
            variants={yVar("0%", delays[9], {
              stiffness: 500,
              damping: 10,
              mass: 1,
            })}
          />
          <DoubleText
            control={l3t3Control}
            style={{ y: "-100%" }}
            variants={yVar("100%", delays[1], springOpt)}
            text="M"
          />

          <div className="overflow-hidden self-end">
            <motion.div
              style={{
                y: "100%",
              }}
              className="text-[1.5vmax] flex justify-center items-center font-bold text-orange-400"
              variants={yVar("0%", delays[11], springOpt)}
              animate={l4t3Control}
            >
              <span>
                <svg width="24px" height="24px" viewBox="0 0 24 24">
                  <path
                    d="M15.71,17.29a1,1,0,0,0-1.42,0L13,18.59V3a1,1,0,0,0-2,0V18.59l-1.29-1.3a1,1,0,0,0-1.42,1.42l3,3a1,1,0,0,0,1.42,0l3-3A1,1,0,0,0,15.71,17.29Z"
                    className="fill-orange-400"
                  />
                </svg>
              </span>
              (scroll)
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
