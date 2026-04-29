import { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { DashboardFilters } from "@/features/dashboard/ui/DashboardFilters";
import { CalendarDate, DateValue } from "@internationalized/date";
import { LOG_LEVELS, logLevelStyles } from "@/entities/log/lib/constants";
import { vi } from "vitest";

vi.mock("@/shared/ui/Calendar", () => ({
  Calendar: ({
    onChange,
  }: {
    onChange: (value: DateValue) => void;
  }) => (
    <button onClick={() => onChange(new CalendarDate(2026, 5, 1))}>
      pick-date
    </button>
  ),
}));

describe("DashboardFilters", () => {
  const baseProps = {
    message: "timeout",
    from: "2026-04-28T10:00:00.000Z",
    to: "2026-04-29T10:00:00.000Z",
    levels: ["ERROR"] as ("ERROR")[],
    logLevels: LOG_LEVELS,
    openCalendar: null as "from" | "to" | null,
    calendarPopoverRef: createRef<HTMLDivElement>(),
    formatShortDate: vi.fn(() => "28.04.2026"),
    formatTime: vi.fn(() => "10:00"),
    isoToCalendarDate: vi.fn(() => new CalendarDate(2026, 4, 28)),
    updateIsoDatePart: vi.fn(() => "2026-05-01T10:00:00.000Z"),
    updateIsoTimePart: vi.fn(() => "2026-04-28T11:15:00.000Z"),
    levelStyles: logLevelStyles,
    onMessageChange: vi.fn(),
    onDateRangeChange: vi.fn(),
    onToggleLevel: vi.fn(),
    onOpenCalendar: vi.fn(),
    onReset: vi.fn(),
    onRefresh: vi.fn(),
  };

  it("calls message change handler", () => {
    render(<DashboardFilters {...baseProps} />);

    fireEvent.change(screen.getByPlaceholderText("timeout, exception, kafka"), {
      target: { value: "panic" },
    });

    expect(baseProps.onMessageChange).toHaveBeenCalledWith("panic");
  });

  it("calls level toggle handler", () => {
    render(<DashboardFilters {...baseProps} />);

    fireEvent.click(screen.getByText("WARN"));

    expect(baseProps.onToggleLevel).toHaveBeenCalledWith("WARN");
  });

  it("calls reset and refresh handlers", () => {
    render(<DashboardFilters {...baseProps} />);

    fireEvent.click(screen.getByText("Сбросить"));
    fireEvent.click(screen.getByText("Обновить"));

    expect(baseProps.onReset).toHaveBeenCalled();
    expect(baseProps.onRefresh).toHaveBeenCalled();
  });

  it("opens date picker and sends changed date", () => {
    render(
      <DashboardFilters
        {...baseProps}
        openCalendar="from"
      />,
    );

    fireEvent.click(screen.getByText("pick-date"));

    expect(baseProps.updateIsoDatePart).toHaveBeenCalled();
    expect(baseProps.onDateRangeChange).toHaveBeenCalledWith({
      from: "2026-05-01T10:00:00.000Z",
      to: "2026-04-29T10:00:00.000Z",
    });
    expect(baseProps.onOpenCalendar).toHaveBeenCalledWith(null);
  });

  it("updates time values", () => {
    render(<DashboardFilters {...baseProps} />);

    const timeInputs = screen.getAllByDisplayValue("10:00");
    fireEvent.change(timeInputs[0], { target: { value: "11:15" } });

    expect(baseProps.updateIsoTimePart).toHaveBeenCalledWith(
      "2026-04-28T10:00:00.000Z",
      "11:15",
    );
    expect(baseProps.onDateRangeChange).toHaveBeenCalled();
  });
});
