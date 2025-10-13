import wdio from 'eslint-plugin-wdio';
import mocha from 'eslint-plugin-mocha';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import babelParser from '@babel/eslint-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// eslint-disable-next-line no-unused-vars
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    {
        plugins: {
            wdio,
            mocha
        },

        languageOptions: {
            globals: {
                ...Object.fromEntries(Object.entries(globals.browser).map(([key]) => [key, 'off'])),
                ...globals.node,
                ...globals.mocha,
                util: true,
                i18n: true
            },
            parser: babelParser,
            parserOptions: {
                requireConfigFile: false,
                babelOptions: {
                    configFile: false
                }
            },
            ecmaVersion: 2019,
            sourceType: 'module'
        },

        rules: {
            'padding-line-between-statements': ['error', {
                blankLine: 'always',
                prev: '*',
                next: 'cjs-export'
            }],

            'comma-dangle': [2],
            'no-control-regex': 0,
            'no-debugger': 2,
            'no-dupe-args': 2,
            'no-dupe-keys': 2,
            'no-duplicate-case': 2,
            'no-empty-character-class': 2,
            'no-ex-assign': 2,
            'no-extra-boolean-cast': 2,
            'no-extra-parens': [2, 'functions'],
            'no-extra-semi': 2,
            'no-func-assign': 2,
            'no-invalid-regexp': 2,
            'no-irregular-whitespace': 2,
            'no-obj-calls': 2,
            'no-proto': 2,
            'no-unexpected-multiline': 2,
            'no-unreachable': 2,
            'use-isnan': 2,
            'valid-typeof': 2,
            'no-fallthrough': 2,
            'no-multi-spaces': 2,
            'no-octal': 2,
            'no-redeclare': 2,
            'no-self-assign': 2,
            'no-unused-labels': 2,
            strict: [2, 'global'],
            'no-delete-var': 2,

            'no-unused-vars': [2, {
                args: 'none'
            }],

            'no-mixed-requires': 2,
            'no-new-require': 2,
            'no-path-concat': 2,
            'no-restricted-modules': [2, 'sys', '_linklist'],

            'brace-style': [2, '1tbs', {
                allowSingleLine: true
            }],

            'comma-spacing': 2,
            'eol-last': 2,

            'key-spacing': [2, {
                mode: 'minimum'
            }],

            'keyword-spacing': 2,
            'max-len': [2, 120, 2],
            indent: ['error', 4],
            'new-parens': 2,
            'no-mixed-spaces-and-tabs': 2,

            'no-multiple-empty-lines': [2, {
                max: 1
            }],

            'no-trailing-spaces': [2, {
                skipBlankLines: true
            }],

            quotes: [2, 'single', 'avoid-escape'],
            semi: 2,
            'space-before-blocks': [2, 'always'],
            'space-before-function-paren': [2, 'never'],
            'space-in-parens': [2, 'never'],
            'space-infix-ops': 2,
            'space-unary-ops': 2,

            'arrow-spacing': [2, {
                before: true,
                after: true
            }],

            'constructor-super': 2,
            'no-class-assign': 2,
            'no-confusing-arrow': 2,
            'no-const-assign': 2,
            'no-dupe-class-members': 2,
            'no-new-symbol': 2,
            'no-this-before-super': 2,
            'prefer-const': 2,
            'template-curly-spacing': 2
        }
    },
    {
        ignores: [
            'allure-report/*',
            '**/vendor/*.js',
            'node_modules/*',
            '**/package-lock.json'
        ]
    }];
