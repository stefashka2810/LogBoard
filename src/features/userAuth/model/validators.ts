export const validateUsername = (username: string): string => {
  if (!username.trim()) {
    return "введите username";
  }

  if (username.length < 6) {
    return "введите username больше 6 символов";
  }

  if (!/^[A-Za-z0-9_.@]+$/.test(username)) {
    return "username допускает только латинские буквы, цифры, символы ._@";
  }

  return "";
};

export const validatePassword = (password: string): string => {
  if (!password.trim()) {
    return "введите пароль";
  }

  if (password.length < 6) {
    return "введите пароль больше 6 символов";
  }

  if (!/^[A-Za-z0-9._!]+$/.test(password)) {
    return "пароль допускает только латинские буквы, цифры и символы ._!";
  }

  if (!/[A-Za-z]/.test(password)) {
    return "пароль должен содержать хотя бы одну букву";
  }

  if (!/\d/.test(password)) {
    return "пароль должен содержать хотя бы одну цифру";
  }

  if (!/[._!]/.test(password)) {
    return "пароль должен содержать хотя бы один символ ._!";
  }

  return "";
};

export const confirmPassword = (password1: string, password2: string) => {
  if (!password2.trim()) {
    return "введите ваш пароль еще раз";
  }

  if (password1 !== password2) {
    return "пароли не совпадают";
  }

  return "";
};
