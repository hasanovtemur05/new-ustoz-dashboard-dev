export function formatDateTime(input: string, onlyDate?: boolean) {
  const date = new Date(input);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  return onlyDate ? `${year}-${month}-${day}` : `${year}-${month}-${day} ${hours}:${minutes}`;
}
