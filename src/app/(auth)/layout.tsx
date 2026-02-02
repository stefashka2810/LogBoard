import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={
        "relative flex flex-row w-full h-screen justify-center bg-black"
      }
    >
      <div className={"absolute top-0 left-0"}>
        <div className="relative w-[200px] h-[200px] md:w-[270px] md:h-[270px] lg:w-[330px] lg:h-[330px]">
          <Image
            src={"/images/Ellipse 3.svg"}
            alt={"laptop"}
            fill
            className="object-contain scale-110"
            priority
          ></Image>
        </div>
      </div>

      <div className={"absolute top-1/5 right-0 sm:top-1/11 sm:right-1/4"}>
        <div className="relative w-[180px] h-[180px] md:w-[250px] md:h-[250px] lg:w-[310px] lg:h-[310px]">
          <Image
            src={"/images/Ellipse 2.svg"}
            alt={"laptop"}
            fill
            className="object-contain scale-110"
            priority
          ></Image>
        </div>
      </div>

      <div className={"absolute bottom-1/6 sm:bottom-1/11 left-0 sm:left-1/4"}>
        <div className="relative w-[160px] h-[160px] md:w-[190px] md:h-[190px] lg:w-[250px] lg:h-[250px]">
          <Image
            src={"/images/Ellipse 1.svg"}
            alt={"laptop"}
            fill
            className="object-contain scale-110"
            priority
          ></Image>
        </div>
      </div>
      <div
        className={
          "relative flex flex-col h-full w-md justify-center items-center px-[4vw] sm:px-0"
        }
      >
        {children}
      </div>
    </div>
  );
}
