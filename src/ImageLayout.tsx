import { CardData } from "./data";

const ImageLayout = () => {
  const data = CardData[4];

  return (
    <div className="w-full h-auto font-Prompt">
      <div className="px-[24px] md:px-[48px] lg:px-[64px] w-full">
        <div>
          <div>
            <div>PROJECT CODE</div>
            <div className="font-bold">{data.projectCode}</div>
          </div>
          <div>
            <div>PROJECT NAME</div>
            <div className="font-black">{data.title}</div>
          </div>
          <div>
            <div>YEAR</div>
            <div className="font-bold">{data.year}</div>
          </div>
          <div>
            <div>TECHNOLOGY</div>
            <div className="font-bold">{data.technology}</div>
          </div>
          <div>
            <div>소개</div>
            <p>Subdivision Surface Modeling</p>
          </div>
        </div>
        <div>image</div>
      </div>
    </div>
  );
};

export default ImageLayout;
