import { formatDate } from './dateUtils';

describe('dateUtils', () => {
  test('formatDate', () => {
    [undefined, null, 0, '', NaN].forEach((nullishToken) => {
      expect(formatDate(nullishToken)).toBe('---');
    });
    [undefined, null, 0, '', NaN].forEach((nullishToken) => {
      expect(formatDate(nullishToken, { fallback: '#' })).toBe('#');
    });

    expect(formatDate('2020-12-31')).toBe('31/12/2020');
    expect(formatDate('2020-12-32')).toBe('01/01/2021');
  });
});
