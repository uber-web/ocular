// this makes Node.js understand import/export,
// but otherwise does not transpile your code.
require('reify');

// start to import tests
require('./utils/example-registry.spec.js');
require('./utils/validate-config.js');
