// const asyncFilter = async (arr, predicate) => {
//   const result = await Promise.all(arr.map((item) => predicate(item)));
//   return arr.filter((item, index) => result[index]);
// };

/**
 * Написать функцию с типизацией, которая принимает массив (скорее всего чисел) и асинхронный колбэк,
 * проверяет все элементы массива колбэком и возвращает массив удовлетворяющих этому результатов
 */
const asyncFilter = async (arr, predicate) => {}

const NUMBERS = [1, 2, 3, 4, 5];

const isEven = async (number) => {
  return number % 2 === 0;
};

async function runAsyncFilter() {
  const evenNumbers = await asyncFilter(NUMBERS, isEven);

  console.log(evenNumbers); //
}

runAsyncFilter();
