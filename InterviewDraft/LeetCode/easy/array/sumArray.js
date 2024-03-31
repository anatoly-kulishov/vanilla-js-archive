const testCase = require("../../../../Helpers/testCase");

const sumArray = (arr) => {
  const n = arr.length;
  let result = 0;

  for (let i = 0; i < n; i++) {
    const current = arr[i];

    const sum = current.reduce((acc, curr) => {
      return acc + curr;
    }, 0);

    result += sum;
  }

  return result;
}

testCase(sumArray([[25, 25], [5, 5, 9]]), 69, true);
testCase(sumArray([[1, 1], [2], [3]]), 7);
testCase(sumArray([[1], [1], []]), 2);
