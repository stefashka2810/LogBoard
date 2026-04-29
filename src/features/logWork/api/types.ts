import { LogEntry, LogLevel, LogTimelinePoint } from "@/entities/log/model/types";

export interface LogSearchRequest {
  projectId: string;
  level?: LogLevel[];
  message?: string;
  from: string;
  to: string;
  size?: number;
  cursor?: string;
}

export interface LogTimelineRequest {
  projectId: string;
  level?: LogLevel[];
  message?: string;
  from: string;
  to: string;
}

export interface LogSearchResponse {
  logs: LogEntry[];
  nextCursor?: string;
  totalCount: number;
}

export type LogTimelineResponse = LogTimelinePoint[];
