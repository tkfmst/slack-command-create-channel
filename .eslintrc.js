'use strict';

/**
 * extends rules
 * -
 */

// eslint-disable-next-line no-undef
module.exports = {
    root: true,
    /**
     * @see https://eslint.org/docs/user-guide/configuring/language-options
     */
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        /**
         * Those with a check mark are valid.
         * https://eslint.org/docs/rules/
         */
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier', 'jest', 'simple-import-sort'],
    rules: {
        'prettier/prettier': 'error',
        '@typescript-eslint/no-empty-interface': 'off',
        'simple-import-sort/imports': 'error',
    },
};
