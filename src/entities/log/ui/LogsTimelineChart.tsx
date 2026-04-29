import { LOG_COLORS } from "@/entities/log/lib/constants";
import { formatDateLabel } from "@/entities/log/lib/formatters";
import { LogTimelinePoint } from "@/entities/log/model/types";

export function LogsTimelineChart({
  data,
  from,
  to,
}: {
  data: LogTimelinePoint[];
  from: string;
  to: string;
}) {
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
  const chartWidth = width - paddingX * 2;
  const maxValue = Math.max(...data.map((item) => item.totalCount), 1);
  const chartHeight = height - paddingTop - paddingBottom;
  const fromTime = new Date(from).getTime();
  const toTime = new Date(to).getTime();
  const totalRange = Math.max(toTime - fromTime, 1);
  const positions = data
    .map((item) => {
      const pointTime = new Date(item.timestamp).getTime();
      const ratio = Math.min(Math.max((pointTime - fromTime) / totalRange, 0), 1);

      return paddingX + ratio * chartWidth;
    })
    .sort((left, right) => left - right);
  const minGap =
    positions.length > 1
      ? positions.slice(1).reduce(
          (currentMin, position, index) =>
            Math.min(currentMin, position - positions[index]),
          Number.POSITIVE_INFINITY,
        )
      : 24;
  const barWidth = Math.max(Math.min(minGap * 0.62, 24), 10);
  const tickCount = 4;
  const ticks = Array.from({ length: tickCount }, (_, index) => {
    const ratio = index / (tickCount - 1);

    return new Date(fromTime + totalRange * ratio).toISOString();
  });

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
          const pointTime = new Date(item.timestamp).getTime();
          const ratio = Math.min(Math.max((pointTime - fromTime) / totalRange, 0), 1);
          const x = paddingX + ratio * chartWidth - barWidth / 2;
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

      <div className="mt-3 grid grid-cols-4 gap-2 text-xs text-[#111111]/55">
        {ticks.map((tick) => (
          <span key={tick} className="text-center first:text-left last:text-right">
            {formatDateLabel(tick)}
          </span>
        ))}
      </div>
    </div>
  );
}
