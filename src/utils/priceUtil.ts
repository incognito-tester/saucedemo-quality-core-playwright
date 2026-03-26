export function parsePrice(text: string): number {
  const numericValue = text.replace(/[^0-9.]/g, '');
  return Number(numericValue);
}

export function roundToTwo(value: number): number {
  return Math.round(value * 100) / 100;
}