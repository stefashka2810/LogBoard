"use client";

import { DateValue } from "@internationalized/date";
import { Calendar } from "@/shared/ui/Calendar";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { CalendarDays, RefreshCw } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { LogLevel } from "@/entities/log/model/types";

interface DashboardFiltersProps {
  message: string;
  from: string;
  to: string;
  levels: LogLevel[];
  logLevels: LogLevel[];
  openCalendar: "from" | "to" | null;
  calendarPopoverRef: React.RefObject<HTMLDivElement | null>;
  formatShortDate: (value: string) => string;
  formatTime: (value: string) => string;
  isoToCalendarDate: (value: string) => DateValue;
  updateIsoDatePart: (iso: string, value: DateValue) => string;
  updateIsoTimePart: (iso: string, value: string) => string;
  levelStyles: Record<LogLevel, string>;
  onMessageChange: (value: string) => void;
  onDateRangeChange: (range: { from: string; to: string }) => void;
  onToggleLevel: (level: LogLevel) => void;
  onOpenCalendar: (value: "from" | "to" | null) => void;
  onReset: () => void;
  onRefresh: () => void | Promise<void>;
}

export function DashboardFilters(props: DashboardFiltersProps) {
  const {
    message,
    from,
    to,
    levels,
    logLevels,
    openCalendar,
    calendarPopoverRef,
    formatShortDate,
    formatTime,
    isoToCalendarDate,
    updateIsoDatePart,
    updateIsoTimePart,
    levelStyles,
    onMessageChange,
    onDateRangeChange,
    onToggleLevel,
    onOpenCalendar,
    onReset,
    onRefresh,
  } = props;

  return (
    <section className="rounded-3xl border border-[#E9E9E9] bg-[#8E7FF0]/20 p-6">
      <div className="grid gap-4">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.16em] text-[#111111]/55">
            Поиск по сообщению
          </span>
          <Input
            value={message}
            onChange={(event) => onMessageChange(event.target.value)}
            placeholder="timeout, exception, kafka"
            className="h-12 rounded-2xl border-[#E9E9E9] bg-white text-[#111111] placeholder:text-[#111111]/35"
          />
        </label>

        <div className="grid gap-4 lg:grid-cols-2">
          <label className="space-y-2">
            <span className="text-xs uppercase tracking-[0.16em] text-[#111111]/55">
              Период от
            </span>
            <div
              className="relative"
              ref={openCalendar === "from" ? calendarPopoverRef : null}
            >
              <button
                type="button"
                onClick={() =>
                  onOpenCalendar(openCalendar === "from" ? null : "from")
                }
                className="flex h-12 w-full items-center justify-between rounded-2xl border border-[#E9E9E9] bg-white px-4 text-left text-[#111111]"
              >
                <span>{formatShortDate(from)}</span>
                <CalendarDays className="h-4 w-4 text-[#8E7FF0]" />
              </button>
              {openCalendar === "from" && (
                <div className="absolute left-0 top-[calc(100%+0.5rem)] z-50 rounded-2xl border border-[#E9E9E9] bg-white p-3">
                  <Calendar
                    aria-label="Дата начала периода"
                    value={isoToCalendarDate(from)}
                    onChange={(value) => {
                      if (!value) return;
                      onDateRangeChange({
                        from: updateIsoDatePart(from, value),
                        to,
                      });
                      onOpenCalendar(null);
                    }}
                  />
                </div>
              )}
            </div>
          </label>

          <label className="space-y-2">
            <span className="text-xs uppercase tracking-[0.16em] text-[#111111]/55">
              Время от
            </span>
            <Input
              type="time"
              value={formatTime(from)}
              onChange={(event) =>
                onDateRangeChange({
                  from: updateIsoTimePart(from, event.target.value),
                  to,
                })
              }
              className="h-12 rounded-2xl border-[#E9E9E9] bg-white text-[#111111]"
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs uppercase tracking-[0.16em] text-[#111111]/55">
              Период до
            </span>
            <div
              className="relative"
              ref={openCalendar === "to" ? calendarPopoverRef : null}
            >
              <button
                type="button"
                onClick={() => onOpenCalendar(openCalendar === "to" ? null : "to")}
                className="flex h-12 w-full items-center justify-between rounded-2xl border border-[#E9E9E9] bg-white px-4 text-left text-[#111111]"
              >
                <span>{formatShortDate(to)}</span>
                <CalendarDays className="h-4 w-4 text-[#F07FA8]" />
              </button>
              {openCalendar === "to" && (
                <div className="absolute left-0 top-[calc(100%+0.5rem)] z-50 rounded-2xl border border-[#E9E9E9] bg-white p-3">
                  <Calendar
                    aria-label="Дата конца периода"
                    value={isoToCalendarDate(to)}
                    onChange={(value) => {
                      if (!value) return;
                      onDateRangeChange({
                        from,
                        to: updateIsoDatePart(to, value),
                      });
                      onOpenCalendar(null);
                    }}
                  />
                </div>
              )}
            </div>
          </label>

          <label className="space-y-2">
            <span className="text-xs uppercase tracking-[0.16em] text-[#111111]/55">
              Время до
            </span>
            <Input
              type="time"
              value={formatTime(to)}
              onChange={(event) =>
                onDateRangeChange({
                  from,
                  to: updateIsoTimePart(to, event.target.value),
                })
              }
              className="h-12 rounded-2xl border-[#E9E9E9] bg-white text-[#111111]"
            />
          </label>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {logLevels.map((level) => {
          const isActive = levels.includes(level);

          return (
            <button
              key={level}
              type="button"
              onClick={() => onToggleLevel(level)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-medium tracking-[0.12em]",
                isActive
                  ? levelStyles[level]
                  : "border-[#E9E9E9] bg-white text-[#111111]/65 hover:border-[#8E7FF0]",
              )}
            >
              {level}
            </button>
          );
        })}

        <Button
          type="button"
          onClick={onReset}
          className="rounded-full border-[#E9E9E9] bg-white px-4 py-2 text-xs text-[#111111] hover:scale-100"
        >
          Сбросить
        </Button>

        <Button
          type="button"
          onClick={onRefresh}
          className="rounded-full border-[#8E7FF0] bg-[#8E7FF0] px-4 py-2 text-xs text-white hover:scale-100"
        >
          <RefreshCw className="mr-2 inline h-3.5 w-3.5" />
          Обновить
        </Button>
      </div>
    </section>
  );
}
