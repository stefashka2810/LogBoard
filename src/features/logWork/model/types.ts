import { LogEntry, LogLevel } from "@/entities/log/model/types";

export interface LogsFilterState {
  levels: LogLevel[];
  message: string;
  from: string;
  to: string;
  size: number;
}

export interface LogsWorkSliceState {
  filters: LogsFilterState;
  logs: LogEntry[];
  nextCursor: string | null;
  totalCount: number;
}
