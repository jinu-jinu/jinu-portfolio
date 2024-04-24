import { useEffect, useState } from "react";

const useMouse = () => {
  const [mouse, setMouse] = useState([-999, -999]);
  const [touch, setTouch] = useState([-999, -999]);

  useEffect(() => {
    const mouseHandler = (e: MouseEvent) => {
      setMouse([e.clientX, e.clientY]);
    };
    const touchHandler = (e: TouchEvent) => {
      const touches = e.touches[0];
      setTouch([touches.clientX, touches.clientY]);
    };

    window.addEventListener("mousemove", mouseHandler);

    window.addEventListener("touchmove", touchHandler);

    return () => {
      window.removeEventListener("mousemove", mouseHandler);
      window.removeEventListener("touchmove", touchHandler);
    };
  }, []);

  return [mouse, touch];
};

export default useMouse;
