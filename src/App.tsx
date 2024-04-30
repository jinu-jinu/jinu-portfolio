import { Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import SmoothScroll from "@/utils/SmoothScroll";
import UserInterface from "@/components/UserInterface/UserInterface";
import Home from "@/pages/Home/Home";
import { Bridge, Loading } from "./components/Modal";
import About from "./pages/About/About";
import Error from "./pages/Error/Error";
import Contact from "./pages/Contact/Contact";
import { Canvas } from "@react-three/fiber";
import Experience from "./components/3d/Experience";
import { EffectComposer } from "@react-three/postprocessing";
import Fluid from "./components/3d/Fluid/Fluid";
import { AnimatePresence } from "framer-motion";
import { isDarkMode } from "./utils/Utils";
import { useLoadingActions } from "./stores/LoadingStore";
import { useProgress } from "@react-three/drei";
import Project from "./pages/Project/Project";

const AssetDownLoader = () => {
  const handleAssetDownload = useLoadingActions("handleAssetDownload");
  const navigate = useNavigate();
  const { loaded, total } = useProgress();

  useEffect(() => {
    if (loaded === total) {
      navigate("/");
      handleAssetDownload(true);
    }
  }, [loaded, total]);
  return null;
};

const App = () => {
  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };

    document.documentElement.classList.add(isDarkMode());
  }, []);

  return (
    <>
      <AssetDownLoader />
      <SmoothScroll>
        <>
          <Canvas
            camera={{ position: [0, 0, 1.5] }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100dvh",
              pointerEvents: "none",
            }}
          >
            <Suspense fallback={null}>
              <Experience />
              <EffectComposer>
                <Fluid />
              </EffectComposer>
            </Suspense>
          </Canvas>

          <div className="font-Prompt bg-white dark:bg-black text-black dark:text-white theme-transition">
            <UserInterface />

            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/project/:id" element={<Project />} />
                <Route path="/*" element={<Error />} />
              </Routes>
            </AnimatePresence>

            <Loading />
            <Bridge />
          </div>
        </>
      </SmoothScroll>
    </>
  );
};

export default App;
