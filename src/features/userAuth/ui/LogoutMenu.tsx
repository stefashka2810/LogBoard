import { useDispatch } from "react-redux";
import { setLogout } from "@/features/userAuth/model/authSlice";
import { LogOut } from "lucide-react";
import { useLogoutUserMutation } from "@/features/userAuth/api/authApi";
import { baseApi } from "@/shared/api/baseApi";
import { persistor } from "@/app/store/store";
import ConfirmDelete from "@/shared/ui/ConfirmDelete";
import { useState } from "react";
import UserInfo from "@/entities/user/ui/UserInfo";

const LogoutMenu = () => {
  const dispatch = useDispatch();
  const [logout, { isLoading, isError, error, reset }] =
    useLogoutUserMutation();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      console.log(
        "[LOGOUT] Request failed, clearing local session anyway:",
        error,
      );
    } finally {
      persistor.pause();
      dispatch(setLogout());
      dispatch(baseApi.util.resetApiState());
      await persistor.flush();
      await persistor.purge();
      persistor.persist();
    }
  };

  const handleOpenModal = () => {
    reset();
    setOpen(true);
  };

  const handleCloseModal = () => {
    if (isLoading) return;

    setOpen(false);
    reset();
  };

  return (
    <>
      <div className="flex min-h-12 items-center gap-2 rounded-lg bg-[#E4E0FF] px-2 py-2 text-black">
        <UserInfo />
        <button
          type="button"
          onClick={handleOpenModal}
          className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-full hover:text-[#15204B] transition-colors hover:cursor-pointer text-[#15204B]/70  focus:outline-none focus:ring-0"
          aria-label="Выйти из аккаунта"
        >
          <LogOut size={20} />
        </button>
      </div>

      <ConfirmDelete
        open={open}
        title="Вы уверены, что хотите выйти из аккаунта?"
        onConfirm={handleLogout}
        onClose={handleCloseModal}
        error={error}
        isLoading={isLoading}
        isError={isError}
        isSuccess={false}
        successMessage=""
        confirmLabel="Да, выйти"
        modalTitle="Выход из аккаунта"
      />
    </>
  );
};

export default LogoutMenu;
