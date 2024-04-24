import { useGLTF } from "@react-three/drei";
import FlowField from "./FlowField/FlowField";
import Particles from "./ParticleSimulation/Particles";
import { GLTFType } from "@/types";
import { useCurrentPath } from "@/stores/PathStore";

const Experience = () => {
  const { nodes } = useGLTF("/j.glb") as unknown as GLTFType;
  const currentPath = useCurrentPath();

  return (
    <>
      <FlowField />
      {currentPath === "/contact" ? <Particles nodes={nodes} /> : null}
    </>
  );
};

export default Experience;
