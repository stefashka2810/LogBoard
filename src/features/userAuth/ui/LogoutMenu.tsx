import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { useDispatch } from "react-redux";
import { setLogout } from "@/features/userAuth/model/authSlice";
import { LogOut, Trash } from "lucide-react";
import { useLogoutUserMutation } from "@/features/userAuth/api/authApi";
import { baseApi } from "@/shared/api/baseApi";
import { persistor } from "@/app/store/store";

const LogoutMenu = () => {
  const dispatch = useDispatch();
  const [logout] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      console.log("[LOGOUT] Request failed, clearing local session anyway:", error);
    } finally {
      persistor.pause();
      dispatch(setLogout());
      dispatch(baseApi.util.resetApiState());
      await persistor.flush();
      await persistor.purge();
      persistor.persist();
    }
  };

  return (
    <>
      <DropdownMenuContent
        side="right"
        align="end"
        className="ml-1 w-56 rounded-lg bg-[#E4E0FF] p-1 shadow-md border-none outline-none"
      >
        <DropdownMenuItem
          onClick={handleLogout}
          className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm outline-none border-none focus:outline-none focus:ring-0 data-highlighted:bg-[#E4E0FF]/80 data-highlighted:outline-none"
        >
          <span>
            <LogOut size="20" />
          </span>
          Выйти из аккаунта
        </DropdownMenuItem>
        <DropdownMenuItem className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive outline-none border-none focus:outline-none focus:ring-0 data-highlighted:bg-[#E4E0FF]/80 data-highlighted:outline-none">
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
