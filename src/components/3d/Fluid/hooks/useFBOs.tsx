import { useFBO } from "@react-three/drei";
import OPTS from "../utils/options";
import useDoubleFBO from "./useDoubleFBO";
import * as THREE from "three";

const useFBOs = () => {
  const density = useDoubleFBO(OPTS.dyeRes, OPTS.dyeRes, {
    type: THREE.HalfFloatType,
    format: THREE.RGBAFormat,
    minFilter: THREE.LinearFilter,
    depth: false,
  });

  const velocity = useDoubleFBO(OPTS.simRes, OPTS.simRes, {
    type: THREE.HalfFloatType,
    format: THREE.RGFormat,
    minFilter: THREE.LinearFilter,
    depth: false,
  });

  const pressure = useDoubleFBO(OPTS.simRes, OPTS.simRes, {
    type: THREE.HalfFloatType,
    format: THREE.RedFormat,
    minFilter: THREE.NearestFilter,
    depth: false,
  });

  const divergence = useFBO(OPTS.simRes, OPTS.simRes, {
    type: THREE.HalfFloatType,
    format: THREE.RedFormat,
    minFilter: THREE.NearestFilter,
    depth: false,
  });

  const curl = useFBO(OPTS.simRes, OPTS.simRes, {
    type: THREE.HalfFloatType,
    format: THREE.RedFormat,
    minFilter: THREE.NearestFilter,
    depth: false,
  });

  return { density, velocity, pressure, divergence, curl };
};

export default useFBOs;
