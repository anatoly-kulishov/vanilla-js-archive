const testCase = require("../../../Helpers/testCase");

/**
 * @param a
 * @param b
 * @returns {any}
 */
function add(a, b) {
  if (!a) {
    return add
  }
  if (!b) {
    return function calc(c) {
      if (!c) return calc
      return a + c
    }
  }

  return a + b;
}

testCase(add(20, 22), 42, true);
testCase(add(20)(22), 42);
testCase(add(20)()(22), 42);
testCase(add(20)()()()(22), 42);
testCase(add(20)()()()()()()()()()()()(22), 42);
testCase(add()(20)(22), 42);
testCase(add()()()()(20)(22), 42);
testCase(add()(20)()(22), 42);
testCase(add()()()()()(20)()()()(22), 42);