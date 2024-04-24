import vertexShader from "./glsl/vertex.glsl?raw";
import fragmentShader from "./glsl/fragment.glsl?raw";
import { useFrame } from "@react-three/fiber";
import { useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

const WaterLikeImage = () => {
  const { scrollYProgress } = useScroll({
    offset: ["50vh", "100vh"],
  });
  const dampY = useSpring(scrollYProgress, {
    damping: 10,
    stiffness: 40,
  });
  const uniforms = useRef({
    uTime: { value: 0 },
    uScroll: { value: 0 },
  });

  useMotionValueEvent(dampY, "change", (e) => {
    uniforms.current.uScroll.value = e as number;
  });

  useFrame(({ clock }) => {
    const et = clock.elapsedTime;
    uniforms.current.uTime.value = et;
  });

  return (
    <mesh>
      <planeGeometry args={[1.5, 1, 30, 30]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
      />
    </mesh>
  );
};

export default WaterLikeImage;
