export type LogLevel = "TRACE" | "DEBUG" | "INFO" | "WARN" | "ERROR";

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
}

export interface LogTimelinePoint {
  timestamp: string;
  totalCount: number;
  errorCount: number;
  warnCount: number;
}
