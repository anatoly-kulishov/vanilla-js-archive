 /**
 * Binary search
 * O(log n)
 */
const simpleArray = [1, 2, 2, 4, 5, 5, 7, 9, 11];

const binarySearch = (arr, target) => {
  let start = 0;
  let end = arr.length;

  let position = -1;
  let found = false;

  while (found === false && start <= end) {
    const middle = Math.floor((start + end) / 2);

    if (arr[middle] === target) {
      found = true;
      position = middle;
    }
    if (target < arr[middle]) {
      end = middle - 1;
    } else {
      start = middle + 1;
    }
  }

  return position;
};

console.log(binarySearch(simpleArray, 11)); // 8

/** **************************************************************************************************************** **/

const recursiveBinarySearch = (arr, item, start, end) => {
  let middle = Math.floor((start + end) / 2);
  if (item === arr[middle]) {
    return middle;
  }
  if (item < arr[middle]) {
    return recursiveBinarySearch(arr, item, 0, middle - 1);
  } else {
    return recursiveBinarySearch(arr, item, middle + 1, end);
  }
};

console.log(recursiveBinarySearch(simpleArray, 11, 0, simpleArray.length)); // 8