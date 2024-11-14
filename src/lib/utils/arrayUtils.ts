export const getNextIndex = <T extends Record<string, any>, K extends keyof T>(
  arr: T[],
  field: K,
) => arr.reduce((acc, curr) => Math.max(acc, curr[field]), 0) + 1;

export const generateNumberArray = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, index) => from + index);

export const getEntries = <T extends object>(obj: T) =>
  Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
