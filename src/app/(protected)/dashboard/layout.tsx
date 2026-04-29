import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar";
import { AppSidebar } from "@/features/dashboard/ui/AppSidebar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex h-screen max-h-screen flex-1 flex-col overflow-hidden bg-white">
        <div className="relative z-20 flex h-14 shrink-0 items-center border-b border-[#E9E9E9] bg-white px-4">
          <SidebarTrigger className="relative z-30" />
        </div>
        <div className="min-h-0 flex-1">{children}</div>
      </main>
    </SidebarProvider>
  );
}
