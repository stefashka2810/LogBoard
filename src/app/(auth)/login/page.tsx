import { LoginCard } from "@/features/auth/components/LoginCard";

export default function LoginPage() {
  return (
    <>
      <div className={"flex flex-row w-full h-screen justify-center"}>
        <div
          className={"flex flex-col h-full w-md justify-center items-center"}
        >
          <LoginCard></LoginCard>
        </div>
      </div>
    </>
  );
}
