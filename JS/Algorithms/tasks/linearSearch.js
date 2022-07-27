/**
 * Linear search
 * O(n)
 * @param arr
 * @param item
 * @returns {*}
 */

const simpleArray = [1, 4, 5, 8, 5, 1, 2, 7, 5, 2, 11];
let n = 0;

const linearSearch = (arr, item) => {
  for (let i = 0; i < arr.length; i++) {
    n += 1;
    if (arr[i] === item) {
      return i;
    }
  }
  return null;
};

console.log("Result =", linearSearch(simpleArray, 11));
console.log(`n = ${n}`);
