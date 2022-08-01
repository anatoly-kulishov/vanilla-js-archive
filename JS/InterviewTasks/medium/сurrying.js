const testCase = require("../../Helpers/testCase");

function sum(a) {
  let currentSum = a;

  function f(b) {
    currentSum += b;
    return f;
  }

  f.valueOf = function () {
    return currentSum;
  };

  return f;
}

testCase(+sum(3)(2), 5, true); // We can use +
testCase(sum(1)(5)(10).valueOf(), 16); // Or can use special method .valueOf() for example.