import { ApiKey } from "@/entities/apiKey/model/types";
import { useDeleteApiKeyMutation } from "@/features/apiKeyWork/api/apiKeyApi";
import ConfirmDelete from "@/shared/ui/ConfirmDelete";
import { CircleX, KeyRound } from "lucide-react";
import { useEffect, useState } from "react";

export const ApiKeyInfo = (apiKey: ApiKey) => {
  const [deleteApiKey, { isLoading, isError, isSuccess, error, reset }] =
    useDeleteApiKeyMutation();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteApiKey(apiKey.id).unwrap();
    } catch (error) {
      console.log("Failed to delete api key:", error);
    }
  };

  const handleOpenModal = () => {
    reset();
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!isSuccess) return;

    const timeout = window.setTimeout(() => {
      setOpen(false);
      reset();
    }, 2000);

    return () => window.clearTimeout(timeout);
  }, [isSuccess, reset]);

  const expiresAt = apiKey.expiresAt
    ? new Date(apiKey.expiresAt).toLocaleString("ru-RU")
    : "Без срока";
  const createdAt = new Date(apiKey.createdAt).toLocaleString("ru-RU");

  return (
    <div className="group flex w-full items-start justify-between gap-2 rounded-[0.875rem] border border-[#4C6DFA]/15 px-2 py-2 text-body transition-transform hover:-translate-y-0.5 sm:gap-4 sm:rounded-[1.25rem] sm:px-5 sm:py-4">
      <div className="flex min-w-0 items-start gap-2.5 sm:gap-3">
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#3652D9]/50 text-white sm:mt-1 sm:h-11 sm:w-11 sm:rounded-2xl">
          <KeyRound className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
        </div>
        <div className="flex min-w-0 flex-col gap-1.5 sm:gap-2">
          <div>
            <p className="truncate text-sm font-semibold text-[#15204B] sm:text-base">
              {apiKey.name}
            </p>
            <p className="mt-0.5 text-xs text-[#55648F] sm:mt-1 sm:text-sm">
              Создан: {createdAt}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <span className="rounded-full bg-[#4C6DFA]/10 px-2.5 py-1 text-[11px] font-medium text-[#3652D9] sm:px-3 sm:text-xs">
              Истекает: {expiresAt}
            </span>
            <span className="rounded-full bg-[#A33E94]/10 px-2.5 py-1 text-[11px] font-medium text-[#A33E94] sm:px-3 sm:text-xs">
              Создал: {apiKey.createdBy}
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleOpenModal}
        disabled={isLoading}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#A33E94]/15 bg-white/80 text-[#A33E94] transition-colors hover:cursor-pointer hover:bg-[#A33E94] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:h-10 sm:w-10"
        aria-label="Удалить API ключ"
      >
        <CircleX className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
      </button>

      <ConfirmDelete
        open={open}
        title={`Вы уверены, что хотите удалить API-ключ "${apiKey.name}"?`}
        onConfirm={handleDelete}
        onClose={handleCloseModal}
        error={error}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        successMessage="API-ключ успешно удален!"
        modalTitle="Удаление API-ключа"
      />
    </div>
  );
};
