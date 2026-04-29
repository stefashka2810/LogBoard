import {
  confirmPassword,
  validatePassword,
  validateUsername,
} from "@/features/userAuth/model/validators";

describe("userAuth validators", () => {
  it("validates username rules", () => {
    expect(validateUsername("")).toBe("введите username");
    expect(validateUsername("abc")).toBe("введите username больше 6 символов");
    expect(validateUsername("user?!")).toBe(
      "username допускает только латинские буквы, цифры, символы ._@",
    );
    expect(validateUsername("valid_user")).toBe("");
  });

  it("validates password rules", () => {
    expect(validatePassword("")).toBe("введите пароль");
    expect(validatePassword("123")).toBe("введите пароль больше 6 символов");
    expect(validatePassword("!!!!!!")).toBe(
      "пароль должен содержать хотя бы одну букву",
    );
    expect(validatePassword("abcdef")).toBe(
      "пароль должен содержать хотя бы одну цифру",
    );
    expect(validatePassword("abc12?")).toBe(
      "пароль допускает только латинские буквы, цифры и символы ._!",
    );
    expect(validatePassword("abc123")).toBe("");
  });

  it("confirms password repetition", () => {
    expect(confirmPassword("abc123", "")).toBe("введите ваш пароль еще раз");
    expect(confirmPassword("abc123", "abc124")).toBe("пароли не совпадают");
    expect(confirmPassword("abc123", "abc123")).toBe("");
  });
});
