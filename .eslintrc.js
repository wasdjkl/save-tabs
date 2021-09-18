module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {},
  overrides: [
    {
      files: ["tasks/**/*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-implicit-any-catch": "off",
      },
    },
    {
      files: ['src/**/*.ts'],
      parserOptions: {
        ecmaVersion: 2019,
        project: 'src/tsconfig.json',
      },
      rules: {
        '@typescript-eslint/no-implied-eval': 'error',
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        '@typescript-eslint/promise-function-async': 'error',
      }
    },
  ],
};
