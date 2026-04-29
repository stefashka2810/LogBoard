import { LogLevel } from "@/entities/log/model/types";

export const LOG_LEVELS: LogLevel[] = [
  "TRACE",
  "DEBUG",
  "INFO",
  "WARN",
  "ERROR",
];

export const LOG_COLORS = {
  yellow: "#E4B400",
  purple: "#8E7FF0",
  pink: "#F07FA8",
  ink: "#111111",
  line: "#E9E9E9",
  white: "#FFFFFF",
} as const;

export const logLevelStyles: Record<LogLevel, string> = {
  TRACE: "border-black bg-white text-[#111111]",
  DEBUG: "border-[#8E7FF0] bg-white text-[#8E7FF0]",
  INFO: "border-[#FEEB86] bg-white text-[#111111]",
  WARN: "border-[#FEEB86] bg-[#FEEB86] text-[#111111]",
  ERROR: "border-[#F07FA8] bg-[#F07FA8] text-white",
};
