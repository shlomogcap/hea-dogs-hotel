import { extractIdFromPath, extractParentPath, extractPath } from './urlUtils';

const PROJECT_LEVEL = 'projects/a';
const CONTRACT_LEVEL = 'contracts/b';
const SECTION_LEVEL = 'sections/c';

describe('urlUtils', () => {
  test('extractPath', () => {
    const projectPath = PROJECT_LEVEL;
    const contractPath = [PROJECT_LEVEL, CONTRACT_LEVEL].join('/');
    const sectionPath = [PROJECT_LEVEL, CONTRACT_LEVEL, SECTION_LEVEL].join(
      '/',
    );

    expect(extractPath(sectionPath, 0)).toBe(sectionPath);
    expect(extractPath(sectionPath, 1)).toBe(contractPath);
    expect(extractPath(sectionPath, 1)).toBe(extractParentPath(sectionPath));
    expect(extractPath(sectionPath, 2)).toBe(projectPath);
    expect(extractPath(sectionPath, 3)).toBe('');
    expect(extractPath(sectionPath, 17)).toBe('');
  });
  test('extractIdFromPath', () => {
    const sectionPath = [PROJECT_LEVEL, CONTRACT_LEVEL, SECTION_LEVEL].join(
      '/',
    );

    expect(extractIdFromPath(sectionPath, 3)).toBe(undefined);
    expect(extractIdFromPath(sectionPath, 2)).toBe('a');
    expect(extractIdFromPath(sectionPath, 1)).toBe('b');
    expect(extractIdFromPath(sectionPath, 0)).toBe('c');
  });
});
