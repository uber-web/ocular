const fs = require('fs');

const altPath = process.argv[2];

let executablePath = getExecutablePath();

if (!executablePath && altPath) {
  executablePath = getExecutablePath(altPath);
}

console.log(executablePath);

function getExecutablePath(dir) {
  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const puppeteer = require(dir ? `${dir}/node_modules/puppeteer` : 'puppeteer');
    const path = puppeteer.executablePath();
    if (fs.existsSync(path)) {
      return path;
    }
  } catch (err) {
    // ignore
  }
  return null;
}
