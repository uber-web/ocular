const fs = require('fs');
const altPath = process.argv[2];

let executablePath = getExecutablePath();

if (!executablePath && altPath) {
  executablePath = getExecutablePath(altPath);
}

console.log(executablePath);

function getExecutablePath(dir) {
  try {
    const puppeteer = require(dir ? `${dir}/node_modules/puppeteer` : 'puppeteer')
    const executablePath = puppeteer.executablePath();
    if (fs.existsSync(executablePath)) {
      return executablePath;
    }
  } catch (err) {
    // ignore
  }
  return null;
}
