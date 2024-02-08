const testCase = require("../../../Helpers/testCase");
const luckyNumber = (arr, luckyNumber) => {
  if(arr.length <= 1) return false;

  for(let i = 0; i < arr.length - 2; i++) {
    const first = arr[i];
    const second = arr[i + 1];
    const third = arr[i + 2];

    if((first + second + third) === luckyNumber) {
      return true;
    }
  }

  return false;
}

testCase(luckyNumber([1, 2, 3, 22, 2, 3, 2, 69, 5], 7), true, true);
testCase(luckyNumber([1, 10, 17, 3, 3, 1], 7), true);
testCase(luckyNumber([1, 2, 3], 6), true);
testCase(luckyNumber([1, 2, 3], 7), false);
testCase(luckyNumber([7], 7), false);
testCase(luckyNumber([]), false);
