"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/app/store/types";

const StartPage = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const route = useRouter();

  useEffect(() => {
    if (isAuth) {
      route.push("/dashboard");
    } else {
      route.push("/landing");
    }
  }, [isAuth, route]);

  return <></>;
};

export default StartPage;
