"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/types";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { ApiKeyList } from "@/features/apiKeyWork/ui/ApiKeyList";
import { Integration } from "@/widgets/projects/ui/Integration";
import { AddApiKey } from "@/features/apiKeyWork/ui/AddApiKey";
import { AddProjectMember } from "@/features/projectWork/ui/AddProjectMember";
import { ManageProjectMembers } from "@/features/projectWork/ui/ManageProjectMembers";

const ProjectPage = () => {
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
          <div className="flex flex-col p-8 sm:p-12">
            <div className="flex flex-row w-full justify-between items-start ">
              <div>
                <h1 className="text-h1 font-bold text-black  mb-2 ">
                  {currentProject?.name.toUpperCase() ||
                    "Название проекта".toUpperCase()}
                </h1>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-body font-medium bg-[#4C6DFA]/20 text-[#4C6DFA] ">
                  Роль в проекте: {currentProject?.role || "Неизвестно"}
                </span>
              </div>
              <div className={"flex flex-row sm:gap-3 gap-1 mt-2"}>
                {currentProject?.role !== "READER" && (
                  <ManageProjectMembers
                    {...currentProject}
                  ></ManageProjectMembers>
                )}
                {currentProject?.role !== "READER" && (
                  <AddProjectMember {...currentProject}></AddProjectMember>
                )}

                <span
                  onClick={() => {
                    router.push(`/dashboard`);
                  }}
                  className="sm:inline-flex hidden  gap-2 items-center px-3 py-1 rounded-full text-body font-medium bg-[#4C6DFA]/20 text-[#4C6DFA] hover:cursor-pointer"
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
            </div>
            <div className="mt-4 text-black ">
              <h3 className="text-h3 font-semibold mb-2">Описание проекта</h3>
              <p className="text-body leading-relaxed">
                {currentProject?.description || "Описание проекта отсутствует."}
              </p>
            </div>
          </div>
          <Integration {...currentProject}></Integration>
        </div>
        <div className="w-full px-0 py-8 sm:p-12">
          <div className="rounded-none border-x-0 border-y border-[#4C6DFA]/20 bg-[#3652D9]/20 p-0 backdrop-blur-sm sm:rounded-[2rem] sm:border sm:p-7">
            <div className="flex flex-col w-full sm:flex-row sm:items-center justify-between gap-4">
              <div className="px-4 pt-5 sm:px-0 sm:pt-0">
                <span className="text-h2 font-bold text-[#4C6DFA]">
                  API КЛЮЧИ
                </span>
                <p className="mt-2 max-w-2xl text-body text-[#2B3C7E]">
                  Создавайте ключи для интеграции, отслеживайте срок их действия
                  и отзывайте ненужные.
                </p>
              </div>
              <div className="px-4 sm:px-0">
                <AddApiKey {...currentProject}></AddApiKey>
              </div>
            </div>
            <div className="mt-6 rounded-none border-x-0 border-y border-white/70 bg-white/65 p-1 sm:rounded-[1.5rem] sm:border sm:p-4">
              <ApiKeyList projectId={currentProject.id}></ApiKeyList>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
