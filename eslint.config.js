// eslint.config.js
// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default [
	{ ignores: ['dist/**', 'node_modules/**', '.angular/**'] },

	js.configs.recommended,
	...tseslint.configs.recommended,

	// Настройки для всех файлов
	{
		files: ['**/*.{ts,js,tsx,jsx}'],
		rules: {
			'object-curly-spacing': ['error', 'always'],
			'@typescript-eslint/no-explicit-any': 'off',
		},
	},

	// Настройки ТОЛЬКО для Node-скриптов (переопределяют общие)
	{
		files: ['**/tools/**/*.{js,cjs,mjs}'], // Ищем папку tools на любой глубине
		languageOptions: {
			globals: {
				...globals.node, // Разрешает process, __dirname, require
				console: 'readonly', // Явно разрешаем console
			},
			sourceType: 'commonjs', // Важно для require
		},
		rules: {
			'@typescript-eslint/no-require-imports': 'off',
			'no-undef': 'off', // Разрешает process, __dirname, require
		},
	},
];
