import { useGetApiKeysQuery } from "@/features/apiKeyWork/api/apiKeyApi";
import { ApiKeyInfo } from "@/entities/apiKey/ui/ApiKeyInfo";

export const ApiKeyList = ({ projectId }: { projectId: string }) => {
  const { data, isLoading, isError, error } = useGetApiKeysQuery(projectId);

  if (isLoading) {
    return (
      <div className="grid w-full gap-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-24 animate-pulse rounded-[1.25rem] border border-[#4C6DFA]/15 bg-[linear-gradient(135deg,rgba(76,109,250,0.08),rgba(153,238,255,0.12))]"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-56 w-full flex-col items-center justify-center rounded-[1.5rem] border border-[#A33E94]/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.75),rgba(163,62,148,0.06))] px-6 py-10 text-center">
        <div className="rounded-full bg-[#A33E94]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#A33E94]">
          Ошибка
        </div>
        <h3 className="mt-4 text-lg font-semibold text-[#15204B]">
          Не удалось загрузить API-ключи
        </h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-[#4B5B8F]">
          {typeof error === "string"
            ? error
            : "Попробуйте обновить страницу или повторить запрос позже."}
        </p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex min-h-72 w-full flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-[#4C6DFA]/30  px-6 py-10 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#3652D9]/50 ">
          <svg
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-[#15204B]">
          Нет активных ключей
        </h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-[#4B5B8F]">
          Создайте новый API-ключ, чтобы подключить backend проекта к загрузке
          логов в LogBoard.
        </p>
      </div>
    );
  }

  return (
    <div className="grid w-full gap-3">
      {data.map((apiKey) => (
        <ApiKeyInfo {...apiKey} key={apiKey.id}></ApiKeyInfo>
      ))}
    </div>
  );
};
