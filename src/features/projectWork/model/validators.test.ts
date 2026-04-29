import {
  validateProjectDescription,
  validateProjectName,
} from "@/features/projectWork/model/validators";

describe("projectWork validators", () => {
  it("validates project name", () => {
    expect(validateProjectName("")).toBe("введите название проекта");
    expect(validateProjectName("a")).toBe(
      "введите название проекта больше 2 символов",
    );
    expect(validateProjectName("x".repeat(61))).toBe(
      "слишком длинное название проекта",
    );
    expect(validateProjectName("LogBoard")).toBe("");
  });

  it("validates project description", () => {
    expect(validateProjectDescription("")).toBe("введите описание проекта");
    expect(validateProjectDescription("short")).toBe(
      "введите описание проекта больше 10 символов",
    );
    expect(validateProjectDescription("x".repeat(501))).toBe(
      "описание слишком длинное",
    );
    expect(validateProjectDescription("Project for centralized logs")).toBe("");
  });
});
