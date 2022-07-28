/**
 * Selection sort
 * O(n^2)
 * @param arr
 * @returns {*}
 */

const simpleArray = [1, 4, 5, 8, 5, 1, 2, 7, 5, 2, 11];
let n = 0;

const selectionSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let indexMin = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[indexMin]) {
        indexMin = j;
      }
      n += 1;
    }
    let temp = arr[i];
    arr[i] = arr[indexMin];
    arr[indexMin] = temp;
  }
  return arr;
};

console.log("Result =", selectionSort(simpleArray));
console.log(`n = ${n}`);
