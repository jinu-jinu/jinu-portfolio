import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./components/3d/Experience";

const App = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 1.5] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundColor: "transparent",
        pointerEvents: "none",
      }}
    >
      <Suspense fallback={null}>
        <Experience />
      </Suspense>
    </Canvas>
  );
};

export default App;
