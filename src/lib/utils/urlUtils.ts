export const getFullPathNoQuery = (path: string) => path.split('?')[0];

const extractParentSections = (path: string, level: number): string[] => {
  const sections = path.split('/');
  if (!level) {
    return sections;
  }
  return sections.slice(0, level * -2);
};
export const extractPath = (path: string, level: number): string => {
  if (!level) {
    return path;
  }
  return extractParentSections(path, level).join('/');
};
export const extractParentPath = (path: string) => extractPath(path, 1);

export const extractIdFromPath = (
  path: string,
  level: number,
): string | undefined => {
  const parentSections = extractParentSections(path, level);
  return parentSections[parentSections.length - 1];
};
