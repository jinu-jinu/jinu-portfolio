import OPTS from "../utils/options";
import { useThree } from "@react-three/fiber";
import { useCallback, useEffect, useRef } from "react";
import { Vector2 } from "three";

type SplatType = {
  pointerX: number;
  pointerY: number;
  velocityX: number;
  velocityY: number;
};

const usePointer = () => {
  const { size } = useThree();
  const splats = useRef<SplatType[]>([]).current;
  const prevPointer = useRef(new Vector2());

  const onPointerMove = useCallback(
    (e: MouseEvent) => {
      const deltaX = e.clientX - prevPointer.current.x;
      const deltaY = e.clientY - prevPointer.current.y;
      prevPointer.current.set(e.clientX, e.clientY);

      splats.push({
        pointerX: e.clientX / size.width,
        pointerY: 1 - e.clientY / size.height,
        velocityX: deltaX * OPTS.force,
        velocityY: -deltaY * OPTS.force,
      });
    },
    [size, splats]
  );

  useEffect(() => {
    window.addEventListener("mousemove", onPointerMove);

    return () => {
      window.removeEventListener("mousemove", onPointerMove);
    };
  }, [onPointerMove]);

  return splats;
};

export default usePointer;
