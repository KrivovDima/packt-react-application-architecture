module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:storybook/recommended', 'next/core-web-vitals', 'plugin:react/jsx-runtime', 'prettier', 'plugin:storybook/recommended', 'plugin:storybook/recommended', 'plugin:storybook/recommended', 'plugin:storybook/recommended', 'plugin:storybook/recommended'],
    rules: {
        'no-restricted-imports': [
            'error',
            {
                patterns: ['@/features/*/*'],
            },
        ],
        'import/no-cycle': 'error',
        // 'linebreak-style': ['error', 'unix'],
        'import/order': [
            'error',
            {
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                    'object',
                ],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
        '@typescript-eslint/no-var-requires': 'off',
        'react/display-name': 'off',
    },
    overrides: [
        {
            files: [
                '*.test.{ts,tsx}',
                'src/testing/**/*.{ts,tsx}',
            ],
            rules: {
                '@typescript-eslint/no-explicit-any':
                    'off',
                '@typescript-eslint/ban-ts-comment':
                    'off',
            },
        },
    ],
};
