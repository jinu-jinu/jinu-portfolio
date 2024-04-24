import { forwardRef } from "react";
import { Texture } from "three";
import FluidEffect from "./FluidEffect";

const FluidElem = forwardRef((props: { uTexture: Texture }, ref) => {
  const effect = new FluidEffect(props);

  return <primitive ref={ref} object={effect} />;
});

export default FluidElem;
