function convertToString(value: string | number) {
  return typeof value == "number" ? String(value) : value;
}

export function formatPhone(value: string | number): string {
  const valueToFormat = convertToString(value);
  return valueToFormat
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1 $2")
    .replace(/(\d)(\d{4})$/, "$1$2");
}

export function maskPhone(value?: string) {
  const MAX_SIZE = 11;
  if (!value) {
    return "";
  }

  const valueToFormat = value.replace(/\D/g, "");
  if (valueToFormat.length > MAX_SIZE) {
    return formatPhone(valueToFormat.slice(0, MAX_SIZE));
  }
  return formatPhone(valueToFormat);
}
