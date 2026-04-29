import {
  formatDateLabel,
  formatLargeNumber,
  formatShortDate,
  formatTime,
  getErrorMessage,
} from "@/entities/log/lib/formatters";

describe("log formatters", () => {
  it("formats date label for logs", () => {
    expect(formatDateLabel("2026-04-28T12:34:00.000Z")).toMatch(
      /\d{2}\.\d{2}, \d{2}:\d{2}/,
    );
  });

  it("formats short date", () => {
    expect(formatShortDate("2026-04-28T12:34:00.000Z")).toMatch(
      /\d{2}\.\d{2}\.\d{4}/,
    );
  });

  it("formats time", () => {
    expect(formatTime("2026-04-28T03:07:00.000Z")).toMatch(/\d{2}:\d{2}/);
  });

  it("formats large number with locale", () => {
    expect(formatLargeNumber(1234567)).toBe("1 234 567");
  });

  it("extracts error message", () => {
    expect(getErrorMessage("boom", "fallback")).toBe("boom");
    expect(getErrorMessage({ message: "boom" }, "fallback")).toBe("fallback");
  });
});
