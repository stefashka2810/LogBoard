import { Project } from "@/entities/project/model/types";
import { LogMetricBox } from "@/entities/log/ui/LogMetricBox";

export function DashboardHeader({
  project,
  totalCount,
  totalWarnings,
  totalErrors,
  formatLargeNumber,
  colors,
}: {
  project: Project;
  totalCount: number;
  totalWarnings: number;
  totalErrors: number;
  formatLargeNumber: (value: number) => string;
  colors: { purple: string; yellow: string; pink: string };
}) {
  return (
    <section className="rounded-3xl border border-[#E9E9E9] bg-white p-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <div className="inline-flex rounded-full border border-[#FEEB86] bg-[#FEEB86] px-3 py-1 text-xs font-medium text-[#111111]">
            Логи проекта
          </div>
          <h1 className="mt-4 text-3xl font-semibold text-[#111111]">
            {project.name}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#111111]/60">
            {project.description || "Логирование и аналитика проекта"}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[480px]">
          <LogMetricBox
            title="Найдено"
            value={formatLargeNumber(totalCount)}
            color={colors.purple}
          />
          <LogMetricBox
            title="Warn"
            value={formatLargeNumber(totalWarnings)}
            color={colors.yellow}
          />
          <LogMetricBox
            title="Error"
            value={formatLargeNumber(totalErrors)}
            color={colors.pink}
          />
        </div>
      </div>
    </section>
  );
}
