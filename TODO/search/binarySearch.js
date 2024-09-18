 /**
 * Binary search
 * O(log n)
 */
const simpleArray = [1, 4, 5, 8, 5, 1, 2, 7, 5, 2, 11]; // [1, 2, 2, 4, 5, 5, 7, 9, 11]
let n1 = 0;

const binarySearch = (arr, target) => {
  let start = 0;
  let end = arr.length;

  let position = -1;
  let found = false;

  while (found === false && start <= end) {
    n1 += 1;
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

console.log(binarySearch(simpleArray, 11)); // 10
console.log(`(n) = ${n1}`);

/** **************************************************************************************************************** **/

let n2 = 0;

const recursiveBinarySearch = (arr, item, start, end) => {
  let middle = Math.floor((start + end) / 2);
  n2 += 1;
  if (item === arr[middle]) {
    return middle;
  }
  if (item < arr[middle]) {
    return recursiveBinarySearch(arr, item, 0, middle - 1);
  } else {
    return recursiveBinarySearch(arr, item, middle + 1, end);
  }
};

console.log(recursiveBinarySearch(simpleArray, 11, 0, simpleArray.length)); // 10
console.log(`(n) = ${n2}`);
