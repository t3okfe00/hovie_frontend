// import js from "@eslint/js";
// import globals from "globals";
// import reactHooks from "eslint-plugin-react-hooks";
// import reactRefresh from "eslint-plugin-react-refresh";
// import tseslint from "typescript-eslint";

// export default tseslint.config(
//   { ignores: ["dist"] },
//   {
//     extends: [js.configs.recommended, ...tseslint.configs.recommended],
//     files: ["**/*.{ts,tsx}"],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//     },
//     plugins: {
//       "react-hooks": reactHooks,
//       "react-refresh": reactRefresh,
//     },
//     rules: {
//       ...reactHooks.configs.recommended.rules,
//       "@typescript-eslint/no-unused-vars": "off", // Disable the unused-vars rule
//       "@typescript-eslint/explicit-module-boundary-types": "off", // Disable the explicit return type rule
//       "@typescript-eslint/no-explicit-any": "off", // Allow `any` type
//       "no-console": "off", // You can also disable console warnings
//       "react-refresh/only-export-components": [
//         "warn",
//         { allowConstantExport: true },
//       ],
//     },
//   }
// );
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "node_modules"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      "plugin:react/recommended",
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "off", // Disable unused-vars rule
      "@typescript-eslint/explicit-module-boundary-types": "off", // Disable explicit return types
      "@typescript-eslint/no-explicit-any": "off", // Allow `any` type
      "no-console": "off", // Disable console warnings
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/ban-ts-comment": "off", // Allow ts-ignore comments
      "@typescript-eslint/no-non-null-assertion": "off", // Allow non-null assertions
      "@typescript-eslint/no-empty-function": "off", // Disable empty function errors
      "@typescript-eslint/no-empty-interface": "off", // Disable empty interface errors
      "react/prop-types": "off", // Disable prop-types check in React
    },
  }
);
