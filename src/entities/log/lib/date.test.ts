import { CalendarDate } from "@internationalized/date";
import {
  isoToCalendarDate,
  updateIsoDatePart,
  updateIsoTimePart,
} from "@/entities/log/lib/date";

describe("log date helpers", () => {
  it("converts iso string to CalendarDate", () => {
    const date = isoToCalendarDate("2026-04-28T12:34:00.000Z");

    expect(date).toBeInstanceOf(CalendarDate);
    expect(date.year).toBe(2026);
    expect(date.month).toBe(4);
    expect(date.day).toBe(28);
  });

  it("updates only date part", () => {
    const result = updateIsoDatePart(
      "2026-04-28T12:34:00.000Z",
      new CalendarDate(2026, 5, 2),
    );

    const next = new Date(result);

    expect(next.getUTCFullYear()).toBe(2026);
    expect(next.getUTCMonth()).toBe(4);
    expect(next.getUTCDate()).toBe(2);
    expect(next.getUTCHours()).toBe(12);
    expect(next.getUTCMinutes()).toBe(34);
  });

  it("updates only time part", () => {
    const result = updateIsoTimePart("2026-04-28T12:34:56.000Z", "08:15");
    const next = new Date(result);

    expect(next.getHours()).toBe(8);
    expect(next.getMinutes()).toBe(15);
    expect(next.getSeconds()).toBe(0);
  });
});
