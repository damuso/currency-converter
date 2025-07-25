import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

export default [
	{
		ignores: [
			'**/node_modules/**',
			'**/dist/**',
			'**/build/**',
			'**/.next/**',
			'**/coverage/**',
			'**/.turbo/**'
		]
	},
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				project: true
			}
		},
		plugins: {
			'@typescript-eslint': tseslint
		},
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_' }
			],
			'@typescript-eslint/no-explicit-any': 'warn',

			'no-console': 'warn',
			'prefer-const': 'error',
			'no-var': 'error'
		}
	},
	{
		files: ['*.js', '*.mjs', '*.ts'],
		languageOptions: {
			globals: {
				process: 'readonly',
				Buffer: 'readonly',
				__dirname: 'readonly',
				__filename: 'readonly'
			}
		}
	},
	eslintConfigPrettier
]
