import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Add custom rules here to disable specific rules
  {
    rules: {
      // Disable the no-explicit-any rule project-wide
      "@typescript-eslint/no-explicit-any": "off",
      // Disable the no-unused-vars rule project-wide
      "@typescript-eslint/no-unused-vars": "off"
    }
  }
];

export default eslintConfig;