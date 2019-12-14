const test = require('tape');

test.onFinish(window.browserTestDriver_finish);
test.onFailure(window.browserTestDriver_fail);

// This constant will be inlined by babel plugin.
// To test source without transpilation, set a fallback here.
// window.__VERSION__ = require('../lerna.json').version;

test('Browser tests', t => {
  // require('./modules');
  // require('./render');
  t.end();
});
