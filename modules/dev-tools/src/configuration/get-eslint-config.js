const DEFAULT_CONFIG = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020
  },
  extends: ['uber-es2015', 'prettier', 'plugin:import/errors'],
  plugins: ['import'],
  globals: {
    globalThis: 'readonly',
    __VERSION__: 'readonly'
  },
  rules: {
    'guard-for-in': 0,
    'generator-star-spacing': 0,
    'func-names': 0,
    'no-inline-comments': 0,
    'no-multi-str': 0,
    'space-before-function-paren': 0,
    'import/no-unresolved': ['error'],
    'import/no-extraneous-dependencies': ['error', {devDependencies: false, peerDependencies: true}]
  }
};

module.exports = function getESLintConfig() {
  return DEFAULT_CONFIG;
}
