import {
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";
import {
  useDeleteProjectMutation,
  useGetProjectsQuery,
} from "@/features/projectWork/api/projectApi";
import { ClipLoader } from "react-spinners";
import Link from "next/link";
import { CircleX } from "lucide-react";
import { Project } from "@/entities/project/model/types";
import { useState } from "react";
import Modal from "@/shared/ui/Modal";
import { Button } from "@/shared/ui/Button";

const ProjectList = () => {
  // const { data, isError, isLoading } = useGetProjectsQuery();
  //
  // if (isLoading) {
  //   return (
  //     <div className={"flex flex-col h-full items-center justify-center my-10"}>
  //       <ClipLoader color="#E4E0FF" size={50} />
  //     </div>
  //   );
  // }
  //
  // if (isError) {
  //   return (
  //     <div className={"flex flex-col h-full items-center justify-center my-10"}>
  //       <span className={"text-black"}>Ошибка загрузки проектов</span>
  //     </div>
  //   );
  // }
  //
  // if (!data || data.length === 0) {
  //   return (
  //     <div className={"flex flex-col h-full items-center justify-center my-10"}>
  //       <span className={"text-black"}>Нет проектов</span>
  //     </div>
  //   );
  // }

  const [deleteProject, { isLoading, isError, error, isSuccess, reset }] =
    useDeleteProjectMutation();
  const [open, setOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );

  const handleClickDelete = async () => {
    if (!selectedProjectId) return;

    try {
      await deleteProject(selectedProjectId).unwrap();

      setTimeout(() => {
        setOpen(false);
        setSelectedProjectId(null);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = (id: string) => {
    setSelectedProjectId(id);
    setOpen(true);
    reset();
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedProjectId(null);
  };

  const data: Project[] = [
    {
      id: "proj_1a2b3c4d",
      name: "Корпоративный сайт",
      description:
        "Разработка современного корпоративного сайта с системой управления контентом и интеграцией с CRM",
      created_at: "2024-01-15T10:30:00Z",
      updated_at: "2024-03-20T14:25:00Z",
      owner: "user_alex_smith",
    },
    {
      id: "proj_5e6f7g8h",
      name: "Мобильное приложение для доставки",
      description:
        "Кроссплатформенное приложение для службы доставки еды с отслеживанием заказов в реальном времени",
      created_at: "2024-02-01T09:00:00Z",
      updated_at: "2024-03-21T16:40:00Z",
      owner: "user_maria_johnson",
    },
  ];

  data.sort((a, b) => {
    const dateA = new Date(a.updated_at).getTime();
    const dateB = new Date(b.updated_at).getTime();
    return dateB - dateA;
  });

  return (
    <>
      <SidebarMenu>
        {data.map((p) => (
          <SidebarMenuItem key={p.id}>
            <SidebarMenuButton asChild className="hover:bg-[#E4E0FF]">
              <span className="flex flex-row w-full h-max justify-between items-center">
                <span className="flex flex-row gap-2 items-center">
                  <span className="inline-flex p-1 size-5 items-center justify-center rounded-md bg-black/10 text-[10px] font-semibold text-black">
                    {p.name.slice(0, 2).toUpperCase()}
                  </span>

                  <span>
                    {p.name.length > 20 ? p.name.slice(0, 20) + "..." : p.name}
                  </span>
                </span>

                <CircleX
                  stroke="black"
                  className="hover:cursor-pointer opacity-30 hover:opacity-50"
                  onClick={() => handleOpenModal(p.id)}
                />
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>

      <Modal open={open} onClose={handleCloseModal}>
        <div
          className={
            "flex flex-col gap-2 items-center justify-center w-full h-fit p-8"
          }
        >
          <span className={"font-semibold mb-3"}>
            Вы уверены, что хотите удалить проект?
          </span>

          {isError && (
            <span className={"text-xs text-black"}>
              {typeof error === "string"
                ? error
                : error && typeof error === "object" && "message" in error
                  ? (error as { message: string }).message
                  : "Произошла ошибка. Попробуйте позже"}
            </span>
          )}

          {isSuccess && (
            <span className={"text-xs text-black"}>Проект успешно удален!</span>
          )}

          <div
            className={"flex flex-row w-full gap-2 justify-center items-center"}
          >
            <Button
              className="w-full py-1 text-white md:text-sm rounded-md h-9 hover:scale-100 border-none bg-[#F07FE5]"
              onClick={handleClickDelete}
            >
              {isLoading ? "Удаление..." : "Да, удалить"}
            </Button>

            <Button
              className="w-full py-1 md:text-sm rounded-md h-9 border-none hover:scale-100 bg-white"
              onClick={handleCloseModal}
            >
              Отмена
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProjectList;
