const testCase = require("../../Helper/testCase");
const fibonacci_memo = (function () {
  const sequence = [1, 1];

  return function (n) {
    console.log('Called with', n)
    if (sequence.length >= n) {
      console.log('No compute')
      return sequence.slice(0, n);
    }

    while (sequence.length < n) {
      const last = sequence[sequence.length - 1];
      const prev = sequence[sequence.length - 2];
      sequence.push(last + prev);
      console.log('Pushed:', last);
    }

    return sequence;
  }
})()

function fibonacci(n) {
  const sequence = [1, 1]

  if (n < 2) {
    return sequence.slice(0, n)
  }

  while (sequence.length < n) {
    const last = sequence[sequence.length - 1]
    const prev = sequence[sequence.length - 2]
    sequence.push(last + prev)
  }

  return sequence
}

testCase(fibonacci(8), [1, 1, 2, 3, 5, 8, 13, 21], true);
testCase(fibonacci(6), [1, 1, 2, 3, 5, 8]);
testCase(fibonacci(10), [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);