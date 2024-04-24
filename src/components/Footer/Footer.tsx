const Footer = () => {
  /*
    마그네틱으로 만들고
    레이아웃 다시 짜기
  */

  return (
    <footer className="pt-[10vmax] pb-[15vmax] xl:pb-[10vmax]">
      <div className="flex flex-col items-end py-[2vmax] border-t-2 border-b-2 border-black dark:border-white sm:flex-row sm:justify-between sm:items-center">
        <div className="flex flex-col items-end text-[1.5vmax] leading-[1.7vmax] sm:items-start">
          <a href="mailto:kjwkjw5153@gmail.com">
            <p>kjwkjw5153@gmail.com</p>
          </a>
          <p>010-8738-4513</p>
        </div>
        <div className="font-black text-[3vmax] h-[3vmax] flex justify-center items-center">
          JINU KIM
        </div>
      </div>
    </footer>
  );
};

export default Footer;
