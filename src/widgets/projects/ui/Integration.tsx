import Image from "next/image";
import { Check, ChevronDown, ChevronUp, Copy } from "lucide-react";
import { useState } from "react";
import { Project } from "@/entities/project/model/types";

export const Integration = (currentProject: Project) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleCopy = async (value: string, field: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      console.log("Copy failed:", error);
    }
  };

  return (
    <>
      <div className="xl:hidden rounded-[2rem] bg-[linear-gradient(180deg,#6C7FEF,#A7B4FF)] p-4 text-black sm:p-6">
        <div className="space-y-2 text-white">
          <h2 className="text-xl font-bold sm:text-2xl">
            ИНТЕГРАЦИЯ В ВАШ ПРОЕКТ
          </h2>
          <p className="text-body leading-6">
            Используйте эту пошаговую инструкцию для отправки логов в LogBoard
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          <div className="rounded-xl bg-white p-3 text-body sm:p-4">
            <span className="text-h3 font-bold text-[#A33E94]">ЭТАП 1</span>
            <br />
            Создайте API-ключ в блоке ниже, сохраните его сразу в надежном
            месте!
            <br />
            Если хотите сделать ключ бессрочным, то при создании оставьте
            соответствующее поле пустым
          </div>

          <div className="rounded-xl bg-white p-3 text-body sm:p-4">
            <span className="text-h3 font-bold text-[#A33E94]">ЭТАП 2</span>
            <br />
            Скопируйте projectId, затем передайте его и API-ключ
            backend-разработчику
            <br />
            <div className="mt-3 inline-flex w-full min-w-0 justify-between rounded-lg bg-[#A33E94]/20 p-2">
              <p className="mt-1 break-all font-mono text-xs text-black sm:text-sm">
                {currentProject.id}
              </p>
              <div
                onClick={() => handleCopy(currentProject.id, "projectId")}
                className="w-fit hover:cursor-pointer"
              >
                {copiedField === "projectId" ? (
                  <Check className="w-5" />
                ) : (
                  <Copy className="w-5" />
                )}
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-3 text-body sm:p-4">
            <span className="text-h3 font-bold text-[#A33E94]">ЭТАП 3</span>
            <br />
            <span className="flex w-full items-center justify-between gap-4">
              Отправьте пакет логов на POST /logs/ingest, получите ingestionId
              {open1 ? (
                <ChevronUp
                  className="shrink-0 hover:cursor-pointer"
                  onClick={() => setOpen1(false)}
                />
              ) : (
                <ChevronDown
                  className="shrink-0 hover:cursor-pointer"
                  onClick={() => {
                    setOpen1(true);
                    setOpen2(false);
                  }}
                />
              )}
            </span>
            <div
              className={`grid transition-all duration-300 ease-out ${
                open1
                  ? "mt-3 grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="rounded-lg bg-[#A33E94]/80 p-3 text-xs leading-5 text-white">
                  <pre className="overflow-x-auto whitespace-pre-wrap break-words font-mono">
                    <code>{`fetch("/logs/ingest", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": "<API_KEY>"
  },
  body: JSON.stringify({
    projectId: "${currentProject.id}",
    logs: [
      {
        level: "INFO",
        message: "User signed in",
        timestamp: "2026-04-24T12:00:00.000Z"
      }
    ]
  })
})`}</code>
                  </pre>
                </div>
              </div>
            </div>
            <span className="mt-3 flex w-full items-center justify-between gap-4">
              Используйте GET /logs/ingest/ {"{"}ingestionId{"}"} для проверки
              статуса обработки пакета логов
              {open2 ? (
                <ChevronUp
                  className="shrink-0 hover:cursor-pointer"
                  onClick={() => setOpen2(false)}
                />
              ) : (
                <ChevronDown
                  className="shrink-0 hover:cursor-pointer"
                  onClick={() => {
                    setOpen2(true);
                    setOpen1(false);
                  }}
                />
              )}
            </span>
            <div
              className={`grid transition-all duration-300 ease-out ${
                open2
                  ? "mt-3 grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="rounded-lg bg-[#4C6DFA]/85 p-3 text-xs leading-5 text-white">
                  <pre className="overflow-x-auto whitespace-pre-wrap break-words font-mono">
                    <code>{`fetch(\`/logs/ingest/\${ingestionId}\`, {
  method: "GET",
  headers: {
    "X-API-Key": "<API_KEY>"
  }
})`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative hidden w-full text-black xl:block xl:aspect-[16/9]">
        <Image
          src="/images/Subtract.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-fill"
        />
        <div className="absolute inset-0 z-10">
          <div className="absolute left-[2%] top-[15%] w-[54%] space-y-1 text-white">
            <h2 className="text-3xl font-bold">ИНТЕГРАЦИЯ В ВАШ ПРОЕКТ</h2>
            <p className="text-body leading-6">
              Используйте эту пошаговую инструкцию для отправки логов в LogBoard
            </p>
          </div>

          <div className="absolute flex flex-col left-[2%] top-[30%] w-fit rounded-xl bg-white px-4 py-3 text-body">
            <span className={"text-[#A33E94] font-bold text-h3"}>ЭТАП 1</span>
            Создайте API-ключ в блоке ниже, сохраните его сразу в надежном
            месте!
            <br />
            Если хотите сделать ключ бессрочным, то при создании оставьте
            соответствующее поле пустым
          </div>
          <div className="absolute left-[20%] top-[47%]">
            <Image
              src="/images/Vector 64.png"
              alt=""
              width={91}
              height={109}
              className="h-auto w-[95px]"
            />
          </div>

          <div className="absolute left-[13%] bottom-[18%] w-fit rounded-xl bg-white px-4 py-3 text-body">
            <span className={"text-[#A33E94] font-bold text-h3"}>ЭТАП 2</span>
            <br />
            Скопируйте projectId, затем передайте его и API-ключ
            backend-разработчику
            <br />
            <div className="mt-3 inline-flex w-full min-w-0 justify-between rounded-lg bg-[#A33E94]/20 p-2">
              <p className="mt-1 break-all font-mono text-sm text-black">
                {currentProject.id}
              </p>
              <div
                onClick={() => handleCopy(currentProject.id, "projectId")}
                className="w-fit hover:cursor-pointer "
              >
                {copiedField === "projectId" ? (
                  <Check className={"w-5"} />
                ) : (
                  <Copy className={"w-5"} />
                )}
              </div>
            </div>
          </div>

          <div className="absolute top-[50%] right-[40%]">
            <Image
              src="/images/Vector 114.png"
              alt=""
              width={91}
              height={109}
              className="h-auto w-40"
            />
          </div>

          <div className="absolute right-[2%] top-1/2 max-w-[40%] -translate-y-1/2 rounded-xl bg-white px-4 py-3 text-body">
            <span className={"text-[#A33E94] font-bold text-h3"}>ЭТАП 3</span>
            <br />
            <span
              className={
                "flex flex-row w-full justify-between gap-6 items-center"
              }
            >
              Отправьте пакет логов на POST /logs/ingest, получите ingestionId
              {open1 ? (
                <ChevronUp
                  className="shrink-0 hover:cursor-pointer "
                  onClick={() => setOpen1(false)}
                />
              ) : (
                <ChevronDown
                  className="shrink-0 hover:cursor-pointer"
                  onClick={() => {
                    setOpen1(true);
                    setOpen2(false);
                  }}
                />
              )}
            </span>

            <div
              className={`grid transition-all duration-300 ease-out ${
                open1
                  ? "mt-2 grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="rounded-lg bg-[#A33E94]/80 p-2 text-xs leading-5 text-white">
                  <pre className="overflow-x-auto whitespace-pre-wrap break-words font-mono">
                    <code>{`fetch("/logs/ingest", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": "<API_KEY>"
  },
  body: JSON.stringify({
    projectId: "${currentProject.id}",
    logs: [
      {
        level: "INFO",
        message: "User signed in",
        timestamp: "2026-04-24T12:00:00.000Z"
      }
    ]
  })
})`}</code>
                  </pre>
                </div>
              </div>
            </div>
            <span
              className={
                "mt-2 flex flex-row w-full gap-6 justify-between items-center"
              }
            >
              Используйте GET /logs/ingest/ {"{"}ingestionId{"}"} для проверки{" "}
              статуса <br></br> обработки пакета логов
              {open2 ? (
                <ChevronUp
                  className="shrink-0 hover:cursor-pointer"
                  onClick={() => setOpen2(false)}
                />
              ) : (
                <ChevronDown
                  className="shrink-0 hover:cursor-pointer"
                  onClick={() => {
                    setOpen2(true);
                    setOpen1(false);
                  }}
                />
              )}
            </span>
            <div
              className={`grid transition-all duration-300 ease-out ${
                open2
                  ? "mt-2 grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="rounded-lg bg-[#4C6DFA]/85 p-2 text-xs leading-5 text-white">
                  <pre className="overflow-x-auto whitespace-pre-wrap break-words font-mono">
                    <code>{`fetch(\`/logs/ingest/\${ingestionId}\`, {
  method: "GET",
  headers: {
    "X-API-Key": "<API_KEY>"
  }
})`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
