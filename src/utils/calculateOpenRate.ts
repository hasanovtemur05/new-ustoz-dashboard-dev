export function calculateOpenRate(deliveredCount = 0, openedCount = 0): number {
  return deliveredCount > 0 ? Math.round((openedCount / deliveredCount) * 100) : 0;
}
