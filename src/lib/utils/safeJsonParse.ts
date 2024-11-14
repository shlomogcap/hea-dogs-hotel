export const safeJSONParse = <T>(jsonString: unknown): T => {
  try {
    const parsedJson = JSON.parse(String(jsonString));
    return parsedJson as T;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return {} as T;
  }
};
