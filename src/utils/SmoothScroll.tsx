import { useIsLoading } from "@/stores/LoadingStore";
import { usePageTransitioning } from "@/stores/PathStore";
import Lenis from "lenis";
import { useEffect, useMemo } from "react";

const SmoothScroll = ({ children }: { children: JSX.Element }) => {
  const lenis = useMemo(
    () =>
      new Lenis({
        syncTouch: true,
        wheelMultiplier: 0.5,
        touchMultiplier: 0.5,
      }),
    []
  );
  const isLoading = useIsLoading();
  const pageTransitioning = usePageTransitioning();

  useEffect(() => {
    if (isLoading || pageTransitioning) lenis.stop();
    else lenis.start();
  }, [isLoading, pageTransitioning, lenis]);

  useEffect(() => {
    const raf = (cb: any) => {
      lenis.raf(cb);
      requestAnimationFrame(raf);

      return 0;
    };

    requestAnimationFrame(raf);
  }, []);

  return children;
};

export default SmoothScroll;
