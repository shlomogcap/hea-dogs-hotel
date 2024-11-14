export const toNumber = (nString: string | number) =>
  Number(String(nString).replace(/[^\d.-]/g, ''));

export const safeDivide = (
  dividend?: number,
  divisor?: number,
  defaultValue = 0,
) => (divisor ? Number(dividend) / Number(divisor) : defaultValue);
