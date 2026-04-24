"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/types";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: ReactNode }) {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.replace("/login");
    }
  }, [isAuth, router]);

  return <>{children}</>;
}
