"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarHeader,
} from "@/shared/ui/sidebar";

import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

import UserInfo from "@/entities/user/ui/UserInfo";
import LogoutMenu from "@/features/userAuth/ui/LogoutMenu";
import AddProject from "@/features/dashboard/ui/AddProject";
import ProjectList from "@/features/projectWork/ui/ProjectList";
import { useState } from "react";

export function AppSidebar() {
  const [open, setOpen] = useState(false);
  const handleClickCreateProject = (arg: boolean) => {
    setOpen(arg);
  };
  return (
    <Sidebar
      isCreateProjectModalOpen={open}
      className="bg-[#AFA3FD] text-black"
    >
      <SidebarHeader className="p-3">
        <div className="leading-tight">
          <div className="text-sm font-semibold text-black">Проекты</div>
          <div className="text-xs text-black/70">Твое пространство</div>
        </div>
        <AddProject handleClick2={handleClickCreateProject} />
      </SidebarHeader>
      <SidebarSeparator className="bg-black/15" />
      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-black/70">
            Участвую в проектах
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <ProjectList></ProjectList>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="text-black bg-[#E4E0FF] hover:bg-[#E4E0FF]/80 hover:cursor-pointer data-[state=open]:bg-[#E4E0FF]/80"
                >
                  <UserInfo />
                  <ChevronDown className="ml-auto size-4 text-black/70" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <LogoutMenu />
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
