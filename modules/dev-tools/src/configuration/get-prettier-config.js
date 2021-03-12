const DEFAULT_CONFIG = {
  printWidth: 100,
  semi: true,
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: false  
};

module.exports = function getPrettierConfig(options) {
  const config = DEFAULT_CONFIG;
  return config;
}
