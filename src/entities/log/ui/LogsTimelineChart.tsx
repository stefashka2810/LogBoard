import { LOG_COLORS } from "@/entities/log/lib/constants";
import {
  formatDateLabel,
  formatLargeNumber,
  formatTime,
} from "@/entities/log/lib/formatters";
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
      <div className="flex min-h-72 items-center justify-center rounded-[28px] border border-dashed border-white/70 bg-white/85 px-6 text-center text-sm text-[#111111]/60 backdrop-blur">
        За выбранный период нет событий.
      </div>
    );
  }

  const width = 720;
  const height = 320;
  const paddingX = 32;
  const paddingTop = 24;
  const paddingBottom = 44;
  const chartWidth = width - paddingX * 2;
  const maxValue = Math.max(...data.map((item) => item.totalCount), 1);
  const chartHeight = height - paddingTop - paddingBottom;
  const fromTime = new Date(from).getTime();
  const toTime = new Date(to).getTime();
  const totalRange = Math.max(toTime - fromTime, 1);
  const tickCount = 4;
  const ticks = Array.from({ length: tickCount }, (_, index) => {
    const ratio = index / (tickCount - 1);

    return new Date(fromTime + totalRange * ratio).toISOString();
  });
  const points = data.map((item) => {
    const pointTime = new Date(item.timestamp).getTime();
    const ratio = Math.min(Math.max((pointTime - fromTime) / totalRange, 0), 1);
    const x = paddingX + ratio * chartWidth;
    const totalHeight = (item.totalCount / maxValue) * chartHeight;
    const warnHeight = (item.warnCount / maxValue) * chartHeight;
    const errorHeight = (item.errorCount / maxValue) * chartHeight;
    const y = height - paddingBottom - totalHeight;

    return {
      ...item,
      ratio,
      x,
      y,
      totalHeight,
      warnHeight,
      errorHeight,
      warnY: height - paddingBottom - warnHeight,
      errorY: height - paddingBottom - errorHeight,
    };
  });
  const buildLinePath = (
    getY: (point: (typeof points)[number]) => number,
    hasValue?: (point: (typeof points)[number]) => boolean,
  ) => {
    let started = false;

    return points
      .flatMap((point) => {
        if (hasValue && !hasValue(point)) {
          started = false;
          return [];
        }

        const command = started ? "L" : "M";
        started = true;

        return [`${command} ${point.x} ${getY(point)}`];
      })
      .join(" ");
  };
  const totalLinePath = buildLinePath((point) => point.y);
  const warnLinePath = buildLinePath((point) => point.warnY);
  const errorLinePath = buildLinePath((point) => point.errorY);
  const totalCount = data.reduce((sum, item) => sum + item.totalCount, 0);
  const peakPoint = data.reduce((peak, point) =>
    point.totalCount > peak.totalCount ? point : peak,
  );
  const gridValues = Array.from({ length: 4 }, (_, index) => {
    const ratio = index / 3;
    const value = Math.round(maxValue * (1 - ratio));
    const y = paddingTop + chartHeight * ratio;

    return { y, value };
  });

  return (
    <div className="overflow-hidden rounded-[32px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.84)_100%)] p-5 ">
      <div className="grid gap-3 border-b border-[#111111]/8 pb-4 ">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-[#111111]/45">
            Пик активности
          </div>
          <div className="mt-1 text-base font-semibold text-[#111111]">
            {formatLargeNumber(peakPoint.totalCount)} в{" "}
            {formatTime(peakPoint.timestamp)}
          </div>
        </div>
        <div />
      </div>

      <div className="mt-5">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-80 w-full">
          <defs>
            <linearGradient id="timeline-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={LOG_COLORS.purple} />
              <stop offset="100%" stopColor="#6C5CE7" />
            </linearGradient>
          </defs>

          <rect
            x="0"
            y="0"
            width={width}
            height={height}
            rx="24"
            fill="#FFFFFF"
          />

          {gridValues.map(({ y, value }) => (
            <g key={`${y}-${value}`}>
              <line
                x1={paddingX}
                x2={width - paddingX}
                y1={y}
                y2={y}
                stroke={LOG_COLORS.line}
                strokeDasharray="4 8"
              />
              <text
                x={paddingX}
                y={y - 8}
                fill="rgba(17,17,17,0.45)"
                fontSize="11"
              >
                {formatLargeNumber(value)}
              </text>
            </g>
          ))}

          <path
            d={totalLinePath}
            fill="none"
            stroke="url(#timeline-line)"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {errorLinePath ? (
            <path
              d={errorLinePath}
              fill="none"
              stroke={LOG_COLORS.pink}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.95"
            />
          ) : null}
          {warnLinePath ? (
            <path
              d={warnLinePath}
              fill="none"
              stroke={LOG_COLORS.yellow}
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="1"
            />
          ) : null}

          {points.map((point, index) => (
            <g key={`${point.timestamp}-${index}`}>
              <circle
                cx={point.x}
                cy={point.errorY}
                r="4"
                fill={LOG_COLORS.pink}
                stroke={LOG_COLORS.white}
                strokeWidth="2"
              />
              <circle
                cx={point.x}
                cy={point.y}
                r="5.5"
                fill={LOG_COLORS.white}
                stroke={LOG_COLORS.purple}
                strokeWidth="3"
              />
              <circle
                cx={point.x}
                cy={point.warnY}
                r="4.5"
                fill={LOG_COLORS.yellow}
                stroke={LOG_COLORS.white}
                strokeWidth="2"
              />
              <title>
                {`${formatDateLabel(point.timestamp)} • Total ${point.totalCount} • WARN ${point.warnCount} • ERROR ${point.errorCount}`}
              </title>
            </g>
          ))}

          <line
            x1={paddingX}
            x2={width - paddingX}
            y1={height - paddingBottom}
            y2={height - paddingBottom}
            stroke="rgba(17,17,17,0.1)"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 text-xs text-[#111111]/55">
        {ticks.map((tick) => (
          <span
            key={tick}
            className="text-center first:text-left last:text-right"
          >
            {formatDateLabel(tick)}
          </span>
        ))}
      </div>
    </div>
  );
}
