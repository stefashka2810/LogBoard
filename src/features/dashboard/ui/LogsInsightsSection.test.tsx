import { render, screen } from "@testing-library/react";
import { LogsInsightsSection } from "@/features/dashboard/ui/LogsInsightsSection";
import { vi } from "vitest";

vi.mock("@/entities/log/ui/LogsTimelineChart", () => ({
  LogsTimelineChart: ({ data }: { data: { timestamp: string }[] }) => (
    <div>timeline-points-{data.length}</div>
  ),
}));

describe("LogsInsightsSection", () => {
  it("renders timeline error", () => {
    render(
      <LogsInsightsSection
        timeline={[]}
        isTimelineError={true}
        timelineError={"Ошибка таймлайна"}
        isTimelineLoading={false}
        isTimelineFetching={false}
        levelDistribution={[]}
        logsCount={0}
      />,
    );

    expect(screen.getByText("Ошибка таймлайна")).toBeInTheDocument();
  });

  it("renders timeline loading placeholder", () => {
    const { container } = render(
      <LogsInsightsSection
        timeline={[]}
        isTimelineError={false}
        timelineError={undefined}
        isTimelineLoading={true}
        isTimelineFetching={false}
        levelDistribution={[]}
        logsCount={0}
      />,
    );

    expect(container.querySelector(".h-72")).toBeInTheDocument();
  });

  it("renders timeline and distribution", () => {
    render(
      <LogsInsightsSection
        timeline={[
          {
            timestamp: "2026-04-28T12:00:00.000Z",
            totalCount: 5,
            errorCount: 1,
            warnCount: 2,
          },
        ]}
        isTimelineError={false}
        timelineError={undefined}
        isTimelineLoading={false}
        isTimelineFetching={false}
        levelDistribution={[
          { level: "ERROR", count: 1 },
          { level: "WARN", count: 2 },
        ]}
        logsCount={3}
      />,
    );

    expect(screen.getByText("timeline-points-1")).toBeInTheDocument();
    expect(screen.getByText("ERROR")).toBeInTheDocument();
    expect(screen.getByText("WARN")).toBeInTheDocument();
  });
});
