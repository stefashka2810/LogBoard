import { User2 } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/types";

const UserInfo = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <>
      <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-accent-foreground">
        <User2 className="size-4" />
      </div>
      <div className="flex flex-col gap-0.5 leading-none">
        <span className="font-semibold">{user?.username || "username"} </span>
        <span className="text-xs text-muted-foreground">user@example.com</span>
      </div>
    </>
  );
};

export default UserInfo;
