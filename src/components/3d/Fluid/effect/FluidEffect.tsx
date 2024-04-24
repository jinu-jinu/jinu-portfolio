import { Effect } from "postprocessing";
import { Texture, Uniform } from "three";
import fragmentShader from "../glsl/render.frag?raw";

export default class FluidEffect extends Effect {
  constructor(props: { uTexture: Texture }) {
    super("FluidEffect", fragmentShader, {
      uniforms: new Map([["uTexture", new Uniform(props.uTexture)]]),
    });
  }
}
