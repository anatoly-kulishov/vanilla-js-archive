/**
 * @param x
 * @returns {boolean}
 */
const isPalindrome = (x) => {
  return x.toString() === x.toString().split('').reverse().join('');
};

console.log(isPalindrome(121)); // true
console.log(isPalindrome(-121)); // false
console.log(isPalindrome(10)); // false
