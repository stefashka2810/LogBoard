import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";
import {
  useDeleteProjectMutation,
  useGetProjectsQuery,
} from "@/features/projectWork/api/projectApi";
import { ClipLoader } from "react-spinners";
import { CircleX, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import Modal from "@/shared/ui/Modal";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/ui/sheet";
import { useIsMobile } from "@/widgets/landing/lib/use-mobile";
import ConfirmProjectDelete from "@/features/projectWork/ui/ConfirmProjectDelete";
import { useDispatch, useSelector } from "react-redux";
import { Project } from "@/entities/project/model/types";
import { useRouter } from "next/navigation";
import {
  setClearSelectedProject,
  setProjects,
  setSelectedProject,
} from "@/features/projectWork/model/projectsWorkSlice";
import { RootState } from "@/app/store/types";

const ProjectList = () => {
  const { data, isError, isLoading } = useGetProjectsQuery();
  const [deleteProject, { error, isSuccess, reset }] =
    useDeleteProjectMutation();
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const selectedProject = useSelector(
    (state: RootState) => state.projectsWork.selectedProject,
  );

  useEffect(() => {
    if (data && data.length > 0) {
      dispatch(setProjects(data));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return (
      <div className={"flex flex-col h-full items-center justify-center my-10"}>
        <ClipLoader color="#E4E0FF" size={50} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={"flex flex-col h-full items-center justify-center my-10"}>
        <span className={"text-black text-body"}>Ошибка загрузки проектов</span>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={"flex flex-col h-full items-center justify-center my-10"}>
        <span className={"text-black text-body"}>Нет проектов</span>
      </div>
    );
  }

  const handleClickDelete = async () => {
    if (!selectedProjectId) return;

    try {
      await deleteProject(selectedProjectId).unwrap();
      dispatch(setClearSelectedProject());
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

  const handleSelectProject = (project: Project) => {
    dispatch(setSelectedProject(project));
  };

  const handleClickProject = (project: Project) => {
    router.push(`/projects/${project.id}`);
  };

  const sortedData = [...(data || [])].sort((a, b) => {
    const dateA = new Date(a.updated_at).getTime();
    const dateB = new Date(b.updated_at).getTime();
    return dateB - dateA;
  });

  return (
    <>
      <SidebarMenu>
        {sortedData.map((p) => (
          <SidebarMenuItem key={p.id}>
            <SidebarMenuButton
              asChild
              className={
                selectedProject && selectedProject.id === p.id
                  ? `bg-[#E4E0FF] cursor-default z-8`
                  : `hover:bg-[#E4E0FF] hover:cursor-pointer z-8`
              }
              onClick={() => handleSelectProject(p)}
            >
              <span className="flex flex-row w-full h-max justify-between items-center">
                <span className="flex flex-row gap-2 items-center">
                  <span className="inline-flex p-1 size-5 items-center justify-center rounded-md bg-black/10 text-[10px] font-semibold text-black">
                    {p.name.slice(0, 2).toUpperCase()}
                  </span>

                  <span>
                    {p.name.length > 20 ? p.name.slice(0, 20) + "..." : p.name}
                  </span>
                </span>

                <span className="flex flex-row gap-2 items-center ">
                  <ExternalLink
                    width={18}
                    stroke="black"
                    className="delete-icon hover:cursor-pointer opacity-50 hover:opacity-100 z-9"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClickProject(p);
                    }}
                  />

                  <CircleX
                    width={18}
                    stroke="black"
                    className="delete-icon hover:cursor-pointer opacity-50 hover:opacity-100 z-9"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModal(p.id);
                    }}
                  />
                </span>
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
