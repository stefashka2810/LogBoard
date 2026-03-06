import {
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";
import { useGetProjectsQuery } from "@/features/projectWork/api/projectApi";
import { ClipLoader } from "react-spinners";
import Link from "next/link";

const ProjectList = () => {
  const { data, isError, isLoading } = useGetProjectsQuery();

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
        <span className={"text-black"}>Ошибка загрузки проектов</span>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={"flex flex-col h-full items-center justify-center my-10"}>
        <span className={"text-black"}>Нет проектов</span>
      </div>
    );
  }

  const newProject = data.reduce((a, b) =>
    new Date(a.created_at).getTime() > new Date(b.created_at).getTime() ? a : b,
  );

  return (
    <SidebarMenu>
      {data &&
        data.map((p) => (
          <SidebarMenuItem key={p.id}>
            <SidebarMenuButton asChild className={"hover:bg-[#E4E0FF]"}>
              <Link
                href={`/projects/${p.id}`}
                className="text-black  data-[active=true]:bg-black/10"
              >
                <span className="inline-flex size-5 items-center justify-center rounded-md bg-black/10 text-[10px] font-semibold text-black">
                  {p.name.slice(0, 2).toUpperCase()}
                </span>

                <span>{p.name}</span>

                {p === newProject && (
                  <SidebarMenuBadge className="bg-black/10 text-black">
                    new
                  </SidebarMenuBadge>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
    </SidebarMenu>
  );
};

export default ProjectList;
