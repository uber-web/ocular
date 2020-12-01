"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.it = it;
exports.expect = expect;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var test = require('tape');

var _require = require('./tape-assertions'),
    tapeEquals = _require.tapeEquals,
    tapeEqualsEpsilon = _require.tapeEqualsEpsilon;

var TestCase = function () {
  function TestCase(t, result) {
    (0, _classCallCheck2.default)(this, TestCase);
    this.t = t;
    this.result = result;
  }

  (0, _createClass2.default)(TestCase, [{
    key: "toBe",
    value: function toBe(value) {
      this.t.equals(value);
    }
  }, {
    key: "toEqual",
    value: function toEqual(value) {
      tapeEquals(this.t, this.result, value);
    }
  }, {
    key: "toEqualEpsilon",
    value: function toEqualEpsilon(value, epsilon) {
      tapeEqualsEpsilon(this.t, this.result, value, epsilon);
    }
  }, {
    key: "toThrow",
    value: function toThrow() {
      var _this = this;

      this.t.throws(function () {
        return _this.result();
      });
    }
  }]);
  return TestCase;
}();

var currentTest;

function it(message, testfunc) {
  test(message, function (t) {
    currentTest = t;
    testfunc();
    t.end();
  });
}

function expect(value) {
  return new TestCase(currentTest, value);
}
//# sourceMappingURL=expect-assertions.js.map