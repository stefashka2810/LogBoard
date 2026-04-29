export function LogMetricBox({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-[#E9E9E9] bg-white p-4">
      <div
        className="mb-4 h-2 w-16 rounded-full"
        style={{ backgroundColor: color }}
      />
      <div className="text-xs uppercase tracking-[0.16em] text-[#111111]/55">
        {title}
      </div>
      <div className="mt-3 text-3xl font-semibold text-[#111111]">{value}</div>
    </div>
  );
}
