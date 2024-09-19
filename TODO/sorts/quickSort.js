/**
 * Quick sort
 * O(n*log(n))
 */
const simpleArray = [1, 4, 5, 8, 5, 1, 2, 7, 5, 2, 11];

function quickSort(arr) {
  if (arr.length <= 1) return arr;

  let pivotIndex = Math.floor(arr.length / 2);
  let pivot = arr[pivotIndex];

  let less = [];
  let greater = [];

  for (let i = 0; i < arr.length; i++) {
    if (i === pivotIndex) continue;
    if (arr[i] < pivot) {
      less.push(arr[i]);
    } else {
      greater.push(arr[i]);
    }
  }

  return [...quickSort(less), pivot, ...quickSort(greater)];
}

console.log(quickSort(simpleArray)); // [1, 1, 2, 2, 4, 5, 5, 5, 7, 8, 11]

