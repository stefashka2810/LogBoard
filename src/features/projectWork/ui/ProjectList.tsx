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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/ui/sheet";
import AddProjectForm from "@/features/projectWork/ui/AddProjectForm";
import { useIsMobile } from "@/widgets/landing/lib/use-mobile";
import ConfirmProjectDelete from "@/features/projectWork/ui/ConfirmProjectDelete";

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
  const isMobile = useIsMobile();
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
      {isMobile ? (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="bottom" className="h-fit">
            <SheetHeader>
              <SheetTitle>Удаление проекта</SheetTitle>
            </SheetHeader>

            <ConfirmProjectDelete
              isError={isError}
              error={error}
              isSuccess={isSuccess}
              isLoading={isLoading}
              onClickDelete={handleClickDelete}
              onCloseModal={handleCloseModal}
            ></ConfirmProjectDelete>
          </SheetContent>
        </Sheet>
      ) : (
        <Modal open={open} onClose={handleCloseModal}>
          <ConfirmProjectDelete
            isError={isError}
            error={error}
            isSuccess={isSuccess}
            isLoading={isLoading}
            onClickDelete={handleClickDelete}
            onCloseModal={handleCloseModal}
          ></ConfirmProjectDelete>
        </Modal>
      )}
    </>
  );
};

export default ProjectList;
