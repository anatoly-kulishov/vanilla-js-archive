/**
 * Bubble sort
 * O(n^2)
 */
const simpleArray = [1, 4, 5, 8, 5, 1, 2, 7, 5, 2, 11];
let n = 0;

const bubbleSort = (arr) => {
  let swapped = false;

  for (let i = 0; i < arr.length; i++) {
    swapped = false;

    for (let j = 0; j < arr.length - 1; j++) {
      n += 1;
      if (arr[j] > arr[j + 1]) {
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
        swapped = true;
      }
    }

    if(!swapped) {
      break;
    }
  }

  return arr;
};

console.log(bubbleSort(simpleArray));
console.log(`n = ${n}`);
