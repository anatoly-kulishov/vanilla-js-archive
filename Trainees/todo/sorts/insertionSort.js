/**
 * Insertion sort
 * O(n^2)
 */
const simpleArray = [1, 4, 5, 8, 5, 1, 2, 7, 5, 2, 11];
let n = 0;

const insertionSort = (arr) => {
  const newArr = arr;

  for (let i = 1; i < newArr.length; i++) {
    let j = i - 1;
    const temp = arr[i];

    while (j >= 0 && newArr[j] > temp) {
      arr[j + 1] = arr[j];
      n += 1;
      j--;
    }
    arr[j + 1] = temp;
  }

  return newArr;
};

console.log(insertionSort(simpleArray));
console.log(`n = ${n}`);
