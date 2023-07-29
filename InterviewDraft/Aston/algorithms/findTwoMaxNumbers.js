/**
 * Это решение выполняет всего один проход по массиву, используя две переменные для отслеживания двух максимальных элементов.
 * Если встречается элемент больше, чем текущий максимум (max1), то max1 присваивается это значение, а предыдущее значение max1 присваивается max2,
 * если оно отличается от текущего элемента и больше текущего max2.
 *
 * Таким образом, после прохода по массиву, в max1 и max2 будут храниться два максимальных элемента в правильном порядке.
 */
function findTwoMaxNumbers(arr) {
  let max1 = -Infinity;
  let max2 = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];

    if (num > max1) {
      max2 = max1;
      max1 = num;
    } else if (num > max2 && num !== max1) {
      max2 = num;
    }
  }

  return [max1, max2];
}

const numbers = [4, 12, 7, 32, 2, 1];
const [max1, max2] = findTwoMaxNumbers(numbers);
console.log(max1, max2); // Output: 32 12
