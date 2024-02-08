/**
 * A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.
 * Given a string s, return true if it is a palindrome, or false otherwise.
 *
 * 1 <= s.length <= 2 * 105
 * s consists only of printable ASCII characters.
 */

const testCase = require("../../../../Helpers/testCase");

// const isPalindrome = (x) => {
//   return x.toString() === x.toString().split('').reverse().join('');
// };

/**
 * @param {string} s
 * @return {boolean}
 */
const isPalindrome = (s) => {
    let str = s.toLowerCase().replace(/[^a-z0-9]/gi, '');
    let reversedStr = '';
    const n = str.length - 1;

    for (let i = n; i >= 0; i--) {
        const current = str[i];
        reversedStr += current;
    }

    return reversedStr === str;
}

testCase(isPalindrome("A man, a plan, a canal: Panama"), true, true);
testCase(isPalindrome("race a car"), false);
testCase(isPalindrome("a."), true);
testCase(isPalindrome("ab"), false);
testCase(isPalindrome(" "), true);
