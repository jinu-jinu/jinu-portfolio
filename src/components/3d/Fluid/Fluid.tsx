import { Vector2, Vector3, Scene, Camera, Mesh, Texture } from "three";
import { useFrame, useThree, createPortal } from "@react-three/fiber";
import { useRef } from "react";
import FluidElem from "./effect/FluidElem";
import OPTS from "./utils/options";
import useFBOs from "./hooks/useFBOs";
import usePointer from "./hooks/usePointer";
import useMaterials from "./hooks/useMaterials";

type UniformsType = {
  uColor: Vector3;
  uPoint: Vector2;
  uVelocity: Texture;
  uCurl: Texture;
  uPressure: Texture;
  uDivergence: Texture;
  uSource: Texture;
  uDissipation: number;
};

const Fluid = () => {
  const { swirl, densityDissipation, velocityDissipation } = OPTS;
  const { size, gl } = useThree();
  const simulationRef = useRef<Mesh>(null!);
  const renderRef = useRef();
  const splats = usePointer();
  const materials = useMaterials();

  const simulationScene = new Scene();
  const simulationCamera = new Camera();
  const FBOs = useFBOs();

  const setShaderMaterial = (name: keyof ReturnType<typeof useMaterials>) => {
    if (!simulationRef.current) return;

    simulationRef.current.material = materials[name];
    simulationRef.current.material.needsUpdate = true;
  };

  const setRenderTarget = (name: keyof ReturnType<typeof useFBOs>) => {
    const target = FBOs[name];

    if ("write" in target) {
      gl.setRenderTarget(target.write);
      gl.clear();
      gl.render(simulationScene, simulationCamera);
      target.swap();
    } else {
      gl.setRenderTarget(target);
      gl.clear();
      gl.render(simulationScene, simulationCamera);
    }
  };

  const setUniforms = <K extends keyof UniformsType>(
    materialKey: keyof ReturnType<typeof useMaterials>,
    uniform: K,
    value: UniformsType[K]
  ) => {
    const material = materials[materialKey];
    if (material && material.uniforms[uniform]) material.uniforms[uniform].value = value;
  };

  useFrame(() => {
    if (!simulationRef.current || !renderRef.current) return;

    for (let i = splats.length - 1; i >= 0; i--) {
      const { pointerX, pointerY, velocityX, velocityY } = splats[i];
      setShaderMaterial("splatMaterial");
      setUniforms("splatMaterial", "uSource", FBOs.velocity.read.texture);
      setUniforms("splatMaterial", "uPoint", new Vector2(pointerX, pointerY));
      setUniforms("splatMaterial", "uColor", new Vector3(velocityX, velocityY, 10));
      setRenderTarget("velocity");
      setUniforms("splatMaterial", "uSource", FBOs.density.read.texture);
      setRenderTarget("density");

      splats.pop();
    }

    setShaderMaterial("curlMaterial");
    setUniforms("curlMaterial", "uVelocity", FBOs.velocity.read.texture);
    setRenderTarget("curl");

    setShaderMaterial("vorticityMaterial");
    setUniforms("vorticityMaterial", "uVelocity", FBOs.velocity.read.texture);
    setUniforms("vorticityMaterial", "uCurl", FBOs.curl.texture);
    setRenderTarget("velocity");

    setShaderMaterial("divergenceMaterial");
    setUniforms("divergenceMaterial", "uVelocity", FBOs.velocity.read.texture);
    setRenderTarget("divergence");

    setShaderMaterial("cleraMaterial");
    setUniforms("cleraMaterial", "uPressure", FBOs.pressure.read.texture);
    setRenderTarget("pressure");

    setShaderMaterial("pressureMaterial");
    setUniforms("pressureMaterial", "uDivergence", FBOs.divergence.texture);

    for (let i = 0; i < swirl; i++) {
      setUniforms("pressureMaterial", "uPressure", FBOs.pressure.read.texture);
      setRenderTarget("pressure");
    }

    setShaderMaterial("gradientSubtractMaterial");
    setUniforms("gradientSubtractMaterial", "uPressure", FBOs.pressure.read.texture);
    setUniforms("gradientSubtractMaterial", "uVelocity", FBOs.velocity.read.texture);
    setRenderTarget("velocity");

    setShaderMaterial("advectionMaterial");
    setUniforms("advectionMaterial", "uVelocity", FBOs.velocity.read.texture);
    setUniforms("advectionMaterial", "uSource", FBOs.velocity.read.texture);
    setUniforms("advectionMaterial", "uDissipation", velocityDissipation);
    setRenderTarget("velocity");

    setUniforms("advectionMaterial", "uVelocity", FBOs.velocity.read.texture);
    setUniforms("advectionMaterial", "uSource", FBOs.density.read.texture);
    setUniforms("advectionMaterial", "uDissipation", densityDissipation);
    setRenderTarget("density");

    gl.setRenderTarget(null);
    gl.clear();
  });

  return (
    <>
      {createPortal(
        <mesh ref={simulationRef} scale={[size.width, size.height, 1]}>
          <planeGeometry args={[2, 2]} />
        </mesh>,
        simulationScene
      )}
      <FluidElem ref={renderRef} uTexture={FBOs.density.read.texture} />
    </>
  );
};

export default Fluid;
