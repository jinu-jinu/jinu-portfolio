const isDarkMode = () =>
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const remap = (n: number) => {
  const S = 2.2;
  const XL = 0.48;

  if (n < XL) return 1;
  if (n > S) return 0;

  const ratio = (S - n) / (S - XL);

  return ratio;
};

const lerp = (st: number, ed: number, t: number) => {
  const res = st + t * (ed - st);
  return res;
};

const rePosZ = (min: number, max: number, ratio: number) => lerp(min, max, remap(ratio));

const sleep = (delay: number) => new Promise((res) => setTimeout(res, delay));

const detectMobileDevice = (agent: string) => {
  const mobileRegex = [/Android/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];

  return mobileRegex.some((mobile) => agent.match(mobile));
};

const isMobile = detectMobileDevice(window.navigator.userAgent);

export { isDarkMode, rePosZ, sleep, isMobile };
