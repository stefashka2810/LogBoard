import { LogEntry, LogLevel } from "@/entities/log/model/types";
import { Button } from "@/shared/ui/Button";
import { AlertTriangle } from "lucide-react";
import { formatDateLabel, formatLargeNumber, getErrorMessage } from "@/entities/log/lib/formatters";
import { LogLevelBadge } from "@/entities/log/ui/LogLevelBadge";

export function LogsTableSection({
  logs,
  totalCount,
  isLoading,
  isError,
  error,
  isFetchingMore,
  nextCursor,
  onLoadMore,
}: {
  logs: LogEntry[];
  totalCount: number;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  isFetchingMore: boolean;
  nextCursor: string | null;
  onLoadMore: () => void | Promise<void>;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#E9E9E9] bg-[#FEEB86]/20">
      <div className="flex items-center justify-between border-b border-[#E9E9E9] px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold text-[#111111]">Таблица логов</h2>
          <p className="mt-1 text-sm text-[#111111]/55">
            Загружено {formatLargeNumber(logs.length)} из{" "}
            {formatLargeNumber(totalCount)}
          </p>
        </div>
      </div>

      {isError ? (
        <div className="flex min-h-96 flex-col items-center justify-center px-6 text-center">
          <AlertTriangle className="h-10 w-10 text-[#F07FA8]" />
          <h3 className="mt-4 text-lg font-semibold text-[#111111]">
            Не удалось загрузить логи
          </h3>
          <p className="mt-2 max-w-md text-sm leading-6 text-[#111111]/60">
            {getErrorMessage(error, "Повторите запрос позже.")}
          </p>
        </div>
      ) : isLoading ? (
        <div className="grid gap-3 px-6 py-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-16 rounded-2xl border border-[#E9E9E9] bg-white"
            />
          ))}
        </div>
      ) : logs.length === 0 ? (
        <div className="flex min-h-96 items-center justify-center px-6 text-center text-sm text-[#111111]/60">
          Логи не найдены.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-[120px_minmax(220px,1fr)_180px] gap-4 border-b border-[#E9E9E9] px-6 py-4 text-xs uppercase tracking-[0.16em] text-[#111111]/55">
            <span>Уровень</span>
            <span>Сообщение</span>
            <span>Время</span>
          </div>
          <div className="max-h-[780px] overflow-y-auto">
            {logs.map((log: LogEntry, index) => (
              <div
                key={`${log.timestamp}-${index}`}
                className="grid grid-cols-[120px_minmax(220px,1fr)_180px] gap-4 border-b border-[#E9E9E9] px-6 py-4"
              >
                <div>
                  <LogLevelBadge level={log.level as LogLevel} />
                </div>
                <div className="text-sm leading-6 text-[#111111]">
                  {log.message}
                </div>
                <div className="text-sm text-[#111111]/55">
                  {formatDateLabel(log.timestamp)}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {logs.length > 0 && (
        <div className="border-t border-[#E9E9E9] px-6 py-5">
          <Button
            type="button"
            onClick={onLoadMore}
            disabled={!nextCursor || isFetchingMore}
            className="rounded-full border-[#FEEB86] bg-[#FEEB86] px-5 py-3 text-[#111111] hover:scale-100"
          >
            {isFetchingMore
              ? "Загружаю..."
              : nextCursor
                ? "Показать еще"
                : "Больше записей нет"}
          </Button>
        </div>
      )}
    </div>
  );
}
