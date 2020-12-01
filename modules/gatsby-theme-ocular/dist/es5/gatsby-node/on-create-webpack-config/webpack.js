"use strict";

var _require = require('./on-create-webpack-config'),
    onCreateWebpackConfig = _require.onCreateWebpackConfig;

module.exports.onCreateWebpackConfig = function onCreateWebpackConfigOverride(opts) {
  onCreateWebpackConfig(opts);
  var stage = opts.stage,
      loaders = opts.loaders,
      actions = opts.actions;
  console.log("App rewriting gatsby webpack config");
  var newJSRule = loaders.js();
  Object.assign(newJSRule, {
    test: /\.jsx?$/,
    exclude: function exclude(modulePath) {
      return /node_modules/.test(modulePath) && !/node_modules\/(ocular|ocular-gatsby|gatsby-theme-ocular)/.test(modulePath);
    }
  });
  var rules = [newJSRule];

  if (stage === 'build-html') {
    rules.push({
      test: /mapbox-gl/,
      use: loaders.null()
    });
  }

  var newConfig = {
    module: {
      rules: rules
    },
    node: {
      fs: 'empty'
    }
  };
  actions.setWebpackConfig(newConfig);
};
//# sourceMappingURL=webpack.js.map