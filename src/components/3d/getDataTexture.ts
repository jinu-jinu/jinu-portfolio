import { DataTexture, FloatType, Mesh, RGBAFormat, Vector3 } from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";

const boxTexture = (size: number) => {
  const len = size * size * 4;
  const data = new Float32Array(len);

  for (let i = 0; i < len; i++) {
    const stride = i * 4;

    data[stride] = (Math.random() - 0.5) * 2.0;
    data[stride + 1] = (Math.random() - 0.5) * 2.0;
    data[stride + 2] = (Math.random() - 0.5) * 2.0;
    data[stride + 3] = 1.0;
  }

  const res = new DataTexture(data, size, size, RGBAFormat, FloatType);
  res.needsUpdate = true;
  return res;
};

const modelSurfaceTexture = (size: number, model: Mesh) => {
  const count = size * size;
  const data = new Float32Array(4 * count);
  const vector = new Vector3();
  const sampler = new MeshSurfaceSampler(model).build();

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const index = i * size + j;
      sampler.sample(vector);

      data[4 * index] = vector.x;
      data[4 * index + 1] = vector.y;
      data[4 * index + 2] = vector.z;
      data[4 * index + 3] = Math.random();
    }
  }

  const dataTexture = new DataTexture(data, size, size, RGBAFormat, FloatType);
  dataTexture.needsUpdate = true;

  return dataTexture;
};

export { boxTexture, modelSurfaceTexture };
