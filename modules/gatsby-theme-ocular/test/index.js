// this makes Node.js understand import/export,
// but otherwise does not transpile your code.
require('reify');

// start to import tests
require('./utils/validate-config.spec.js');
require('./utils/parse-markdown.spec.js');
require('./utils/get-ocular-options.spec.js');
