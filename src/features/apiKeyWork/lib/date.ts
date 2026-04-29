import { DateValue } from "react-aria-components";

export function toApiKeyExpirationIso(dateValue: DateValue | null) {
  if (!dateValue) return undefined;

  if ("toDate" in dateValue && typeof dateValue.toDate === "function") {
    return dateValue.toDate("UTC").toISOString();
  }

  const parsed = new Date(dateValue.toString());
  if (Number.isNaN(parsed.getTime())) {
    throw new Error("Invalid API key expiration date");
  }

  return parsed.toISOString();
}
