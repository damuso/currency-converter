import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import rootConfig from "../../eslint.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
	...rootConfig,
	...compat.extends("next/core-web-vitals", "next/typescript"),
	{
		files: ['**/*.ts', '**/*.tsx'],
		rules: {
			'react/no-unescaped-entities': 'off',
			'@typescript-eslint/no-unused-vars': ['error', {
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_'
			}]
		}
	}
];

export default eslintConfig;
