export function validateProjectName(name: string) {
  const v = name.trim();
  if (!v) return "введите название проекта";
  if (v.length < 2) return "введите название проекта больше 2 символов";
  if (v.length > 60) return "слишком длинное название проекта";
  return "";
}

export function validateProjectDescription(desc: string) {
  const v = desc.trim();
  if (!v) return "введите описание проекта";
  if (v.length < 10) return "введите описание проекта больше 10 символов";
  if (v.length > 500) return "описание слишком длинное";
  return "";
}
