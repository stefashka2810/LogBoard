import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { useDispatch } from "react-redux";
import { setLogout } from "@/features/userAuth/model/authSlice";
import { useRouter } from "next/navigation";
import { LogOut, Trash } from "lucide-react";

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
        className="w-56 rounded-lg ml-1 p-1 bg-[#E4E0FF] shadow-md"
      >
        <DropdownMenuItem
          onClick={handleLogout}
          className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm "
        >
          <span>
            <LogOut size="20" />
          </span>
          Выйти из аккаунта
        </DropdownMenuItem>
        <DropdownMenuItem className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive">
          <span>
            <Trash size="20" />
          </span>
          Удалить аккаунт
        </DropdownMenuItem>
      </DropdownMenuContent>
    </>
  );
};

export default LogoutMenu;
