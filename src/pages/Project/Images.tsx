import { imgUrl } from "@/utils/Utils";

const Images = ({ images }: { images: { url: string }[] }) => {
  return (
    <div className="flex-1 space-y-[2rem] grid grid-cols-1 sm:grid-cols-2 sm:space-y-0 sm:gap-[1rem] lg:grid-cols-1 lg:pt-[20vmin]">
      {images.map(({ url }, i) => (
        <div key={`project-${url}-${i}`}>
          <img
            src={imgUrl(url)}
            width="100%"
            height="100%"
            alt={`project-image-${i}`}
            className="w-[50vmax] h-[25vmax] rounded-xl"
          />
        </div>
      ))}
    </div>
  );
};

export default Images;
