"use client";

import { RootState } from "@/app/store/types";
import { useDispatch, useSelector } from "react-redux";
import {
  resetLogsFilters,
  setClearLogsResult,
  setLogsDateRange,
  setLogsLevels,
  setLogsMessageFilter,
  setLogsSearchResult,
} from "@/features/logWork/model/logsWorkSlice";
import {
  useGetLogsTimelineQuery,
  useSearchLogsMutation,
} from "@/features/logWork/api/logApi";
import { LogLevel } from "@/entities/log/model/types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LOG_COLORS, LOG_LEVELS, logLevelStyles } from "@/entities/log/lib/constants";
import {
  formatLargeNumber,
  formatShortDate,
  formatTime,
} from "@/entities/log/lib/formatters";
import {
  isoToCalendarDate,
  updateIsoDatePart,
  updateIsoTimePart,
} from "@/entities/log/lib/date";
import { DashboardEmptyState } from "@/features/dashboard/ui/DashboardEmptyState";
import { DashboardHeader } from "@/features/dashboard/ui/DashboardHeader";
import { DashboardFilters } from "@/features/dashboard/ui/DashboardFilters";
import { LogsTableSection } from "@/features/dashboard/ui/LogsTableSection";
import { LogsInsightsSection } from "@/features/dashboard/ui/LogsInsightsSection";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const selectedProject = useSelector(
    (state: RootState) => state.projectsWork.selectedProject,
  );
  const { filters, logs, nextCursor, totalCount } = useSelector(
    (state: RootState) => state.logsWork,
  );
  const [searchLogs, { isLoading, isError, error }] = useSearchLogsMutation();
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [openCalendar, setOpenCalendar] = useState<"from" | "to" | null>(null);
  const calendarPopoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!openCalendar) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (
        calendarPopoverRef.current &&
        !calendarPopoverRef.current.contains(event.target as Node)
      ) {
        setOpenCalendar(null);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [openCalendar]);

  const runLogsSearch = useCallback(
    async (cursor?: string, append?: boolean) => {
      if (!selectedProject) {
        return;
      }

      const response = await searchLogs({
        projectId: selectedProject.id,
        level: filters.levels.length > 0 ? filters.levels : undefined,
        message: filters.message || undefined,
        from: filters.from,
        to: filters.to,
        size: filters.size,
        cursor,
      }).unwrap();

      dispatch(
        setLogsSearchResult({
          logs: response.logs,
          nextCursor: response.nextCursor,
          totalCount: response.totalCount,
          append,
        }),
      );
    },
    [dispatch, filters, searchLogs, selectedProject],
  );

  const timelineArgs = selectedProject
    ? {
        projectId: selectedProject.id,
        level: filters.levels.length > 0 ? filters.levels : undefined,
        message: filters.message || undefined,
        from: filters.from,
        to: filters.to,
      }
    : undefined;

  const {
    data: timeline = [],
    isLoading: isTimelineLoading,
    isFetching: isTimelineFetching,
    isError: isTimelineError,
    error: timelineError,
    refetch: refetchTimeline,
  } = useGetLogsTimelineQuery(timelineArgs!, {
    skip: !timelineArgs,
  });

  useEffect(() => {
    if (!selectedProject) {
      dispatch(setClearLogsResult());
      return;
    }

    const loadLogs = async () => {
      try {
        await runLogsSearch();
      } catch {
        dispatch(setClearLogsResult());
      }
    };

    loadLogs();
  }, [
    dispatch,
    filters.from,
    filters.levels,
    filters.message,
    filters.size,
    filters.to,
    runLogsSearch,
    selectedProject,
  ]);

  const handleLoadMore = async () => {
    if (!selectedProject || !nextCursor) {
      return;
    }

    setIsFetchingMore(true);
    try {
      await runLogsSearch(nextCursor, true);
    } finally {
      setIsFetchingMore(false);
    }
  };

  const handleToggleLevel = (level: LogLevel) => {
    const nextLevels = filters.levels.includes(level)
      ? filters.levels.filter((item) => item !== level)
      : [...filters.levels, level];

    dispatch(setLogsLevels(nextLevels));
  };

  const levelDistribution = useMemo(
    () =>
      LOG_LEVELS.map((level) => ({
        level,
        count: logs.filter((log) => log.level === level).length,
      })),
    [logs],
  );

  const timelineStats = useMemo(
    () =>
      timeline.reduce(
        (accumulator, item) => ({
          totalEvents: accumulator.totalEvents + item.totalCount,
          totalWarnings: accumulator.totalWarnings + item.warnCount,
          totalErrors: accumulator.totalErrors + item.errorCount,
        }),
        { totalEvents: 0, totalWarnings: 0, totalErrors: 0 },
      ),
    [timeline],
  );

  if (!selectedProject) {
    return <DashboardEmptyState />;
  }

  return (
    <div className="h-full overflow-y-auto bg-white px-4 pb-8 pt-4 md:px-6">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-6">
        <DashboardHeader
          project={selectedProject}
          totalCount={totalCount}
          totalWarnings={timelineStats.totalWarnings}
          totalErrors={timelineStats.totalErrors}
          formatLargeNumber={formatLargeNumber}
          colors={LOG_COLORS}
        />

        <DashboardFilters
          message={filters.message}
          from={filters.from}
          to={filters.to}
          levels={filters.levels}
          logLevels={LOG_LEVELS}
          openCalendar={openCalendar}
          calendarPopoverRef={calendarPopoverRef}
          formatShortDate={formatShortDate}
          formatTime={formatTime}
          isoToCalendarDate={isoToCalendarDate}
          updateIsoDatePart={updateIsoDatePart}
          updateIsoTimePart={updateIsoTimePart}
          levelStyles={logLevelStyles}
          onMessageChange={(value) => dispatch(setLogsMessageFilter(value))}
          onDateRangeChange={(range) => dispatch(setLogsDateRange(range))}
          onToggleLevel={handleToggleLevel}
          onOpenCalendar={setOpenCalendar}
          onReset={() => {
            dispatch(resetLogsFilters());
            dispatch(setClearLogsResult());
          }}
          onRefresh={async () => {
            dispatch(setClearLogsResult());
            refetchTimeline();

            try {
              await runLogsSearch();
            } catch {
              dispatch(setClearLogsResult());
            }
          }}
        />

        <section className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
          <LogsTableSection
            logs={logs}
            totalCount={totalCount}
            isLoading={isLoading}
            isError={isError}
            error={error}
            isFetchingMore={isFetchingMore}
            nextCursor={nextCursor}
            onLoadMore={handleLoadMore}
          />

          <LogsInsightsSection
            timeline={timeline}
            isTimelineError={isTimelineError}
            timelineError={timelineError}
            isTimelineLoading={isTimelineLoading}
            isTimelineFetching={isTimelineFetching}
            levelDistribution={levelDistribution}
            logsCount={logs.length}
          />
        </section>
      </div>
    </div>
  );
}
