export function cleanEmptyStrings<T extends Record<string, any>>(data: T): T {
  return Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
  ) as T;
}
