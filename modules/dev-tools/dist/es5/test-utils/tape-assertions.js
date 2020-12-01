"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tapeEquals = tapeEquals;
exports.tapeEqualsEpsilon = tapeEqualsEpsilon;

var _require = require('math.gl'),
    equals = _require.equals,
    _withEpsilon = _require._withEpsilon;

function tapeEquals(t, a, b, msg, extra) {
  var valid = false;

  if (a.equals) {
    valid = a.equals(b);
  } else if (b.equals) {
    valid = b.equals(a);
  } else {
    valid = equals(a, b);
  }

  t._assert(valid, {
    message: msg || 'should be equal',
    operator: 'equal',
    actual: a,
    expected: b,
    extra: extra
  });
}

function tapeEqualsEpsilon(t, a, b, epsilon, msg, extra) {
  return _withEpsilon(epsilon, function () {
    return tapeEquals(t, a, b, msg, extra);
  });
}
//# sourceMappingURL=tape-assertions.js.map