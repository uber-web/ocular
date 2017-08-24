module.exports = dirPath => {

  try {
    return require(`${dirPath}/webpack.config.js`);
  } catch (e) {
    return {};
  }

};
