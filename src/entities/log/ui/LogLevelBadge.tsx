import { LogLevel } from "@/entities/log/model/types";
import { cn } from "@/shared/lib/utils";
import { logLevelStyles } from "@/entities/log/lib/constants";

export function LogLevelBadge({ level }: { level: LogLevel }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold tracking-[0.12em]",
        logLevelStyles[level],
      )}
    >
      {level}
    </span>
  );
}
