import {
  logsWorkSlice,
  resetLogsFilters,
  setClearLogsResult,
  setLogsDateRange,
  setLogsLevels,
  setLogsMessageFilter,
  setLogsPageSize,
  setLogsSearchResult,
} from "@/features/logWork/model/logsWorkSlice";
import { LogEntry } from "@/entities/log/model/types";

const firstLog: LogEntry = {
  level: "ERROR",
  message: "Something failed",
  timestamp: "2026-04-28T12:00:00.000Z",
};

const secondLog: LogEntry = {
  level: "WARN",
  message: "Something suspicious",
  timestamp: "2026-04-28T12:01:00.000Z",
};

describe("logsWorkSlice", () => {
  it("updates filters", () => {
    let state = logsWorkSlice.reducer(undefined, setLogsLevels(["ERROR", "WARN"]));
    state = logsWorkSlice.reducer(state, setLogsMessageFilter("timeout"));
    state = logsWorkSlice.reducer(
      state,
      setLogsDateRange({
        from: "2026-04-27T00:00:00.000Z",
        to: "2026-04-28T00:00:00.000Z",
      }),
    );
    state = logsWorkSlice.reducer(state, setLogsPageSize(100));

    expect(state.filters.levels).toEqual(["ERROR", "WARN"]);
    expect(state.filters.message).toBe("timeout");
    expect(state.filters.from).toBe("2026-04-27T00:00:00.000Z");
    expect(state.filters.to).toBe("2026-04-28T00:00:00.000Z");
    expect(state.filters.size).toBe(100);
  });

  it("stores search results and appends next page", () => {
    let state = logsWorkSlice.reducer(
      undefined,
      setLogsSearchResult({
        logs: [firstLog],
        nextCursor: firstLog.timestamp,
        totalCount: 2,
      }),
    );

    state = logsWorkSlice.reducer(
      state,
      setLogsSearchResult({
        logs: [secondLog],
        nextCursor: undefined,
        totalCount: 2,
        append: true,
      }),
    );

    expect(state.logs).toEqual([firstLog, secondLog]);
    expect(state.totalCount).toBe(2);
    expect(state.nextCursor).toBeNull();
  });

  it("clears results", () => {
    const withData = logsWorkSlice.reducer(
      undefined,
      setLogsSearchResult({
        logs: [firstLog],
        nextCursor: firstLog.timestamp,
        totalCount: 1,
      }),
    );

    const state = logsWorkSlice.reducer(withData, setClearLogsResult());

    expect(state.logs).toEqual([]);
    expect(state.nextCursor).toBeNull();
    expect(state.totalCount).toBe(0);
  });

  it("resets filters to defaults", () => {
    let state = logsWorkSlice.reducer(undefined, setLogsLevels(["ERROR"]));
    state = logsWorkSlice.reducer(state, setLogsMessageFilter("panic"));
    state = logsWorkSlice.reducer(state, setLogsPageSize(10));

    state = logsWorkSlice.reducer(state, resetLogsFilters());

    expect(state.filters.levels).toEqual([]);
    expect(state.filters.message).toBe("");
    expect(state.filters.size).toBe(50);
    expect(new Date(state.filters.from).getTime()).toBeLessThanOrEqual(
      new Date(state.filters.to).getTime(),
    );
  });
});
