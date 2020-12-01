import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";

var test = require('tape');

var _require = require('./tape-assertions'),
    tapeEquals = _require.tapeEquals,
    tapeEqualsEpsilon = _require.tapeEqualsEpsilon;

var TestCase = function () {
  function TestCase(t, result) {
    _classCallCheck(this, TestCase);

    this.t = t;
    this.result = result;
  }

  _createClass(TestCase, [{
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
export function it(message, testfunc) {
  test(message, function (t) {
    currentTest = t;
    testfunc();
    t.end();
  });
}
export function expect(value) {
  return new TestCase(currentTest, value);
}
//# sourceMappingURL=expect-assertions.js.map