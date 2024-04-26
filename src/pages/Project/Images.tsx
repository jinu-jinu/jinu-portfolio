const Images = ({ images }: { images: string[] }) => {
  return (
    <div className="flex-1 space-y-[2rem] grid grid-cols-1 sm:grid-cols-2 sm:space-y-0 sm:gap-[1rem] lg:grid-cols-1 lg:pt-[20vmin]">
      {images.map((img, i) => (
        <div key={`project-${img}-${i}`}>
          <img src={img} className="w-[50vmax] h-[25vmax] rounded-xl" />
        </div>
      ))}
    </div>
  );
};

export default Images;
