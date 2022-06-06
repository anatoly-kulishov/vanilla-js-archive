const testCase = require("../../Helper/testCase");

const sum = (a) => {
  return (b) => {
    return a + b;
  }
}

const mul = (a) => {
  return (b) => {
    return a * b;
  }
}

const calculate = (cb) => {
    return (a) => {
      return (b) => {
        return cb(a, b)
      }
    }
}

testCase(calculate((sum) (3)(2)), 5, true);
testCase(calculate((mul) (3)(2)), 6);