const testCase = require("../../Helper/testCase");

const isPalindrome = (x) => {
  return x.toString() === x.toString().split('').reverse().join('');
};

// const isPalindrome = (x) => {
//   const len = x.length;
//   const mid = Math.floor(len / 2);
//
//   for (let i = 0; i < mid; i++) {
//     if (x[i] !== x[len - 1 - i]) {
//       return false;
//     }
//   }
//
//   return true;
// }

testCase(isPalindrome(121), true, true);
testCase(isPalindrome(-121), false);
testCase(isPalindrome(10), false);
