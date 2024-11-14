export const getEnumMemberOrSelf = <E extends Record<string, number | string>>(
  key: string,
  enumObject: E,
) =>
  Object.keys(enumObject ?? {}).includes(key)
    ? enumObject[key as keyof E]
    : key;
