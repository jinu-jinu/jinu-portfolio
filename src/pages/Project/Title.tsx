import { motion } from "framer-motion";
import { ProjectDataType } from "@/types";
import { Link } from "react-router-dom";

const Title = ({ project_code, name, year, technologies, description, link }: ProjectDataType) => {
  return (
    <div className="w-full flex-1 flex flex-col lg:sticky lg:top-0 lg:left-0 lg:pt-[20vmin]">
      <div className="flex justify-between items-start w-full max-w-[40vmax]">
        <div className="space-y-2">
          <div className="leading-[18px]">
            <p className="text-orange-500 text-[12px]">PROJECT CODE</p>
            <p className="font-bold">{project_code}</p>
          </div>
          <div className="leading-[18px]">
            <p className="text-orange-500 text-[12px]">YEAR</p>
            <p className="font-bold">{year}</p>
          </div>
          <div className="leading-[18px]">
            <p className="text-orange-500 text-[12px]">TECHNOLOGY</p>
            <p className="font-bold">{technologies}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-orange-500 text-[12px] ">PROJECT NAME</p>
            <p className="font-black text-[3vmax] leading-[3vmax]">{name}</p>
          </div>
        </div>
        <motion.div
          whileHover={{ scale: 1.5 }}
          whileTap={{
            filter: "blur(10px)",
          }}
          className="bg-black dark:bg-white text-white dark:text-black p-2 rounded-lg text-[12px] font-bold"
        >
          <Link to={link} target="_blank">
            VISIT SITE
          </Link>
        </motion.div>
      </div>
      <div className="py-[2rem] self-center lg:self-start w-full max-w-[40vmax]">
        <p className="text-[2vmax] leading-[2.5vmax]">{description}</p>
      </div>
    </div>
  );
};

export default Title;
