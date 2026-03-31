import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { useDispatch } from "react-redux";
import { setLogout } from "@/features/userAuth/model/authSlice";
import { LogOut, Trash } from "lucide-react";

const LogoutMenu = ({
  onClickLogout,
}: {
  onClickLogout: (state: boolean) => void;
}) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    onClickLogout(true);

    setTimeout(() => {
      onClickLogout(false);
      dispatch(setLogout());
    }, 2000);
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
