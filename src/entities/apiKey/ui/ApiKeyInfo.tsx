import { ApiKey } from "@/entities/apiKey/model/types";
import { useDeleteApiKeyMutation } from "@/features/apiKeyWork/api/apiKeyApi";
import { CircleX, KeyRound } from "lucide-react";

export const ApiKeyInfo = (apiKey: ApiKey) => {
  const [deleteApiKey, { isLoading }] = useDeleteApiKeyMutation();

  const handleDelete = async () => {
    try {
      await deleteApiKey(apiKey.id).unwrap();
    } catch (error) {
      console.log("Failed to delete api key:", error);
    }
  };

  const expiresAt = apiKey.expiresAt
    ? new Date(apiKey.expiresAt).toLocaleString("ru-RU")
    : "Без срока";
  const createdAt = new Date(apiKey.createdAt).toLocaleString("ru-RU");

  return (
    <div className="group flex w-full items-start justify-between gap-4 rounded-[1.25rem] border border-[#4C6DFA]/15  px-4 py-4 text-body  transition-transform hover:-translate-y-0.5 sm:px-5">
      <div className="flex min-w-0 items-start gap-3">
        <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#3652D9]/50 text-white">
          <KeyRound className="h-5 w-5" />
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <div>
            <p className="truncate text-base font-semibold text-[#15204B]">
              {apiKey.name}
            </p>
            <p className="mt-1 text-sm text-[#55648F]">Создан: {createdAt}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[#4C6DFA]/10 px-3 py-1 text-xs font-medium text-[#3652D9]">
              Истекает: {expiresAt}
            </span>
            <span className="rounded-full bg-[#A33E94]/10 px-3 py-1 text-xs font-medium text-[#A33E94]">
              Создал: {apiKey.createdBy}
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleDelete}
        disabled={isLoading}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#A33E94]/15 bg-white/80 text-[#A33E94] transition-colors hover:cursor-pointer hover:bg-[#A33E94] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Удалить API ключ"
      >
        <CircleX className="h-5 w-5" />
      </button>
    </div>
  );
};
