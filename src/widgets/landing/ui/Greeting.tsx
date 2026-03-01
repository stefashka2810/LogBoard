"use client";

import { Button } from "@/shared/ui/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Greeting() {
  const path = useRouter();
  return (
    <>
      <section className={"flex flex-col w-fit h-fit gap-[2vw]"}>
        <strong className={"font-bold text-white text-h1"}>
          ЧЕТКИЙ ОБЗОР ЛОГОВ. <br />
          БЫСТРЫЙ ПОИСК И ОТЛАДКА.
        </strong>

        <Button
          bgColor={"white"}
          borderColor={"#8E7FF0"}
          textColor={"#8E7FF0"}
          onClick={() => path.push("/login")}
        >
          <div className={"flex flex-row gap-5"}>
            <p>Начать</p>
            <Image
              src={"images/Vector 2.svg"}
              alt={"vector"}
              width={"30"}
              height={"30"}
            ></Image>
          </div>
        </Button>
      </section>
    </>
  );
}

export default Greeting;
