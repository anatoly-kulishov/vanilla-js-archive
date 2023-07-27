/**
 * Сначала мы сортируем исходный массив arr по возрастанию.
 * Затем проходим по массиву и объединяем непрерывные диапазоны в строки.
 * Если текущее число arr[i] следует за предыдущим числом end + 1, то они образуют непрерывный диапазон.
 * В этом случае, обновляем переменную end с текущим значением arr[i].
 * Если текущее число не образует непрерывный диапазон, то добавляем предыдущий диапазон (если он есть) в результат и обновляем значения переменных start и end на текущее число arr[i].
 * В конце, если есть только одно число (start === end), добавляем его в результат.
 */

function findRanges(arr) {
  if (!Array.isArray(arr)) {
    return "";
  }

  arr.sort((a, b) => a - b);

  let result = "";
  let start = arr[0];
  let end = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === end + 1) {
      end = arr[i];
    } else {
      if (start === end) {
        result += start + ",";
      } else {
        result += start + "-" + end + ",";
      }
      start = arr[i];
      end = arr[i];
    }
  }

  if (start === end) {
    result += start;
  } else {
    result += start + "-" + end;
  }

  return result;
}

const numbers = [0, 12, 15, 13, 2, 5, 1, 3, 7];
const result = findRanges(numbers);
console.log(result); // Output: '0-3,5,7,12-13,15'
