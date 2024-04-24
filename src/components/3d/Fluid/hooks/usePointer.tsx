import useMouse from "@/utils/useMouse";
import OPTS from "../utils/options";
import { useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Vector2 } from "three";
import { isMobile } from "@/utils/Utils";

const usePointer = () => {
  const { size } = useThree();
  const prevPointer = useRef(new Vector2());
  const [[mouseX, mouseY], [touchX, touchY]] = useMouse();

  const splats = useMemo(() => {
    const res = [];
    const calculateDelta = (current: number, prev: number) => current - prev;

    const x = isMobile ? touchX : mouseX;
    const y = isMobile ? touchY : mouseY;

    const deltaX = calculateDelta(x, prevPointer.current.x);
    const deltaY = calculateDelta(y, prevPointer.current.y);
    prevPointer.current.set(x, y);

    res.push({
      pointerX: x / size.width,
      pointerY: 1 - y / size.height,
      velocityX: deltaX * OPTS.force,
      velocityY: -deltaY * OPTS.force,
    });
    return res;
  }, [mouseX, mouseY, size, touchX, touchY]);

  return splats;
};

export default usePointer;
