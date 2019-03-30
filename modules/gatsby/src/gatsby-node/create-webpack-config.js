const {log, COLOR} = require('../utils/log');

// See
// https://github.com/gatsbyjs/gatsby/blob/master/docs/docs/add-custom-webpack-config.md#modifying-the-babel-loader
// https://github.com/gatsbyjs/gatsby/issues/3052

let hasRun = false;

module.exports = function onCreateWebpackConfig(opts) {
  if (hasRun) {
    return;
  }
  hasRun = true;
  
  const {ocularConfig} = global || {};

  const {
    stage,     // build stage: ‘develop’, ‘develop-html’, ‘build-javascript’, or ‘build-html’
    getConfig, // Function that returns the current webpack config
    rules,     // Object (map): set of preconfigured webpack config rules
    loaders,   // Object (map): set of preconfigured webpack config loaders
    plugins,    // Object (map): A set of preconfigured webpack config plugins
    actions
  } = opts;


  if (ocularConfig.webpack) {
    log.log({color: COLOR.CYAN}, `rewriting gatsby webpack config (using website config)`)();
    log.log({priority: 2, color: COLOR.MAGENTA},
      `Webpack options ${JSON.stringify(ocularConfig.webpack, null, 2)}`)();
  } else {
    log.log({color: COLOR.CYAN},
      `rewriting gatsby webpack config (no website webpack config supplied)`)();
  }


  let config = getConfig();

  // Recreate it with custom exclude filter
  const newJSRule = {
    // Called without any arguments, `loaders.js` will return an
    // object like:
    // {
    //   options: undefined,
    //   loader: '/path/to/node_modules/gatsby/dist/utils/babel-loader.js',
    // }
    // Unless you're replacing Babel with a different transpiler, you probably
    // want this so that Gatsby will apply its required Babel
    // presets/plugins.  This will also merge in your configuration from
    // `babel.config.js`.
    ...loaders.js(),

    // JS and JSX
    test: /\.jsx?$/,

    // Exclude all node_modules from transpilation, except for ocular
    exclude: modulePath =>
      /node_modules/.test(modulePath) &&
      !/node_modules\/(ocular|ocular-gatsby|gatsby-plugin-ocular)/.test(modulePath),
  };

  const newConfig = {
    module: {
      rules: [
        // Omit the default rule where test === '\.jsx?$'
        newJSRule
      ]
    }
  };

  // nulling out `fs` avoids issues with certain node modules getting bundled,
  // e.g. headless-gl gets bundled by luma.gl if installed in root folder
  newConfig.node = newConfig.node || {};
  newConfig.node.fs = 'empty';

  Object.assign(newConfig, ocularConfig.webpack);

  // Completely replace the webpack config for the current stage.
  // This can be dangerous and break Gatsby if certain configuration options are changed.
  // Generally only useful for cases where you need to handle config merging logic yourself,
  // in which case consider using webpack-merge.
  actions.setWebpackConfig(newConfig);

  log.log({color: COLOR.CYAN, priority: 2}, `Webpack delta config ${JSON.stringify(newConfig, null, 2)}`)();

  /* UNCOMMENT TO DEBUG THE CONFUG
  */
  config = getConfig();
  const jsRules = config.module.rules.filter(rule => String(rule.test) === String(/\.jsx?$/))
  const oldJSRule = jsRules[0];

  log.log({color: COLOR.CYAN, priority: 1},
    `Webpack started with aliases ${JSON.stringify(config.resolve.alias, null, 2)}`)();

  log.log({color: COLOR.MAGENTA, priority: 3},
    `Webpack config
rules ${JSON.stringify(jsRules[0])} => ${JSON.stringify(newJSRule)}
test ${oldJSRule.test} => ${newJSRule.test}
include ${oldJSRule.include} => ${newJSRule.include}
exclude ${oldJSRule.exclude} => ${newJSRule.exclude}`
  )();
}
