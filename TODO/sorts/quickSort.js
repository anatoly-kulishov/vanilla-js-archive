/**
 * Quick sort
 * O(n*log(n))
 */
const simpleArray = [1, 4, 5, 8, 5, 1, 2, 7, 5, 2, 11];
let n = 0;

function quickSort(arr) {
  if (arr.length <= 1) return arr;

  let pivotIndex = Math.floor(arr.length / 2);
  let pivot = arr[pivotIndex];

  let less = [];
  let greater = [];

  for (let i = 0; i < arr.length; i++) {
    n += 1;
    if (i === pivotIndex) continue;
    if (arr[i] < pivot) {
      less.push(arr[i]);
    } else {
      greater.push(arr[i]);
    }
  }

  return [...quickSort(less), pivot, ...quickSort(greater)];
}

console.log("Result =", quickSort(simpleArray));
console.log(`n = ${n}`);
