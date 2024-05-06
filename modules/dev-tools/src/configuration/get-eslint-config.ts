import deepMerge from 'deepmerge';
import {getValidPath, ocularRoot} from '../utils/utils.js';
import {inspect} from 'util';
import {resolve} from 'path';

const localRules = (path) => resolve(ocularRoot, 'src/configuration', path);

const DEFAULT_OPTIONS = {
  react: false
} as const;

const babelConfig = getValidPath(
  './.babelrc',
  './.babelrc.js',
  './.babelrc.cjs',
  './babel.config.js',
  './babel.config.cjs'
);

const DEFAULT_CONFIG = {
  extends: [
    localRules('./eslint-config-uber-es2015/eslintrc.json'),
    'prettier',
    'plugin:import/recommended'
  ],
  plugins: ['import'],
  parser: babelConfig ? '@babel/eslint-parser' : '',
  parserOptions: {
    ecmaVersion: 2020,
    // @babel/eslint-parser issues https://github.com/babel/babel/issues/11975
    requireConfigFile: false,
    babelOptions: {
      configFile: babelConfig
    }
  },
  env: {
    // Note: also sets ecmaVersion
    es2020: true
  },
  globals: {
    globalThis: 'readonly',
    __VERSION__: 'readonly'
  },
  rules: {
    'guard-for-in': 'off',
    'func-names': 'off',
    'no-inline-comments': 'off',
    'no-multi-str': 'off',
    camelcase: 'warn',
    // Let prettier handle this
    indent: 'off',
    'accessor-pairs': ['error', {getWithoutSet: false, setWithoutGet: false}],
    'import/no-extraneous-dependencies': ['error', {devDependencies: false, peerDependencies: true}]
  },
  settings: {
    // Ensure eslint finds typescript files
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.d.ts']
      }
    }
  },
  ignorePatterns: ['node_modules', '**/dist*/**/*.js'],
  overrides: [
    {
      // babel-eslint can process TS files, but it doesn't understand types
      // typescript-eslint has some more advanced rules with type checking
      files: ['**/*.ts', '**/*.tsx', '**/*.d.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module', // we want to use ES modules
        project: './tsconfig.json'
      },
      extends: ['plugin:@typescript-eslint/recommended-type-checked'],
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/no-dupe-class-members': 'error',
        '@typescript-eslint/switch-exhaustiveness-check': 'error',

        // Rules disabled because they conflict with our preferred style
        // We use function hoisting to put exports at top of file
        '@typescript-eslint/no-use-before-define': 'off',
        // We encourage explicit typing, e.g `field: string = ''`
        '@typescript-eslint/no-inferrable-types': 'off',
        // Allow noOp as default value for callbacks
        '@typescript-eslint/no-empty-function': 'off',

        // Rules downgraded because they are deemed acceptable
        '@typescript-eslint/ban-ts-comment': [
          'error',
          {
            'ts-expect-error': 'allow-with-description',
            'ts-ignore': 'allow-with-description',
            'ts-nocheck': 'allow-with-description',
            'ts-check': false,
            minimumDescriptionLength: 3
          }
        ],
        '@typescript-eslint/no-floating-promises': 'warn',
        '@typescript-eslint/restrict-template-expressions': 'warn',
        '@typescript-eslint/no-empty-interface': 'warn',
        '@typescript-eslint/require-await': 'warn',

        // Rules that restrict the use of `any`
        // Might be too strict for our code base, but should be gradually enabled
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unsafe-argument': 'warn',
        '@typescript-eslint/no-unsafe-assignment': 'warn',
        '@typescript-eslint/no-unsafe-call': 'warn',
        '@typescript-eslint/no-unsafe-enum-comparison': 'warn',
        '@typescript-eslint/no-unsafe-member-access': 'warn',
        '@typescript-eslint/no-unsafe-return': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'warn'
      }
    },
    {
      // We can lint through code examples in Markdown as well,
      // but we don't need to enable all of the rules there
      files: ['**/*.md'],
      plugins: ['markdown'],
      // extends: 'plugin:markdown/recommended',
      rules: {
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'no-unused-expressions': 'off',
        'no-console': 'off',
        'padded-blocks': 'off'
      }
    }
  ]
};

function getReactConfig(options) {
  return {
    extends: [
      localRules('./eslint-config-uber-jsx/eslintrc.json'),
      'prettier',
      'plugin:import/recommended'
    ],
    plugins: ['import', 'react'],
    settings: {
      react: {
        version: options.react
      }
    }
  };
}

export function getESLintConfig(
  options: {react?: string | false; overrides?: any; debug?: boolean} = {}
) {
  options = {...DEFAULT_OPTIONS, ...options};

  let config = {...DEFAULT_CONFIG};
  if (options.react) {
    config = deepMerge(config, getReactConfig(options));
  }
  if (options.overrides) {
    config = deepMerge(config, options.overrides);
  }
  if (options.debug) {
    // eslint-disable-next-line
    console.log(inspect(config, {colors: true, depth: null}));
  }

  return config;
}
