// eslint.config.js
// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
	// 1. Игнорируем сборку и зависимости
	{
		ignores: ['dist/**', 'node_modules/**', '.angular/**'],
	},

	// 2. Базовые JS-правила
	js.configs.recommended,

	// 3. TypeScript-правила + TS-парсер
	...tseslint.configs.recommended,

	// 4. Ваши правила
	{
		files: ['**/*.{ts,js,tsx,jsx}'],
		rules: {
			'object-curly-spacing': ['error', 'always'],
			'@typescript-eslint/no-explicit-any': 'off',
		},
	},
];
