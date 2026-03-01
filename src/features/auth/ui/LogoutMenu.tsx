import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { useDispatch } from "react-redux";
import { setLogout } from "@/features/auth/model/authSlice";
import { useRouter } from "next/navigation";

const LogoutMenu = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = () => {
    dispatch(setLogout());
    router.replace("/login");
  };
  return (
    <>
      <DropdownMenuContent
        side="right"
        align="end"
        className="w-56 rounded-lg bg-popover p-1 shadow-md"
      >
        <DropdownMenuItem
          onClick={handleLogout}
          className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
        >
          Выйти
        </DropdownMenuItem>
        <DropdownMenuItem className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-accent hover:text-destructive">
          Удалить аккаунт
        </DropdownMenuItem>
      </DropdownMenuContent>
    </>
  );
};

export default LogoutMenu;
