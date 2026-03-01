import Image from "next/image";

const AboutUsSection = () => {
  return (
    <section className="relative w-full min-h-[80vh] pt-[5vw] pb-0 rounded-4xl bg-black text-white overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url("/images/Mask.svg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.2,
        }}
      />

      <div className={"relative z-10 flex flex-col h-fit"}>
        <div className="relative w-[230px] h-[230px] lg:w-[280px] lg:h-[280px] opacity-20">
          <Image
            src="/images/02.svg"
            alt="2"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div
          className={
            "absolute top-7/12 left-10 flex flex-col gap-5 w-[80vw] sm:w-[60vw] md:w-[40vw]"
          }
        >
          <span className={"text-h2 font-bold"}>
            Еще немного о платформе
            <br />
            LogBoard
          </span>
          <div className={"text-body"}>
            Мы придумали LogBoard как современную платформу централизованного
            логирования, чтобы разработчики, команды и DevOps-специалисты могли
            быстрее находить проблемы и удобно работать с логами своих
            приложений.
          </div>
        </div>
      </div>

      <div className={"absolute right-0 bottom-0 "}>
        <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px]">
          <Image
            src={"/images/macbook.svg"}
            alt={"laptop"}
            fill
            className="object-contain scale-120"
            priority
          ></Image>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
