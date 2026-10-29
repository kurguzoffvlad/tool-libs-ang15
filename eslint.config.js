// eslint.config.js
// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default [
	{ ignores: ['dist/**', 'node_modules/**', '.angular/**'] },

	js.configs.recommended,
	...tseslint.configs.recommended,

	// Node-скрипты (tools/**)
	{
		files: ['tools/**/*.{js,cjs,mjs}'],
		languageOptions: {
			globals: { ...globals.node },
		},
	},

	{
		files: ['**/*.{ts,js,tsx,jsx}'],
		rules: {
			'object-curly-spacing': ['error', 'always'],
			'@typescript-eslint/no-explicit-any': 'off',
		},
	},
];
