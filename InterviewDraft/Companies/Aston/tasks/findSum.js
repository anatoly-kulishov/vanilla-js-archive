/** O(n) */
const findSum = (arr, num) => {
  const map = {};

  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];

    if (map[current] === undefined) {
      map[map - current] = current;
    } else {
      return [current, map[current]];
    }
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr.includes(num - arr[i])) {
      return [arr[i], num - arr[i]];
    }
  }

  return []
};

console.log(findSum([1, 2, 3], 4)); // [1, 3]
console.log(findSum([3], 6)); // []
console.log(findSum([], 6)); // []
/** ************************************************************************ */
/** O(n^2) */
// const findSum2 = (arr, num) => {
//   if (arr.length <= 1) {
//     return 0;
//   }
//
//   for (let i = 0; i < arr.length; i++) {
//     if (arr.includes(num - arr[i])) {
//       return [arr[i], num - arr[i]];
//     }
//   }
// };
//
// console.log(findSum2([1, 2, 3], 4)); // [1, 3]
/** ************************************************************************ */
/** O(n^2) */
// const findSum3 = (arr, num) => {
//   if (arr.length <= 1) {
//     return 0;
//   }
//
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = 1; j < arr.length; j++) {
//       const first = arr[i];
//       const second = arr[j];
//
//       if (first + second === num) {
//         return [first, second];
//       }
//     }
//   }
// };
//
// console.log(findSum3([1, 2, 3], 4)); // [1, 3]
