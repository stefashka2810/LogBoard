import { LoginCard } from "@/features/auth/components/LoginCard";
import { RegisterCard } from "@/features/auth/components/RegisterCard";

export default function RegisterPage() {
  return (
    <>
      <div className={"flex flex-row w-full h-screen justify-center"}>
        <div
          className={"flex flex-col h-full w-md justify-center items-center"}
        >
          <RegisterCard></RegisterCard>
        </div>
      </div>
    </>
  );
}
