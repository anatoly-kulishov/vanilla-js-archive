const testCase = require("../../../../Helpers/testCase");

const isPalindrome = (x) => {
    return x.toString() === x.toString().split('').reverse().join('');
};

testCase(isPalindrome(121), true, true);
testCase(isPalindrome(-121), false);
testCase(isPalindrome(10), false);
