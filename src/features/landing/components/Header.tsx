"use client";

import { ChartColumnStacked } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/ui/Button";
import { useRouter } from "next/navigation";

const Header = () => {
  const path = useRouter();
  return (
    <>
      <header
        className={
          "flex flex-col sm:flex-row sm:items-center justify-between w-full h-fit text-body"
        }
      >
        <div className="flex  items-center gap-1">
          <ChartColumnStacked stroke="white" className="self-end" />
          <span className="font-bold text-white leading-none">LOGBOARD</span>
        </div>

        <nav className={"flex items-center justify-end gap-5 text-white"}>
          <Link href={"#features"}>ВОЗМОЖНОСТИ</Link>
          <Link href={"#about"}>О НАС</Link>
          <Link href={"#faq"}>ВОПРОСЫ</Link>
          <Button
            bgColor={"linear-gradient(90deg,#83FF8F,#CC7FF0)"}
            textColor={"black"}
            borderColor={"black"}
            onClick={() => path.push("/login")}
          >
            ВОЙТИ
          </Button>
        </nav>
      </header>
    </>
  );
};

export default Header;
