require('@rushstack/eslint-patch/modern-module-resolution')

/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-standard'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // Priority A:
    'vue/multi-word-component-names': 0, // need fix
    'vue/valid-v-slot': ['error', { allowModifiers: true }],
    // Priority B
    'vue/html-self-closing': 0,
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 10
      },
      multiline: {
        max: 1
      }
    }],
    'vue/require-default-prop': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/v-on-event-hyphenation': 0,
    // Uncategorized
    'vue/custom-event-name-casing': ['error', 'kebab-case']
  }
}
