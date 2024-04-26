import { Suspense, lazy } from "react";
import FlowField from "./FlowField/FlowField";
import { useCurrentPath } from "@/stores/PathStore";
import { useGLTF } from "@react-three/drei";
import { GLTFType } from "@/types";

const Particles = lazy(() => import("./ParticleSimulation/Particles"));

const Experience = () => {
  const { nodes } = useGLTF("/j.glb") as unknown as GLTFType;
  const currentPath = useCurrentPath();

  return (
    <>
      <FlowField />
      {currentPath === "/contact" ? (
        <Suspense fallback={null}>
          <Particles nodes={nodes} />
        </Suspense>
      ) : null}
    </>
  );
};

export default Experience;
