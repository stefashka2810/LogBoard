import { LOG_COLORS } from "@/entities/log/lib/constants";
import {
  formatLargeNumber,
  getErrorMessage,
} from "@/entities/log/lib/formatters";
import { LogsTimelineChart } from "@/entities/log/ui/LogsTimelineChart";
import { LogLevel, LogTimelinePoint } from "@/entities/log/model/types";

export function LogsInsightsSection({
  timeline,
  from,
  to,
  isTimelineError,
  timelineError,
  isTimelineLoading,
  isTimelineFetching,
  levelDistribution,
  logsCount,
}: {
  timeline: LogTimelinePoint[];
  from: string;
  to: string;
  isTimelineError: boolean;
  timelineError: unknown;
  isTimelineLoading: boolean;
  isTimelineFetching: boolean;
  levelDistribution: { level: LogLevel; count: number }[];
  logsCount: number;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="overflow-hidden rounded-[32px]  bg-[#F07FA8]/20 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#111111]">
              Таймлайн активности
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-[#111111]/58">
              Три отдельные линии показывают общий поток, WARN и ERROR по
              времени. Так динамика и расхождения между уровнями читаются
              заметно быстрее.
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-3 text-xs text-[#111111]/60">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#8E7FF0]" />
            <span>Общий поток</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-4 rounded-full bg-[#FEEB86]" />
            <span>WARN</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-4 rounded-full bg-[#F07FA8]" />
            <span>ERROR</span>
          </div>
        </div>

        <div className="mt-4">
          {isTimelineError ? (
            <div className="rounded-[28px] border border-[#F07FA8] bg-white/90 px-5 py-4 text-sm text-[#111111] ">
              {getErrorMessage(timelineError, "Не удалось построить таймлайн.")}
            </div>
          ) : isTimelineLoading || isTimelineFetching ? (
            <div className="h-80 rounded-[28px] border border-white/70 bg-white/75" />
          ) : (
            <LogsTimelineChart data={timeline} from={from} to={to} />
          )}
        </div>
      </div>

      <div className="rounded-3xl border border-[#E9E9E9] bg-[#F07FA8]/20 p-6">
        <h2 className="text-lg font-semibold text-[#111111]">
          Распределение уровней
        </h2>
        <div className="mt-4 space-y-4">
          {levelDistribution.map(({ level, count }) => {
            const width =
              logsCount > 0 && count > 0
                ? Math.max((count / logsCount) * 100, 4)
                : 0;

            return (
              <div key={level}>
                <div className="mb-2 flex items-center justify-between text-sm text-[#111111]">
                  <span>{level}</span>
                  <span>{formatLargeNumber(count)}</span>
                </div>
                <div className="h-3 rounded-full border border-[#E9E9E9] bg-white">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${width}%`,
                      backgroundColor:
                        level === "ERROR"
                          ? LOG_COLORS.pink
                          : level === "WARN"
                            ? LOG_COLORS.yellow
                            : LOG_COLORS.purple,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
