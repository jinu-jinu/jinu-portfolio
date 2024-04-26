import { useCurrentData } from "@/stores/ProjectDataStore";
import "./project.scss";
import Title from "./Title";

const Project = () => {
  const currentData = useCurrentData();

  if (!currentData) return <div>WAIT</div>;

  /*
    글자 크기 맞추고
    넥스트 만들고
    컴포넌트 분리
  */

  return (
    <div className="w-full h-auto px-[24px] md:px-[48px] lg:px-[64px] pt-[7rem] sm:pt-[20vmin] lg:pt-0">
      <div className="w-full space-y-[2rem] flex flex-col items-center lg:flex-row lg:items-start">
        {/* 왼쪽 */}
        <Title {...currentData} />

        {/* 오른쪽 */}
        <div className="flex-1 space-y-[3rem] flex flex-col lg:pt-[20vmin]">
          {currentData.images.map((img, i) => (
            <div key={`project-${img}-${i}`} className="">
              <img src={img} className="w-[50vmax] h-[30vmax] rounded-xl" />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-[50vh] bg-red-300">next</div>
    </div>
  );
};

export default Project;
