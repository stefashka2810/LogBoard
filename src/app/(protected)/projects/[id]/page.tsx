"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/types";
import { Check, Copy, Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "@/shared/ui/Modal";
import AddApiKeyForm from "@/features/apiKeyWork/ui/AddApiKeyForm";
import Image from "next/image";
import { ApiKeyList } from "@/features/apiKeyWork/ui/ApiKeyList";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/ui/sheet";
import { useIsMobile } from "@/widgets/landing/lib/use-mobile";

const ProjectPage = () => {
  const [open, setOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const projects = useSelector(
    (state: RootState) => state.projectsWork.projects,
  );
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const currentProject = projects.find((project) => project.id === id);

  useEffect(() => {
    if (!currentProject && projects.length > 0) {
      router.push("/dashboard");
    }
  }, [currentProject, projects, router]);

  const handleActionWithModal = (flag: boolean) => {
    setOpen(flag);
  };

  const handleCopy = async (value: string, field: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      console.log("Copy failed:", error);
    }
  };

  if (!currentProject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        "bg-[#99EEFF]/10 flex flex-col items-center justify-center min-h-screen w-full "
      }
    >
      <div className="w-full mx-auto">
        <div className=" rounded-2xl  flex flex-col  ">
          <div className="flex flex-col  p-8 sm:p-12">
            <div className="flex flex-row w-full justify-between items-start">
              <div>
                <h1 className="text-h1 font-bold text-black  mb-2">
                  {currentProject?.name.toUpperCase() ||
                    "Название проекта".toUpperCase()}
                </h1>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-body font-medium bg-[#4C6DFA]/20 text-[#4C6DFA] ">
                  Владелец: {currentProject?.owner || "Неизвестен"}
                </span>
              </div>
              <span
                onClick={() => {
                  router.push(`/dashboard`);
                }}
                className="inline-flex gap-2 items-center px-3 py-1 rounded-full text-body font-medium bg-[#4C6DFA]/20 text-[#4C6DFA] hover:cursor-pointer"
              >
                <Image
                  src={"/images/Vector 2.svg"}
                  alt={"vector"}
                  width={"30"}
                  height={"30"}
                  color={"#4C6DFA"}
                ></Image>
                Вернуться
              </span>
            </div>
            <div className="mt-4 text-black ">
              <h3 className="text-h3 font-semibold mb-2">Описание проекта</h3>
              <p className="text-body leading-relaxed">
                {currentProject?.description || "Описание проекта отсутствует."}
              </p>
            </div>
          </div>
          <div className="relative w-full text-black aspect-[4/5] sm:aspect-[5/4] lg:aspect-[16/9]">
            <Image
              src="/images/Subtract.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-fill"
            />
            <div className="absolute inset-0 z-10">
              <div className="absolute left-[3.5%] top-[15%] w-[54%] space-y-2 sm:space-y-3 text-white">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  ИНТЕГРАЦИЯ В ВАШ ПРОЕКТ
                </h2>
                <p className="text-body leading-5   md:leading-6">
                  Используйте эту пошаговую инструкцию для отправки логов в
                  LogBoard
                </p>
              </div>

              <div className="absolute left-[3.5%] top-[30%] w-fit rounded-xl bg-white p-3 text-body sm:p-4 ">
                <span className={"text-[#A33E94] font-bold text-h3"}>
                  ЭТАП 1
                </span>{" "}
                <br></br>
                Создайте API-ключ в блоке ниже, сохраните его сразу в надежном
                месте! <br></br>
                Если хотите сделать ключ бессрочным, то при создании оставьте
                соответствующее поле пустым
              </div>
              <div className="absolute top-[46%] left-[30%]">
                <Image
                  src="/images/Vector 64.png"
                  alt=""
                  width={91}
                  height={109}
                  className="h-auto w-12 sm:w-16 md:w-[91px]"
                />
              </div>

              <div className="absolute left-[10%] bottom-[20%] w-fit rounded-xl bg-white p-3 text-body sm:p-4 ">
                <span className={"text-[#A33E94] font-bold text-h3"}>
                  ЭТАП 2
                </span>{" "}
                <br></br>
                Скопируйте projectId, затем передайте его и API-ключ
                backend-разработчику <br></br>
                <div className="min-w-0 inline-flex rounded-lg bg-[#A33E94]/20 p-2 mt-3 w-full justify-between">
                  <p className="mt-1 break-all font-mono text-xs text-black sm:text-sm">
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

              <div className="absolute top-[70%] right-[38%]">
                <Image
                  src="/images/Vector 70.png"
                  alt=""
                  width={91}
                  height={109}
                  className="h-auto w-17 sm:w-20 md:w-42"
                />
              </div>

              <div className="absolute  right-[5%] top-[22%] max-w-[42%] rounded-xl bg-white p-3 text-body sm:p-4 ">
                <span className={"text-[#A33E94] font-bold text-h3"}>
                  ЭТАП 3
                </span>{" "}
                <br></br>
                Отправьте пакет логов на POST /logs/ingest
                <div className="mt-3 rounded-lg bg-[#A33E94]/80 p-3 text-xs leading-5 text-white">
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
          </div>
        </div>
        <div className="w-full p-8 sm:p-12">
          <div className="rounded-[2rem] border border-[#4C6DFA]/20 bg-[#3652D9]/20 p-5  backdrop-blur-sm sm:p-7">
            <div className="flex flex-col w-full sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-h2 font-bold text-[#4C6DFA]">
                  API КЛЮЧИ
                </span>
                <p className="mt-2 max-w-2xl text-body text-[#2B3C7E]">
                  Создавайте ключи для интеграции, отслеживайте срок их действия
                  и отзывайте ненужные.
                </p>
              </div>
              <button
                onClick={() => handleActionWithModal(true)}
                className="flex w-fit items-center gap-2 rounded-lg bg-[#A33E94]/40 px-4 py-2.5 text-sm font-semibold text-[#081133]  transition-transform hover:cursor-pointer hover:scale-[1.02]"
              >
                <Plus className="size-4 shrink-0 text-black" />
                <span>Создать ключ</span>
              </button>
            </div>
            <div className="mt-6 rounded-[1.5rem] border border-white/70 bg-white/65 p-3  sm:p-4">
              <ApiKeyList projectId={currentProject.id}></ApiKeyList>
            </div>
          </div>
        </div>
      </div>
      {isMobile ? (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="bottom" className="h-fit">
            <SheetHeader>
              <SheetTitle>Создать ключ</SheetTitle>
            </SheetHeader>
            <AddApiKeyForm
              projectId={currentProject.id}
              onClose={() => handleActionWithModal(false)}
            ></AddApiKeyForm>
          </SheetContent>
        </Sheet>
      ) : (
        <Modal open={open} onClose={() => handleActionWithModal(false)}>
          <AddApiKeyForm
            projectId={currentProject.id}
            onClose={() => handleActionWithModal(false)}
          ></AddApiKeyForm>
        </Modal>
      )}
    </div>
  );
};

export default ProjectPage;
