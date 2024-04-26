import { CardDataType } from "@/types";

// 타입 바꾸기

const Title = ({ projectCode, title, year, technology }: CardDataType) => {
  return (
    <div className="flex-1 flex flex-col sm:flex-row lg:flex-col lg:sticky lg:top-0 lg:left-0 lg:pt-[20vmin]">
      <div className="space-y-[1vmax]">
        <div>
          <p className="text-orange-500 text-[1.2vmax]">PROJECT CODE</p>
          <p className="font-bold text-[1.5vmax]">{projectCode}</p>
        </div>
        <div>
          <p className="text-orange-500 text-[1.2vmax]">PROJECT NAME</p>
          <p className="font-black text-[2rem]">{title}</p>
        </div>
        <div>
          <p className="text-orange-500 text-[1.2vmax]">YEAR</p>
          <p className="font-bold text-[1.5vmax]">{year}</p>
        </div>
        <div>
          <p className="text-orange-500 text-[1.2vmax]">TECHNOLOGY</p>
          <p className="font-bold text-[1.5vmax]">{technology}</p>
        </div>
      </div>
      <div className="w-full max-w-[40vmax] sm:self-center lg:self-start mt-[2vmax]">
        <p className="text-[1.3vmax]">
          Subdivision Surface Modeling으로 제작한 빈티지 카입니다. 모델링 툴은 블렌더를
          사용했습니다. WEBGL을 사용해서 웹사이트에 렌더링했습니다.
        </p>
      </div>
    </div>
  );
};

export default Title;
