/**
 * You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer.
 * The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's.
 * Increment the large integer by one and return the resulting array of digits.
 */

const testCase = require("../../../../Helpers/testCase");

const plusOne = (digits) => {
  let digitsCopy = digits.reverse();
  let len = digits.length;
  let one = 1;
  let i = 0;

  while (one) {
    if (i < len) {
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
