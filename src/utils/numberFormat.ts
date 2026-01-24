export const numToSum = (amount?: number, division = 1) =>
  new Intl.NumberFormat('uz-UZ', { style: 'currency', currency: 'UZS', maximumFractionDigits: 0 }).format(Number(amount) / division);
