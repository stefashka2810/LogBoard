import { ChartColumnStacked } from "lucide-react";
import Link from "next/link";
import Button from "@/shared/ui/Button";

const Header = () => {
  return (
    <>
      <header
        className={"flex flex-row items-center justify-between w-full h-fit "}
      >
        <div className="flex items-end gap-1">
          <ChartColumnStacked stroke="white" className="self-end" />
          <span className="font-bold text-white leading-none">LOGBOARD</span>
        </div>

        <nav className={"flex items-center gap-5 text-white"}>
          <Link href={"#"}>ФИЧИ</Link>
          <Link href={"#"}>О НАС</Link>
          <Link href={"#"}>ВОПРОСЫ</Link>
          <Button
            bgColor={"linear-gradient(90deg,#83FF8F,#CC7FF0)"}
            textColor={"black"}
            borderColor={"black"}
          >
            ВОЙТИ
          </Button>
        </nav>
      </header>
    </>
  );
};

export default Header;
