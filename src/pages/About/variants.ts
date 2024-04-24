export const xVar = (
  x: string,
  delay: number,
  opts?: { stiffness: number; damping: number; mass: number }
) => ({
  animate: {
    x,
    transition: {
      delay,
      type: "spring",
      ...opts,
    },
  },
});

export const yVar = (
  y: string,
  delay: number,
  opts?: { stiffness: number; damping: number; mass: number }
) => ({
  animate: {
    y,
    transition: {
      delay,
      type: "spring",
      ...opts,
    },
  },
});
