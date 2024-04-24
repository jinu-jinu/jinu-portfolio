import { ShaderMaterial, Texture, Vector2, Vector3 } from "three";
import { useThree } from "@react-three/fiber";
import OPTS from "../utils/options";

import advectionFragment from "../glsl/advection.frag?raw";
import clearFragment from "../glsl/clear.frag?raw";
import curlFragment from "../glsl/curl.frag?raw";
import divergenceFragment from "../glsl/divergence.frag?raw";
import gradientSubtractFragment from "../glsl/gradientSubtract.frag?raw";
import pressureFragment from "../glsl/pressure.frag?raw";
import splatFragment from "../glsl/splat.frag?raw";
import vorticityFragment from "../glsl/vorticity.frag?raw";
import base from "../glsl/base.glsl?raw";

const useMaterials = () => {
  const { size } = useThree();
  const aspectRatio = size.width / (size.height + 400);

  const advectionMaterial = new ShaderMaterial({
    depthTest: false,
    depthWrite: false,
    vertexShader: base,
    fragmentShader: advectionFragment,
    uniforms: {
      uVelocity: { value: new Texture() },
      uSource: { value: new Texture() },
      uTexelSize: { value: new Vector2(1 / (OPTS.simRes * aspectRatio), 1 / OPTS.simRes) },
      uDt: { value: OPTS.dt },
      uDissipation: { value: 0.0 },
    },
  });

  const cleraMaterial = new ShaderMaterial({
    depthTest: false,
    depthWrite: false,
    vertexShader: base,
    fragmentShader: clearFragment,
    uniforms: {
      uPressure: { value: new Texture() },
      uValue: { value: OPTS.pressure },
      uTexelSize: { value: new Vector2(1 / (OPTS.simRes * aspectRatio), 1 / OPTS.simRes) },
    },
  });

  const curlMaterial = new ShaderMaterial({
    depthTest: false,
    depthWrite: false,
    vertexShader: base,
    fragmentShader: curlFragment,
    uniforms: {
      uVelocity: { value: new Texture() },
      uTexelSize: { value: new Vector2(1 / (OPTS.simRes * aspectRatio), 1 / OPTS.simRes) },
    },
  });

  const divergenceMaterial = new ShaderMaterial({
    depthTest: false,
    depthWrite: false,
    vertexShader: base,
    fragmentShader: divergenceFragment,
    uniforms: {
      uVelocity: { value: new Texture() },
      uTexelSize: { value: new Vector2(1 / (OPTS.simRes * aspectRatio), 1 / OPTS.simRes) },
    },
  });

  const gradientSubtractMaterial = new ShaderMaterial({
    depthTest: false,
    depthWrite: false,
    vertexShader: base,
    fragmentShader: gradientSubtractFragment,
    uniforms: {
      uVelocity: { value: new Texture() },
      uPressure: { value: new Texture() },
      uTexelSize: { value: new Vector2(1 / (OPTS.simRes * aspectRatio), 1 / OPTS.simRes) },
    },
  });

  const pressureMaterial = new ShaderMaterial({
    depthTest: false,
    depthWrite: false,
    vertexShader: base,
    fragmentShader: pressureFragment,
    uniforms: {
      uPressure: { value: new Texture() },
      uDivergence: { value: new Texture() },
      uTexelSize: { value: new Vector2(1 / (OPTS.simRes * aspectRatio), 1 / OPTS.simRes) },
    },
  });

  const splatMaterial = new ShaderMaterial({
    depthTest: false,
    depthWrite: false,
    vertexShader: base,
    fragmentShader: splatFragment,
    uniforms: {
      uSource: { value: new Texture() },
      uRatio: { value: size.width / size.height },
      uColor: { value: new Vector3() },
      uPoint: { value: new Vector2() },
      uRadius: { value: OPTS.splatRadius / 100 },
      uTexelSize: { value: new Vector2(1 / (OPTS.simRes * aspectRatio), 1 / OPTS.simRes) },
    },
  });

  const vorticityMaterial = new ShaderMaterial({
    depthTest: false,
    depthWrite: false,
    vertexShader: base,
    fragmentShader: vorticityFragment,
    uniforms: {
      uVelocity: { value: new Texture() },
      uCurl: { value: new Texture() },
      uCurloffset: { value: OPTS.curl },
      uDt: { value: OPTS.dt },
      uTexelSize: { value: new Vector2(1 / (OPTS.simRes * aspectRatio), 1 / OPTS.simRes) },
    },
  });

  return {
    advectionMaterial,
    cleraMaterial,
    curlMaterial,
    divergenceMaterial,
    gradientSubtractMaterial,
    pressureMaterial,
    splatMaterial,
    vorticityMaterial,
  };
};

export default useMaterials;
