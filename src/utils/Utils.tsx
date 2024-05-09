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

const imgUrl = (url: string) =>
  `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/images/${url}`;

const preloadImg = (imgs: { url: string }[]) => {
  return Promise.all(
    imgs.map(({ url }) => {
      return new Promise((res, rej) => {
        const img = new Image();
        img.src = imgUrl(url);
        img.onload = () => res(true);
        img.onerror = () => rej(new Error("image preload error"));
      });
    })
  );
};

export { isDarkMode, rePosZ, sleep, isMobile, imgUrl, preloadImg };
