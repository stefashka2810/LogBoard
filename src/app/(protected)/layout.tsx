"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/types";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar";
import { AppSidebar } from "@/features/dashboard/ui/AppSidebar";
import { ClipLoader } from "react-spinners";

export default function Layout({ children }: { children: ReactNode }) {
  // const isAuth = useSelector((state: RootState) => state.userAuth.isAuth);
  const isAuth = true;
  const router = useRouter();
  const [isLogout, setIsLogout] = useState(false);

  const handleLogout = (state: boolean) => {
    setIsLogout(state);
  };

  useEffect(() => {
    if (!isAuth) {
      router.replace("/login");
    }
  }, [isAuth, router]);

  return isAuth ? (
    isLogout ? (
      <div className="flex flex-col h-screen items-center justify-center bg-[#E4E0FF] gap-5">
        <ClipLoader
          color="#F07FE5"
          size={60}
          cssOverride={{
            borderWidth: "6px",
          }}
        />
        <p className="text-h3 font-semibold">Выход из аккаунта...</p>
      </div>
    ) : (
      <SidebarProvider>
        <AppSidebar onClickLogout={handleLogout} />
        <main className="flex-1">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    )
  ) : null;
}
