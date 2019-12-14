import test from 'tape-promise/tape';
import {tapeEquals, tapeEqualsEpsilon} from './tape-assertions';

class TestCase {
  constructor(t, result) {
    this.t = t;
    this.result = result;
  }
  toBe(value) {
    this.t.equals(this.result, value);
  }
  toEqual(value) {
    tapeEquals(this.t, this.result, value);
  }
  toEqualEpsilon(value, epsilon) {
    tapeEqualsEpsilon(this.t, this.result, value, epsilon);
  }
  toThrow() {
    this.t.throws(() => this.result());
  }
}

let currentTest;

export function it(message, testfunc) {
  test(message, t => {
    currentTest = t;
    testfunc();
    t.end();
  });
}

export function expect(value) {
  return new TestCase(currentTest, value);
}
