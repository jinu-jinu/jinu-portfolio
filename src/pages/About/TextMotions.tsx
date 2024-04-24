import { AnimationControls, MotionStyle, Variants } from "framer-motion";
import { motion } from "framer-motion";

export const SlotText = ({
  style,
  control,
  texts,
  variants,
}: {
  style: MotionStyle;
  control: AnimationControls;
  texts: string[];
  variants: Variants;
}) => {
  return (
    <div className="overflow-hidden relative font-black text-[11vmax] leading-[11vmax]">
      <motion.div style={style} variants={variants} animate={control}>
        <motion.div
          style={{
            y: "100%",
          }}
          className="absolute top-0 left-0"
        >
          {texts[0]}
        </motion.div>
        <motion.div> {texts[1]}</motion.div>
        <motion.div
          style={{
            y: "-100%",
          }}
          className="absolute top-0 left-0"
        >
          {texts[2]}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const SingleText = ({
  style,
  control,
  variants,
  text,
}: {
  style: MotionStyle;
  control: AnimationControls;
  variants: Variants;
  text: string;
}) => {
  return (
    <div className="overflow-hidden font-black text-[11vmax] leading-[11vmax]">
      <motion.div style={style} variants={variants} animate={control}>
        {text}
      </motion.div>
    </div>
  );
};

export const DoubleText = ({
  style,
  control,
  variants,
  text,
}: {
  style: MotionStyle;
  control: AnimationControls;
  variants: Variants;
  text: string;
}) => {
  return (
    <div className="relative overflow-hidden font-black text-[11vmax] leading-[11vmax]">
      <motion.div style={style} variants={variants} animate={control}>
        <motion.div>{text}</motion.div>
        <motion.div style={style} className="absolute top-0 left-0">
          {text}
        </motion.div>
      </motion.div>
    </div>
  );
};
