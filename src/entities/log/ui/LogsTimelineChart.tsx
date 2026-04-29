import { LOG_COLORS } from "@/entities/log/lib/constants";
import { formatDateLabel } from "@/entities/log/lib/formatters";
import { LogTimelinePoint } from "@/entities/log/model/types";

export function LogsTimelineChart({ data }: { data: LogTimelinePoint[] }) {
  if (data.length === 0) {
    return (
      <div className="flex min-h-72 items-center justify-center rounded-2xl border border-dashed border-[#E9E9E9] bg-white px-6 text-center text-sm text-[#111111]/60">
        За выбранный период нет событий.
      </div>
    );
  }

  const width = 640;
  const height = 240;
  const paddingX = 20;
  const paddingTop = 16;
  const paddingBottom = 28;
  const maxValue = Math.max(...data.map((item) => item.totalCount), 1);
  const chartHeight = height - paddingTop - paddingBottom;
  const stepX =
    data.length === 1 ? 0 : (width - paddingX * 2) / (data.length - 1);
  const barWidth = Math.max(Math.min(stepX * 0.58, 26), 10);

  return (
    <div className="rounded-2xl border border-[#E9E9E9] bg-white p-4">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-72 w-full">
        <line
          x1={paddingX}
          x2={width - paddingX}
          y1={height - paddingBottom}
          y2={height - paddingBottom}
          stroke={LOG_COLORS.line}
        />
        {data.map((item, index) => {
          const x = paddingX + index * stepX - barWidth / 2;
          const totalHeight = (item.totalCount / maxValue) * chartHeight;
          const warnHeight = (item.warnCount / maxValue) * chartHeight;
          const errorHeight = (item.errorCount / maxValue) * chartHeight;
          const y = height - paddingBottom - totalHeight;
          const warnY = height - paddingBottom - warnHeight;
          const errorY = height - paddingBottom - errorHeight;

          return (
            <g key={`${item.timestamp}-${index}`}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={Math.max(totalHeight, 2)}
                rx="8"
                fill={LOG_COLORS.purple}
                opacity="0.22"
              />
              <rect
                x={x + barWidth * 0.18}
                y={warnY}
                width={barWidth * 0.28}
                height={Math.max(warnHeight, 2)}
                rx="6"
                fill={LOG_COLORS.yellow}
              />
              <rect
                x={x + barWidth * 0.54}
                y={errorY}
                width={barWidth * 0.28}
                height={Math.max(errorHeight, 2)}
                rx="6"
                fill={LOG_COLORS.pink}
              />
            </g>
          );
        })}
      </svg>

      <div className="mt-3 flex items-center justify-between text-xs text-[#111111]/55">
        <span>{formatDateLabel(data[0].timestamp)}</span>
        <span>{formatDateLabel(data[data.length - 1].timestamp)}</span>
      </div>
    </div>
  );
}
