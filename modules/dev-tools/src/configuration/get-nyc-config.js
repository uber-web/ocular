module.exports.getNYCConfig = function getNYCConfig() {
  return {
    all: 'true',
    include: ['modules/**/src/**/*.+(js|jsx|mjs|ts|tsx)'],
    exclude: [
      '**/wip/**',
      '**/libs/**',
      '**/test/**',
      '**/*disabled',
      '**/deprecated',
      '**/*.d.ts',
      '**/bundle.+(js|ts)',
      '**/*.worker.+(js|ts)'
    ]
  };
};
