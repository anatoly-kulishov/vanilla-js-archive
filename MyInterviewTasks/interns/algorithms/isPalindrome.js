// 1) return str === str.split('').reverse().join(''); // O(3*n) = O(n)
// 2) function isPalindrome(str) {
//   let reversedStr = "";
//
//   for (let i = str.length - 1; i >= 0; i--) {
//     const current = str[i];
//     reversedStr += current;
//   }
//
//   return reversedStr === str;
// }

function isPalindrome(str) {}

console.log(isPalindrome("radar")); // true (палиндром)
console.log(isPalindrome("hello")); // false (не палиндром)
console.log(isPalindrome("level")); // true (палиндром)
