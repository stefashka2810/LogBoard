import { Github, Send } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className={"w-full"}>
      <div
        className={
          "flex flex-row w-full h-fit py-[1.5vw] px-[4vw] bg-transparent border-t border-black/10 items-center justify-between"
        }
      >
        <span className={"text-body text-black/50"}>
          {`© ${year} НИУ ВШЭ. Курсовой проект.`}
        </span>

        <div className={"flex flex-row items-center gap-5 text-black/50"}>
          <Send className={"w-5 md:w-auto"} />
          <Github className={"w-5 md:w-auto"} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
