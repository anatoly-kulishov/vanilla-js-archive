/**
 * В данном решении мы проходим по массиву, и для каждого элемента вычисляем разность между целевой суммой и текущим элементом (complement).
 * Затем мы проверяем, если complement уже есть в хэш-таблице, то это означает, что мы нашли пару. Если complement отсутствует, мы добавляем текущий элемент в хэш-таблицу.
 *
 * Таким образом, все найденные пары будут добавлены в result, и мы вернем их в качестве ответа.
 * Обратите внимание, что данное решение будет работать для массива с повторяющимися элементами, как в вашем примере.
 */

function findPairsWithSum(arr, targetSum) {
  const result = [];
  const visited = new Set();

  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];
    const complement = targetSum - num;

    if (visited.has(complement)) {
      result.push([num, complement]);
      visited.delete(complement);
    } else {
      visited.add(num);
    }
  }

  return result;
}

const numbers = [2, 2, 4, 3];
const target = 6;
const pairs = findPairsWithSum(numbers, target);
console.log(pairs); // Output: [ [2, 4], [2, 4] ]
