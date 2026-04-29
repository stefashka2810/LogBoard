import { LogEntry, LogLevel, LogTimelinePoint } from "@/entities/log/model/types";
import {
  LogSearchRequest,
  LogSearchResponse,
  LogTimelineRequest,
  LogTimelineResponse,
} from "@/features/logWork/api/types";

const MOCK_LOG_BLUEPRINT: Array<{
  level: LogLevel;
  message: string;
  minutesAgo: number;
}> = [
  { level: "INFO", message: "User signed in successfully", minutesAgo: 690 },
  { level: "WARN", message: "Slow response from payment service", minutesAgo: 675 },
  { level: "ERROR", message: "Failed to load dashboard widgets", minutesAgo: 650 },
  { level: "DEBUG", message: "Refreshing cached projects list", minutesAgo: 625 },
  { level: "TRACE", message: "Sidebar render cycle completed", minutesAgo: 615 },
  { level: "INFO", message: "Project members loaded", minutesAgo: 595 },
  { level: "WARN", message: "API key expires in 3 days", minutesAgo: 540 },
  { level: "ERROR", message: "Kafka consumer connection dropped", minutesAgo: 515 },
  { level: "INFO", message: "Retry to backend completed", minutesAgo: 490 },
  { level: "DEBUG", message: "Logs search query executed", minutesAgo: 445 },
  { level: "INFO", message: "Timeline data prepared", minutesAgo: 420 },
  { level: "ERROR", message: "Unauthorized request detected", minutesAgo: 390 },
];

function createMockLogs(): LogEntry[] {
  const now = Date.now();

  return MOCK_LOG_BLUEPRINT.map((item) => ({
    level: item.level,
    message: item.message,
    timestamp: new Date(now - item.minutesAgo * 60 * 1000).toISOString(),
  })).sort(
    (left, right) =>
      new Date(right.timestamp).getTime() - new Date(left.timestamp).getTime(),
  );
}

function filterLogs({
  level,
  message,
  from,
  to,
}: Pick<LogSearchRequest, "level" | "message" | "from" | "to">) {
  const mockLogs = createMockLogs();
  const fromDate = new Date(from).getTime();
  const toDate = new Date(to).getTime();
  const normalizedMessage = message?.trim().toLowerCase();

  return mockLogs.filter((log) => {
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
