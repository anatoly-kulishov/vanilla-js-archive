/**
 * Given an integer x, return true if x is palindrome integer.
 * An integer is a palindrome when it reads the same backward as forward.
 * For example, 121 is a palindrome while 123 is not.
 *
 * -231 <= x <= 231 - 1
 */

const testCase = require("../../../../Helpers/testCase");

/**
 * @param {number} x
 * @return {boolean}
 */
const isPalindrome = (x) => {
    return x.toString() === x.toString().split('').reverse().join('');
};

testCase(isPalindrome(121), true, true);
testCase(isPalindrome(-121), false);
testCase(isPalindrome(10), false);
