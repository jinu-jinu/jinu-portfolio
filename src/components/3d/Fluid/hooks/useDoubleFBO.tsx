import { useFBO } from "@react-three/drei";

const useDoubleFBO = (
  width: number,
  height: number,
  options: {
    minFilter: THREE.TextureFilter;
    format: THREE.PixelFormat;
    type: THREE.TextureDataType;
    depth: boolean;
  }
) => {
  const read = useFBO(width, height, options);
  const write = useFBO(width, height, options);

  const res = {
    read,
    write,
    swap: () => {
      const temp = res.read;
      res.read = res.write;
      res.write = temp;
    },
  };

  return res;
};

export default useDoubleFBO;
