import { FlatCompat } from "@eslint/eslintrc";
import { fixupConfigRules } from "@eslint/compat";
import { fileURLToPath } from "node:url";
import path from "node:path";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

// ----------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

// ----------------------------------------------------------------------

export default [
  {
    ignores: ["node_modules", "dist", "build", ".storybook/storybook-static"],
  },

  // Use fixupConfigRules for extended configurations
  ...fixupConfigRules(
    compat.extends(
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:react/jsx-runtime",
      "plugin:react-hooks/recommended",
      "prettier"
    )
  ),

  // ----------------------------------------------------------------------

  {
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      "no-undef": "error",
    },
  },

  // Main configuration for TypeScript/React files
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      react: reactPlugin,
      prettier: prettierPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
    },
    rules: {
      "no-undef": "error",
      "no-use-before-define": [
        "error",
        {
          functions: true,
          classes: true,
          variables: true,
        },
      ],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "off",
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
        },
      ],

      // TypeScript rules
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",

      // Rules to detect unresolved types
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      "@typescript-eslint/no-unsafe-argument": "error",

      // Rule for type imports
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: true,
        },
      ],

      // General rules
      "no-console": "warn",
      curly: ["error", "all"],
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },

  // Specific configuration for declaration files
  {
    files: ["**/*.{types.ts,d.ts}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      // Specific rules for declaration files
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/ban-types": "error",
      "@typescript-eslint/no-namespace": "error",
      "@typescript-eslint/no-empty-interface": "error",

      // General rules
      "no-undef": "error",
    },
  },

  // Main configuration for JavaScript/React files
  {
    files: ["**/*.{js,jsx,mjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      "react-refresh": reactRefresh,
      prettier: prettierPlugin,
    },
  },

  // Configuration for commonjs files
  {
    files: ["**/*.{js,cjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.commonjs,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      "react-refresh": reactRefresh,
      prettier: prettierPlugin,
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },

  // ----------------------------------------------------------------------

  prettierConfig,
];
