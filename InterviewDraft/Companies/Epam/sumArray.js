const testCase = require("../../../Helpers/testCase");

const sumArray = (arr) => {
  let result = 0;

  for (let i = 0; i < arr.length; i++) {
    const currentArr = arr[i];

    const sum = currentArr.reduce((acc, curr) => {
      return acc + curr;
    }, 0);

    result += sum;
  }

  return result;
}

testCase(sumArray([[25, 25], [5, 5, 9]]), 69, true);
testCase(sumArray([[1, 1], [2], [3]]), 7);
testCase(sumArray([[1], [1], []]), 2);
