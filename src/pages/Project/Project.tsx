import { useCurrentData } from "@/stores/ProjectDataStore";

const Project = () => {
  const currentData = useCurrentData();

  if (!currentData) return <div>WAIT</div>;

  return (
    <div className="w-full h-auto">
      <div className="px-[24px] md:px-[48px] lg:px-[64px] w-full">
        <div>
          <div>
            <div>PROJECT CODE</div>
            <div className="font-bold">{currentData.projectCode}</div>
          </div>
          <div>
            <div>PROJECT NAME</div>
            <div className="font-black">{currentData.title}</div>
          </div>
          <div>
            <div>YEAR</div>
            <div className="font-bold">{currentData.year}</div>
          </div>
          <div>
            <div>TECHNOLOGY</div>
            <div className="font-bold">{currentData.technology}</div>
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

export default Project;
