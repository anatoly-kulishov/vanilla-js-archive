const testCase = require("../../Helper/testCase");

const plusOne = (digits) => {
  let digitsCopy = digits.reverse();
  let one = 1;
  let i = 0;

  while (one) {
    if (i < digits.length) {
      if (digitsCopy[i] === 9) {
        digitsCopy[i] = 0;
      } else {
        digitsCopy[i] += 1;
        one = 0;
      }
    } else {
      digitsCopy.push(1);
      one = 0;
    }
    i++;
  }

  return digitsCopy.reverse();
};

testCase(plusOne([1, 2, 3]), [1, 2, 4], true);
testCase(plusOne([4, 3, 2, 1]), [4, 3, 2, 2]);
testCase(plusOne([9, 9]), [1, 0, 0]);
testCase(plusOne([9]), [1, 0]);