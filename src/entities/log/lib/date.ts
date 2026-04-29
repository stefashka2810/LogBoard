import { CalendarDate, DateValue } from "@internationalized/date";

export function isoToCalendarDate(value: string) {
  const date = new Date(value);

  return new CalendarDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  );
}

export function updateIsoDatePart(iso: string, dateValue: DateValue) {
  const current = new Date(iso);
  const next = new Date(current);
  next.setFullYear(dateValue.year, dateValue.month - 1, dateValue.day);

  return next.toISOString();
}

export function updateIsoTimePart(iso: string, timeValue: string) {
  const [hoursString = "00", minutesString = "00"] = timeValue.split(":");
  const hours = Number(hoursString);
  const minutes = Number(minutesString);
  const current = new Date(iso);
  const next = new Date(current);

  next.setHours(
    Number.isNaN(hours) ? 0 : hours,
    Number.isNaN(minutes) ? 0 : minutes,
    0,
    0,
  );

  return next.toISOString();
}
