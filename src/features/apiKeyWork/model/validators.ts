export function validateApiKeyName(name: string) {
  const v = name.trim();
  if (!v) return "введите название API-ключа";
  if (v.length < 2) return "введите название больше 2 символов";
  if (v.length > 50) return "слишком длинное название ключа";
  return "";
}

export function validateApiKeyExpiration(dateStr: string) {
  const selected = new Date(dateStr);
  const now = new Date();
  if (selected <= now) return "дата должна быть в будущем";
  return "";
}
