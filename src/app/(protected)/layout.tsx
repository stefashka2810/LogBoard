"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/types";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar";
import { AppSidebar } from "@/features/dashboard/ui/AppSidebar";

export default function Layout({ children }: { children: ReactNode }) {
  // const isAuth = useSelector((state: RootState) => state.userAuth.isAuth);
  const isAuth = true;
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.replace("/login");
    }
  }, [isAuth, router]);

  return isAuth ? (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  ) : null;
}
