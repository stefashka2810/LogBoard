import { createSlice } from "@reduxjs/toolkit";
import { LogsWorkSliceState } from "@/features/logWork/model/types";
import { LogEntry, LogLevel } from "@/entities/log/model/types";

const createInitialDateRange = () => {
  const to = new Date();
  const from = new Date(to.getTime() - 24 * 60 * 60 * 1000);

  return {
    from: from.toISOString(),
    to: to.toISOString(),
  };
};

const initialDateRange = createInitialDateRange();

const initialLogsWorkState: LogsWorkSliceState = {
  filters: {
    levels: [],
    message: "",
    from: initialDateRange.from,
    to: initialDateRange.to,
    size: 50,
  },
  logs: [],
  nextCursor: null,
  totalCount: 0,
};

export const logsWorkSlice = createSlice({
  name: "logsWork",
  initialState: initialLogsWorkState,
  reducers: {
    setLogsLevels: (state, action: { payload: LogLevel[] }) => {
      state.filters.levels = action.payload;
    },
    setLogsMessageFilter: (state, action: { payload: string }) => {
      state.filters.message = action.payload;
    },
    setLogsDateRange: (
      state,
      action: { payload: { from: string; to: string } },
    ) => {
      state.filters.from = action.payload.from;
      state.filters.to = action.payload.to;
    },
    setLogsPageSize: (state, action: { payload: number }) => {
      state.filters.size = action.payload;
    },
    setLogsSearchResult: (
      state,
      action: {
        payload: {
          logs: LogEntry[];
          nextCursor?: string;
          totalCount: number;
          append?: boolean;
        };
      },
    ) => {
      state.logs = action.payload.append
        ? [...state.logs, ...action.payload.logs]
        : action.payload.logs;
      state.nextCursor = action.payload.nextCursor ?? null;
      state.totalCount = action.payload.totalCount;
    },
    setClearLogsResult: (state) => {
      state.logs = [];
      state.nextCursor = null;
      state.totalCount = 0;
    },
    resetLogsFilters: (state) => {
      const nextDateRange = createInitialDateRange();
      state.filters.levels = [];
      state.filters.message = "";
      state.filters.from = nextDateRange.from;
      state.filters.to = nextDateRange.to;
      state.filters.size = 50;
    },
  },
});

export const {
  setLogsLevels,
  setLogsMessageFilter,
  setLogsDateRange,
  setLogsPageSize,
  setLogsSearchResult,
  setClearLogsResult,
  resetLogsFilters,
} = logsWorkSlice.actions;
