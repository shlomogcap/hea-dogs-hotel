module.exports = {
  '**/*.js?(x)': (filenames) =>
    filenames.map((filename) => `prettier --write '${filename}'`),
  '**/*.ts?(x)': () => 'npm run type-check',
  '**/*.{js,jsx,ts,tsx}': (filenames) => [
    'echo "Running tests..."',
    `jest --findRelatedTests ${filenames.join(' ')} --passWithNoTests`,
  ],
};
