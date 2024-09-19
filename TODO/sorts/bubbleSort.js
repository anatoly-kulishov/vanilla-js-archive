/**
 * Bubble sort
 * O(n^2)
 */
const simpleArray = [1, 4, 5, 8, 5, 1, 2, 7, 5, 2, 11];

const bubbleSort = (arr) => {
  const shallowCopyArray = Array.from(arr);
  let swapped = false;

  for (let i = 0; i < shallowCopyArray.length; i++) {
    swapped = false;

    for (let j = 0; j < shallowCopyArray.length - 1; j++) {
      if (shallowCopyArray[j] > shallowCopyArray[j + 1]) {
        const temp = shallowCopyArray[j + 1];
        shallowCopyArray[j + 1] = shallowCopyArray[j];
        shallowCopyArray[j] = temp;
        swapped = true;
      }
    }

    if(!swapped) {
      break;
    }
  }

  return shallowCopyArray;
};

console.log(bubbleSort(simpleArray)); // [1, 1, 2, 2, 4, 5, 5, 5, 7, 8, 11]
