/* eslint-disable import/no-extraneous-dependencies */
const getWebpackConfig = require('ocular-dev-tools/config/webpack.config');

module.exports = (env = {}) => {
  const config = getWebpackConfig(env);

  // Make any changes to default config here

  // Uncomment to debug config
  // console.log(JSON.stringify(config, null, 2));

  return [config];
};

/*

const COMMON_CONFIG = {
  mode: "development",

  entry: {
    app: "./app.js"
  },

  output: {
    library: "App"
  },

  module: {
    rules: [
      {
        // Transpile ES6 to ES5 with babel
        // Remove if your app does not use JSX or you don't need to support old browsers
        test: /\.js$/,
        loader: "babel-loader",
        exclude: [/node_modules/],
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }
      }
    ]
  }
};

function addDevConfig(config, env) {
  // config = require('../webpack.config.local')(config)(env);
  return config;
}

function addProdConfig(config) {
  config.plugins = config.plugins || [];

  return Object.assign(config, {
    mode: "production"
  });
}

module.exports = env => {
  env = env || {};

  let config = COMMON_CONFIG;

  if (env.local) {
    config = addDevConfig(config, env);
  }

  if (env.prod) {
    config = addProdConfig(config);
  }

  // Enable to debug config
  // console.warn(JSON.stringify(config, null, 2));

  return config;
};
*/
