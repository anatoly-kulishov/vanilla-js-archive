// const p = new Promise((resolve) => {
//     console.log(4)
//     setTimeout(() => {
//         console.log(7)
//         resolve()
//     }, 0)
// })
//
// p.then(() => console.log(5))
//
// console.log(6)

/** **************************************************************************************************************** **/

// var f = function () {
//     this.x = 5;
//     (function () {
//         this.x = 3
//     })();
//     console.log('1:', this.x)
// }
//
// var obj = {
//     x: 4,
//     m: function () {
//         console.log('2:', this.x)
//     }
// }
//
// f(); //
// new f(); //
// obj.m(); //
// new obj.m(); //
// f.call(f); //
// obj.m.call(f); //

/** **************************************************************************************************************** **/

/**
 * Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.
 *
 * n == nums.length
 * 1 <= n <= 104
 * 0 <= nums[i] <= n
 * All the numbers of nums are unique.
 */

// const missingNumber = (nums) => {
//     // Code here...
// };
//
// console.log(missingNumber([3, 0, 1])); // 2
// console.log(missingNumber([0, 1]), 2); // 2
// console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]), 8); // 8

/** **************************************************************************************************************** **/

/**
 * Given an integer x, return true if x is palindrome integer.
 * An integer is a palindrome when it reads the same backward as forward.
 * For example, 121 is a palindrome while 123 is not.
 *
 * -231 <= x <= 231 - 1
 */

// const isPalindrome = (x) => {
//     // Code here...
// };
//
// console.log(isPalindrome(121)); // true
// console.log(isPalindrome(-121)); // false
// console.log(isPalindrome(10)); // false

/** **************************************************************************************************************** **/

// function rle(str) {
//     // Code here...
// }
//
// console.log(rle('AABBBCCXYZ')); // 'A2B3C2XYZ'
// console.log(rle('AAAABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBBbbb')); // 'A10B31C2XYZD4E3F3b3'
// console.log(rle('AABcDDDeFgggg')); // 'A2BcD3eFg4'

/** **************************************************************************************************************** **/

// function reverseOnlyLetters(str) {
//     // Code here...
// }
//
// console.log(reverseOnlyLetters('a-bc')); // "c-ba"
// console.log(reverseOnlyLetters('a-bC-dEf-ghIj')); // "j-Ih-gfE-dCba"
// console.log(reverseOnlyLetters('Test1ng-Leet=code-Q!')); // "Qedo1ct-eeLg=ntse-T!"

/** **************************************************************************************************************** **/

// function removeSymbolDuplicates(str) {
//     // Code here...
// }
//
// console.log(removeSymbolDuplicates('abcd')); // 'abcd'
// console.log(removeSymbolDuplicates('aabbccdd')); // 'abcd'
// console.log(removeSymbolDuplicates('abcddbca')); //'abcd'
// console.log(removeSymbolDuplicates('abababcdcdcd')); //'abcd'

/** **************************************************************************************************************** **/

// let maxRepeating = (str) => {
//     // Code here...
// };
//
// console.log(maxRepeating("geeekk")); // 'e'
// console.log(maxRepeating("aaaabbcbbb")); // 'a'

/** **************************************************************************************************************** **/

// const classNames = [
//     'header', 'menu', 'menu-item', 'menu-item', 'menu-item', 'footer', 'menu', 'link', 'link', 'link', 'link'
// ];
//
// const filterClassNames = (classNames) => {
//     // Code here...
// };
//
// console.log(filterClassNames(classNames)); // ['link', 'menu-item', 'menu', 'header', 'footer']

/** **************************************************************************************************************** **/

// const intersect = (nums1, nums2) => {
//     // Code here...
// };
//
// console.log(intersect([1, 2, 2, 1], [2, 2])); // [2, 2]
// console.log(intersect([4, 9, 5], [9, 4, 9, 8, 4])); // [9, 4]

/** **************************************************************************************************************** **/

// const luckySeven = (arr) => {
//     // Code here...
// }
//
// console.log(luckySeven([1, 2, 3, 22, 2, 3, 2, 69, 5])); // true
// console.log(luckySeven([1, 2, 3])); // false
// console.log(luckySeven([7])); // false
// console.log(luckySeven([])); // false

/** **************************************************************************************************************** **/

// const removeDuplicates = (nums) => {
//     // Code here...
// }
//
// console.log(removeDuplicates([0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 3, 3, 4])) // 5
// console.log(removeDuplicates([1, 1, 2]), 2); // 2
// console.log(removeDuplicates([1, 1]), 1); // 1
// console.log(removeDuplicates([]), 0); // 0

/** **************************************************************************************************************** **/

// const sumArray = (arr) => {
//     // Code here...
// }
//
// console.log(sumArray([[25, 25], [5, 5, 9]])); // 69
// console.log(sumArray([[1, 1], [2], [3]])); // 7
// console.log(sumArray([[1], [1], []])); // 2