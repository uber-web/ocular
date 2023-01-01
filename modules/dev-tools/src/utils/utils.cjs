const fs = require('fs');

function getValidPath(...resolveOrder) {
  for (const path of resolveOrder) {
    if (fs.existsSync(path)) {
      return path;
    }
  }
  return null;
}

module.exports = {
  getValidPath
};
