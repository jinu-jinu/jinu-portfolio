import { ProjectDataType } from "@/types";

// 타입 바꾸기
const Title = ({ projectCode, title, year, technology }: ProjectDataType) => {
  return (
    <div className="w-full flex-1 flex flex-col lg:sticky lg:top-0 lg:left-0 lg:pt-[20vmin]">
      <div className="space-y-[0.5rem]">
        <div className="leading-[18px]">
          <p className="text-orange-500 text-[12px]">PROJECT CODE</p>
          <p className="font-bold">{projectCode}</p>
        </div>
        <div className="leading-[18px]">
          <p className="text-orange-500 text-[12px]">YEAR</p>
          <p className="font-bold">{year}</p>
        </div>
        <div className="leading-[18px]">
          <p className="text-orange-500 text-[12px]">TECHNOLOGY</p>
          <p className="font-bold">{technology}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-orange-500 text-[12px] ">PROJECT NAME</p>
          <p className="font-black text-[3vmax] leading-[3vmax]">{title}</p>
        </div>
      </div>
      <div className="py-[2rem] self-center lg:self-start mt-[2vmax] w-full max-w-[40vmax]">
        <p className="text-[2vmax] leading-[2.5vmax]">
          Subdivision Surface Modeling으로 제작한 빈티지 카입니다. 모델링 툴은 블렌더를
          사용했습니다. WEBGL을 사용해서 웹사이트에 렌더링했습니다.
        </p>
      </div>
    </div>
  );
};

export default Title;
