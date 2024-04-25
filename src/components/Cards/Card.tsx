import { CardDataType } from "@/types";
import IllusionImage from "@/components/common/ImageMotions/IllusionImage";
import { UpDownHover } from "@/components/common/textMotions";
import { ArrowButton } from "@/components/common/ButtonMotions";

const Card = ({
  projectCode,
  technology,
  title,
  year,
  image,
  isHovered,
}: CardDataType & { isHovered: string | null }) => {
  const hovered = isHovered === projectCode;

  return (
    <div className="cursor-pointer home-project-card" id={projectCode}>
      <div className="w-full h-full relative text-white">
        <div className="w-full h-full rounded-3xl overflow-hidden flex justify-center items-center">
          <IllusionImage img={image} hovered={hovered} />
        </div>

        <div className="absolute top-0 left-0 w-full flex justify-between p-[2vmax]">
          <div className="text-[1vmax] leading-[1.2vmax] text-shadow">
            <p>{projectCode}</p>
            <p>{year}</p>
          </div>

          <ArrowButton isHovered={hovered} />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-[2vmax] font-black">
          <div className="text-[3vmax] text-shadow">
            <UpDownHover text={title} isHovered={hovered} direction="down" />
          </div>
          <div className="text-[1vmax] text-shadow">{technology}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
