import wdio from "eslint-plugin-wdio";
import mocha from "eslint-plugin-mocha";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2019,
      sourceType: "module",
      globals: {
        util: "readonly",
        i18n: "readonly"
      }
    },
    plugins: {
      wdio,
      mocha
    },
    rules: {
      // Paste all your rules from .eslintrc here
      "no-unreachable": 2,
      "use-isnan": 2,
      "valid-typeof": 2,
      "no-fallthrough": 2,
      "no-multi-spaces": 2,
      "no-octal": 2,
      "no-redeclare": 2,
      "no-self-assign": 2,
      "no-unused-labels": 2,
      "strict": [2, "global"],
      "no-delete-var": 2,
      "no-unused-vars": [2, { "args": "none" }],
      "no-mixed-requires": 2,
      "no-new-require": 2,
      "no-path-concat": 2,
      "no-restricted-modules": [2, "sys", "_linklist"],
      "brace-style": [2, "1tbs", { "allowSingleLine": true }],
      "comma-spacing": 2,
      "eol-last": 2,
      "key-spacing": [2, { "mode": "minimum" }],
      "keyword-spacing": 2,
      "max-len": [2, 120, 2],
      "indent": ["error", 4],
      "new-parens": 2,
      "no-mixed-spaces-and-tabs": 2,
      "no-multiple-empty-lines": [2, { "max": 1 }],
      "no-trailing-spaces": [2, { "skipBlankLines": true }],
      "quotes": [2, "single", "avoid-escape"],
      "semi": 2,
      "space-before-blocks": [2, "always"],
      "space-before-function-paren": [2, "never"],
      "space-in-parens": [2, "never"],
      "space-infix-ops": 2,
      "space-unary-ops": 2,
      "arrow-spacing": [2, { "before": true, "after": true }],
      "constructor-super": 2,
      "no-class-assign": 2,
      "no-confusing-arrow": 2,
      "no-const-assign": 2,
      "no-dupe-class-members": 2,
      "no-new-symbol": 2,
      "no-this-before-super": 2,
      "prefer-const": 2,
      "template-curly-spacing": 2,
      "padding-line-between-statements": [
        "error",
        {
          "blankLine": "always",
          "prev": "*",
          "next": "cjs-export"
        }
      ]
    }
  }
];
