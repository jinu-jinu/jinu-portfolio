import { useParams } from "react-router-dom";

const Project = () => {
  const params = useParams();
  console.log(params);
  return <div>Project</div>;
};

export default Project;
