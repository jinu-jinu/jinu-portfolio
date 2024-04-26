import { modelSurfaceTexture } from "../getDataTexture";
import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { AdditiveBlending, Texture, Vector2, Vector3 } from "three";
import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer.js";
import simPosition from "./shaders/simPosition.glsl?raw";
import simVelocity from "./shaders/simVelocity.glsl?raw";
import vertex from "./shaders/vertex.glsl?raw";
import fragment from "./shaders/fragment.glsl?raw";
import { isDarkMode } from "@/utils/Utils";
import { ModelType } from "@/types";
import { animate, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useCurrentPath, useNextPath } from "@/stores/PathStore";
import { useTheme } from "@/stores/ThemeStore";

const SIZE = 100;

const bufferAttrs = () => {
  const position = new Float32Array(SIZE * SIZE * 3);
  const uv = new Float32Array(SIZE * SIZE * 2);

  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      const k = i * SIZE + j;

      position[k * 3 + 0] = (5 * i) / SIZE;
      position[k * 3 + 1] = (5 * j) / SIZE;
      position[k * 3 + 2] = 0;
      uv[k * 2 + 0] = i / (SIZE - 1);
      uv[k * 2 + 1] = j / (SIZE - 1);
    }
  }

  return [position, uv];
};

/*
  useThree를 사용하면 리사이즈 될 때마다 리렌더링이 된다
  그런데 리사이즈 하는 상황이 거의 없다
  모바일은 모바일로 보고 데탑, 놋북은 화면 그대로
  리사이즈 되더라도 한 번만 하지 나처럼 각 사이즈 확인하려고 수십번씩 줄이는 경우는 없다
  그러니 리사이즈에 대한 문제는 그대로 두기로한다
  스크롤을 하거나 이벤트가 발생했을 때 리사이즈되면 당연히 수정해야하는데
  그러진 않으므로 괜찮다
*/
const Particles = ({ nodes }: { nodes: ModelType }) => {
  const [bufferPos, bufferUV] = bufferAttrs();
  const { gl, raycaster, camera, size } = useThree();
  const currentPath = useCurrentPath();
  const nextPath = useNextPath();
  const theme = useTheme();
  const uniforms = useRef({
    uTexture: { value: new Texture() },
    uOpacity: { value: 0 },
    uDark: { value: isDarkMode() === "dark" ? 1 : 0 },
  });

  const leave = currentPath === "/contact" && nextPath !== null && nextPath !== "/contact";

  useEffect(() => {
    if (theme === "dark") {
      if (uniforms.current.uDark.value === 1) return;
      uniforms.current.uDark.value = 1;
    } else {
      if (uniforms.current.uDark.value === 0) return;
      uniforms.current.uDark.value = 0;
    }
  }, [theme, uniforms.current.uDark.value]);

  const motionValue = useMotionValue(0);

  useMotionValueEvent(motionValue, "change", (e) => {
    uniforms.current.uOpacity.value = leave ? 1 - e : e;
  });

  useEffect(() => {
    void animate(motionValue, 1, { duration: 1, ease: "easeIn" });
  }, []);

  useEffect(() => {
    if (leave) {
      motionValue.set(0);
      void animate(motionValue, 1, { duration: 1, ease: "easeOut" });
    }
  }, [leave]);

  const gpuCompute = new GPUComputationRenderer(SIZE, SIZE, gl);
  const modelTexture = modelSurfaceTexture(SIZE, nodes.J);
  const positionVariable = gpuCompute.addVariable("uCurrentPosition", simPosition, modelTexture);
  const velocityVariable = gpuCompute.addVariable(
    "uCurrentVelocity",
    simVelocity,
    gpuCompute.createTexture()
  );

  gpuCompute.setVariableDependencies(positionVariable, [positionVariable, velocityVariable]);
  gpuCompute.setVariableDependencies(velocityVariable, [positionVariable, velocityVariable]);

  const positionUniforms = positionVariable.material.uniforms;
  const velocityUniforms = velocityVariable.material.uniforms;

  positionUniforms.uTime = { value: 0 };
  positionUniforms.uOriginalPosition = { value: modelTexture };
  velocityUniforms.uOriginalPosition = { value: modelTexture };
  velocityUniforms.uMouse = { value: new Vector3(-999, -999, -999) };
  gpuCompute.init();

  useEffect(() => {
    const mouseHandler = (e: MouseEvent) => {
      const px = (e.clientX / size.width - 0.5) * 2;
      const py = (1 - e.clientY / size.height - 0.5) * 2;
      const pointer = new Vector2(px, py);
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects([nodes.J]);

      if (intersects.length > 0) velocityUniforms.uMouse.value = intersects[0].point;
      else velocityUniforms.uMouse.value = [-999, -999, -999];
    };

    window.addEventListener("mousemove", mouseHandler);

    return () => {
      window.removeEventListener("mousemove", mouseHandler);
    };
  }, [camera, raycaster, velocityUniforms.uMouse, nodes.J, size]);

  useFrame(({ clock }) => {
    const et = clock.elapsedTime;
    gpuCompute.compute();

    positionUniforms.uTime.value = et;
    uniforms.current.uTexture.value = gpuCompute.getCurrentRenderTarget(positionVariable).texture;
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={bufferPos.length / 3}
          array={bufferPos}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aUV"
          count={bufferUV.length / 2}
          array={bufferUV}
          itemSize={2}
        />
      </bufferGeometry>

      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms.current}
        transparent
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default Particles;
