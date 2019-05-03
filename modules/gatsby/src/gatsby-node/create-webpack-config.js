const {log, COLOR} = require('../utils/log');

// See
// https://github.com/gatsbyjs/gatsby/blob/master/docs/docs/add-custom-webpack-config.md#modifying-the-babel-loader
// https://github.com/gatsbyjs/gatsby/issues/3052

let hasRun = false;

// Makes JSON.stringify print regexps
function stringify(key, value) {
  if (value instanceof RegExp) {
    return value.toString();
  }
  if (value instanceof Function) {
    return '[function]';
  }
  return value;
}

function logWebpackConfig(config) {
  if (log.priority >= 3) {
    log.log({color: COLOR.MAGENTA, priority: 3},
      `Webpack rules: ${JSON.stringify(config, stringify, 4)}`)();
  } else {
    log.log({color: COLOR.CYAN, priority: 1},
      `Webpack started with aliases ${JSON.stringify(config.resolve.alias, stringify, 2)}`)();
  }
}

function getWebpackConfigOverrides(config, ocularConfig = global.ocularConfig) {
  if (ocularConfig.webpack) {
    log.log({color: COLOR.CYAN}, `rewriting gatsby webpack config (using website config)`)();
    log.log({priority: 2, color: COLOR.MAGENTA},
      `Webpack options ${JSON.stringify(ocularConfig.webpack, stringify, 2)}`)();
  } else {
    log.log({color: COLOR.CYAN},
      `rewriting gatsby webpack config (no website webpack config supplied)`)();
  }

  const doNotExcludeOcular = modulePath =>
    /node_modules/.test(modulePath) &&
    !/node_modules\/(ocular|ocular-gatsby|gatsby-plugin-ocular)/.test(modulePath);

  // eslint-disable-next-line no-restricted-syntax
  for (const rule of config.module.rules) {
    if (rule.exclude && rule.exclude.toString() === '/(node_modules|bower_components)/') {
      rule.exclude = doNotExcludeOcular;
    }
  }

  const newConfig = {};

  // nulling out `fs` avoids issues with certain node modules getting bundled,
  // e.g. headless-gl gets bundled by luma.gl if installed in root folder
  newConfig.node = newConfig.node || {};
  newConfig.node.fs = 'empty';

  Object.assign(newConfig, ocularConfig.webpack);

  return newConfig;
}

function onCreateWebpackConfig(opts) {
  if (hasRun) {
    return;
  }
  hasRun = true;

  const {
    // stage,     // build stage: ‘develop’, ‘develop-html’, ‘build-javascript’, or ‘build-html’
    getConfig, // Function that returns the current webpack config
    // rules,     // Object (map): set of preconfigured webpack config rules
    // loaders,   // Object (map): set of preconfigured webpack config loaders
    // plugins,    // Object (map): A set of preconfigured webpack config plugins
    actions
  } = opts;

  const config = getConfig();

  const newConfig = getWebpackConfigOverrides(config)

  log.log(
    {color: COLOR.CYAN, priority: 4},
    `Webpack delta config ${JSON.stringify(newConfig, stringify, 2)}`
  )();

  // NOTE: setWebpackConfig MERGES in the new config
  actions.setWebpackConfig(newConfig);

  logWebpackConfig(getConfig());
}

module.exports.logWebpackConfig = logWebpackConfig;
module.exports.getWebpackConfigOverrides = getWebpackConfigOverrides;
module.exports.onCreateWebpackConfig = onCreateWebpackConfig;
