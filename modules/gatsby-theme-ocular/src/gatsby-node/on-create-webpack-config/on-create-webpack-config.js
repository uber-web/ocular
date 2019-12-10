  const {log, COLOR} = require('../../utils/log');
  const {getOcularOptions} = require('../../utils/get-ocular-options');

  const MODULE_NAME = 'gatsby-theme-ocular';

// See
// https://github.com/gatsbyjs/gatsby/blob/master/docs/docs/add-custom-webpack-config.md#modifying-the-babel-loader
// https://github.com/gatsbyjs/gatsby/issues/3052

// Helper class to control what paths are processed by gatsby webpack config
class WebpackRule {
  static isBabelLoader(rule) {
    return rule.use && rule.use[0] && /babel-loader/.test(rule.use[0].loader);
  }

  static getLoader(rule) {
    return rule.use && rule.use[0] && rule.use[0].loader;
  }

  static checkIfExcludes(rule, path) {
    const {exclude} = rule;
    if (exclude && typeof exclude === 'function') {
      return exclude(path);
    }
    if (exclude && exclude instanceof RegExp) {
      return exclude.test(path);
    }
    // Webpack conditions support more overloads: https://webpack.js.org/configuration/module#condition
    // ignore for now
    // console.log(exclude);
    return false;
  }

  static checkIfIncludes(rule, path) {
    const {exclude} = rule;
    if (typeof exclude === 'function') {
      return !exclude(path);
    }
    if (exclude instanceof RegExp) {
      return !exclude.test(path);
    }
    // Webpack supports more overloads: https://webpack.js.org/configuration/module#condition
    // ignore for now
    // console.log(exclude);
    return false;
  }

  static updateRuleForOcular(rule, ocularOptions) {
    // const {WEBPACK_EXCLUDE_REGEXP, WEBPACK_INCLUDE_REGEXP} = ocularOptions;

    // Uncomment to restrict to babel loaders only
    // const isBabelLoader = WebpackRule.isBabelLoader(rule);

    const excludeNeedsReplace =
      WebpackRule.checkIfExcludes(rule, `node_modules/${MODULE_NAME}/`);
      // && (!WEBPACK_EXCLUDE_REGEXP || WebpackRule.checkIfIncludes(rule, WEBPACK_EXCLUDE_REGEXP));

    if (excludeNeedsReplace) {
      rule.exclude = WebpackRule.getExcludeOverride(rule, ocularOptions);
      log.log({priority: 1, color: COLOR.RED}, `Replaced excludes for webpack rule ${WebpackRule.getLoader(rule)}`);
    }
  }

  static getExcludeOverride(rule, ocularOptions = {}) {
    const {exclude} = rule;
    // console.log('replacing exclude', rule);
    return function excludeOverride(path) {
      // NOTE: site-query is included!!! but STILL DOES NOT WORK
      // if (/site-query/.test(path)) {
      //   console.log('site-query filtered');
      // }
      const isExcluded = typeof exclude === 'function' ? exclude(path) : exclude.test(path);
      if (isExcluded && /.*\.css$/.test(path)) {
        log.log(4, 'Prevented exclusion of css', path);
        return false;
      }
      const ModuleRegEx = new RegExp(MODULE_NAME);
      if (isExcluded && ModuleRegEx.test(path)) {
        log.log(4, `Prevented exclusion of ocular gatsby ${path}`);
        return false;
      }
      if (isExcluded && /examples/.test(path)) {
        log.log(4, `Prevented exclusion of example ${path}`);
        return false;
      }

      const {WEBPACK_EXCLUDE_REGEXP, WEBPACK_INCLUDE_REGEXP} = ocularOptions;
      if (!isExcluded && WEBPACK_INCLUDE_REGEXP && WEBPACK_INCLUDE_REGEXP.test(path)) {
        log.log(3, 'Webpack loaders will include file', path);
        return true;
      }
      if (!isExcluded && WEBPACK_EXCLUDE_REGEXP && WEBPACK_EXCLUDE_REGEXP.test(path)) {
        log.log(3, 'Enforced webpack will exclude file', path);
        return true;
      }
      return isExcluded;
    }
  }
}

function getWebpackConfigOverrides(config, newConfig, ocularOptions) {
  // eslint-disable-next-line no-restricted-syntax
  for (const rule of config.module.rules) {
    WebpackRule.updateRuleForOcular(rule, ocularOptions);
  }

  // nulling out `fs` avoids issues with certain node modules getting bundled,
  // e.g. headless-gl gets bundled by luma.gl if installed in root folder
  newConfig.node = newConfig.node || {};
  newConfig.node.fs = 'empty';

  newConfig.module = config.module || {};;
  newConfig.module.rules = config.module.rules;

  const aliases = ocularOptions.WEBPACK_ALIAS || (ocularOptions.webpack && ocularOptions.webpack.resolve && ocularOptions.webpack.resolve.alias);
  Object.assign(newConfig.resolve.alias, aliases);

  return newConfig;
}

// Looks like onCreateWebpackConfig does not receive theme options?
function onCreateWebpackConfig(opts, ocularOptions = global.ocularOptions) {
  const {
    stage,     // build stage: ‘develop’, ‘develop-html’, ‘build-javascript’, or ‘build-html’
    // rules,     // Object (map): set of preconfigured webpack config rules
    // loaders,   // Object (map): set of preconfigured webpack config loaders
    // plugins,    // Object (map): A set of preconfigured webpack config plugins
    actions,
    getConfig // Function that returns the current webpack config
  } = opts;

  const config = getConfig();

  const newConfig = getWebpackConfigOverrides(config, config, ocularOptions);

  // NOTE: actions.setWebpackConfig MERGES in the new config, actions.replaceWebpackConfig SETS it
  actions.replaceWebpackConfig(newConfig);

  logWebpackConfig(stage, newConfig);
}

// Makes JSON.stringify print regexps
function stringify(key, value) {
  if (value instanceof RegExp) {
    return value.toString();
  }
  if (value instanceof Function) {
    return '[function]';
  }

  // Prune webpack config dump
  switch (key) {
    case 'schemaString':
      if (log.priority < 5) {
        return '...logLevel<5...';
      }
      break;
    case 'options':
      if (log.priority < 4) {
        return '...logLevel<4...';
      }
      break;
    case 'use':
      if (log.priority < 3) {
        return '...logLevel<3...';
      }
      break;
    default:
  }
  return value;
}

function logWebpackConfig(stage, config) {
  if (log.priority >= 2) {
    log.log(
      {color: COLOR.MAGENTA, priority: 3},
      `STAGE ${stage}: webpack config: ${JSON.stringify(config, stringify, 2)}`
    )();
  } else {
    log.log(
      {color: COLOR.CYAN, priority: 1},
      `STAGE ${stage}: Webpack started with aliases ${JSON.stringify(config.WEBPACK_ALIAS || {}, stringify, 2)}`
    )();
  }
}

module.exports = onCreateWebpackConfig;

// TODO - remove exports or move to separate files...
module.exports.logWebpackConfig = logWebpackConfig;
module.exports.getWebpackConfigOverrides = getWebpackConfigOverrides;
