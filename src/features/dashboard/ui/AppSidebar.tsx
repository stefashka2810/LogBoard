"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarHeader,
} from "@/shared/ui/sidebar";

import { Eraser } from "lucide-react";

import LogoutMenu from "@/features/userAuth/ui/LogoutMenu";
import { lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/types";
import { setClearSelectedProject } from "@/features/projectWork/model/projectsWorkSlice";
import { useGetProjectsQuery } from "@/features/projectWork/api/projectApi";

const AddProject = lazy(() => import("@/features/projectWork/ui/AddProject"));
const ProjectList = lazy(() => import("@/features/projectWork/ui/ProjectList"));

export function AppSidebar() {
  const selectedProject = useSelector(
    (state: RootState) => state.projectsWork.selectedProject,
  );
  const { isLoading, isError } = useGetProjectsQuery();
  const dispatch = useDispatch();
  return (
    <Sidebar className="bg-[#AFA3FD] text-black">
      <SidebarHeader className="p-3">
        <div className="leading-tight">
          <div className="text-sm font-semibold text-black">Проекты</div>
          <div className="text-xs text-black/70">Твое пространство</div>
        </div>
        <Suspense fallback={<div>Загрузка...</div>}>
          <AddProject handleClick2={() => {}} />
        </Suspense>
      </SidebarHeader>
      <SidebarSeparator className="bg-black/15" />
      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-black/70">
            <span
              className={
                "flex flex-row w-full h-fit justify-between items-center gap-2 mb-5"
              }
            >
              Участвую в проектах
              {selectedProject && !isLoading && !isError && (
                <button
                  onClick={() => dispatch(setClearSelectedProject())}
                  className="inline-flex px-1 rounded-lg bg-[#E4E0FF] hover:bg-[#E4E0FF]/80 hover:cursor-pointer"
                >
                  <Eraser width={15} />
                </button>
              )}
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <ProjectList />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <LogoutMenu />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
