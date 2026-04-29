import { LogEntry, LogLevel, LogTimelinePoint } from "@/entities/log/model/types";
import {
  LogSearchRequest,
  LogSearchResponse,
  LogTimelineRequest,
  LogTimelineResponse,
} from "@/features/logWork/api/types";

const MOCK_LOGS: LogEntry[] = [
  {
    level: "INFO",
    message: "User signed in successfully",
    timestamp: "2026-05-17T08:10:00.000Z",
  },
  {
    level: "WARN",
    message: "Slow response from payment service",
    timestamp: "2026-05-17T08:20:00.000Z",
  },
  {
    level: "ERROR",
    message: "Failed to load dashboard widgets",
    timestamp: "2026-05-17T08:35:00.000Z",
  },
  {
    level: "DEBUG",
    message: "Refreshing cached projects list",
    timestamp: "2026-05-17T09:00:00.000Z",
  },
  {
    level: "TRACE",
    message: "Sidebar render cycle completed",
    timestamp: "2026-05-17T09:05:00.000Z",
  },
  {
    level: "INFO",
    message: "Project members loaded",
    timestamp: "2026-05-17T09:20:00.000Z",
  },
  {
    level: "WARN",
    message: "API key expires in 3 days",
    timestamp: "2026-05-17T10:00:00.000Z",
  },
  {
    level: "ERROR",
    message: "Kafka consumer connection dropped",
    timestamp: "2026-05-17T10:15:00.000Z",
  },
  {
    level: "INFO",
    message: "Retry to backend completed",
    timestamp: "2026-05-17T10:40:00.000Z",
  },
  {
    level: "DEBUG",
    message: "Logs search query executed",
    timestamp: "2026-05-17T11:10:00.000Z",
  },
  {
    level: "INFO",
    message: "Timeline data prepared",
    timestamp: "2026-05-17T11:30:00.000Z",
  },
  {
    level: "ERROR",
    message: "Unauthorized request detected",
    timestamp: "2026-05-17T11:50:00.000Z",
  },
];

function filterLogs({
  level,
  message,
  from,
  to,
}: Pick<LogSearchRequest, "level" | "message" | "from" | "to">) {
  const fromDate = new Date(from).getTime();
  const toDate = new Date(to).getTime();
  const normalizedMessage = message?.trim().toLowerCase();

  return MOCK_LOGS.filter((log) => {
    const logTime = new Date(log.timestamp).getTime();
    const inRange = logTime >= fromDate && logTime <= toDate;
    const levelMatch = !level || level.length === 0 || level.includes(log.level);
    const messageMatch =
      !normalizedMessage ||
      log.message.toLowerCase().includes(normalizedMessage);

    return inRange && levelMatch && messageMatch;
  }).sort(
    (left, right) =>
      new Date(right.timestamp).getTime() - new Date(left.timestamp).getTime(),
  );
}

export function searchMockLogs(request: LogSearchRequest): LogSearchResponse {
  const filtered = filterLogs(request);
  const startIndex = request.cursor
    ? filtered.findIndex((log) => log.timestamp === request.cursor) + 1
    : 0;
  const size = request.size ?? 50;
  const page = filtered.slice(startIndex, startIndex + size);
  const nextItem = filtered[startIndex + size];

  return {
    logs: page,
    nextCursor: nextItem?.timestamp,
    totalCount: filtered.length,
  };
}

export function getMockLogsTimeline(
  request: LogTimelineRequest,
): LogTimelineResponse {
  const filtered = filterLogs(request);
  const buckets = new Map<string, LogTimelinePoint>();

  filtered.forEach((log) => {
    const date = new Date(log.timestamp);
    date.setMinutes(0, 0, 0);
    const bucketKey = date.toISOString();

    if (!buckets.has(bucketKey)) {
      buckets.set(bucketKey, {
        timestamp: bucketKey,
        totalCount: 0,
        errorCount: 0,
        warnCount: 0,
      });
    }

    const bucket = buckets.get(bucketKey)!;
    bucket.totalCount += 1;

    if (log.level === "ERROR") {
      bucket.errorCount += 1;
    }

    if (log.level === "WARN") {
      bucket.warnCount += 1;
    }
  });

  return Array.from(buckets.values()).sort(
    (left, right) =>
      new Date(left.timestamp).getTime() - new Date(right.timestamp).getTime(),
  );
}

export const logsMockModeEnabled =
  process.env.NEXT_PUBLIC_USE_LOGS_MOCK === "true";

export const mockLogLevels: LogLevel[] = ["TRACE", "DEBUG", "INFO", "WARN", "ERROR"];
