// class Customer {
//   constructor(name) {
//     this.name = name;
//   }
// }
//
// Customer.prototype.pay = function() {
//   console.log(`Чек от месье ${this.name}`);
// };
//
// const Ivan = new Customer("Ivan");
//
// Ivan.pay();
//
// delete Customer.prototype.pay;
//
// Ivan.pay();
/** **************************************************************************************************************** **/
// for (var i = 0; i < 5; i++) {
//     setTimeout(() => {
//         console.log('[Closure]', i + i + '' + i) //
//     }, i * 10);
// }
/** **************************************************************************************************************** **/
/**
 * Написать ф-ю поиска самого короткого слова
 */
// const findShort = (str) => {};
//
// console.log(findShort("smallest word is")); // is
/** **************************************************************************************************************** **/
// function cashFunction(fn) {
//     // Code here...
// }
//
// function factorial(n) {
//     let result = 1;
//     while (n !== 1) {
//         result *= n;
//         n -= 1;
//     }
//     return result;
// }
//
// const cashFactorial = cashFunction(factorial);
//
// cashFactorial(5);
// cashFactorial(4);
// cashFactorial(3);
// cashFactorial(4);
// cashFactorial(5);
// cashFactorial(1);
/** **************************************************************************************************************** **/
// const simpleArray = [1, 4, 5, 8, 5, 1, 2, 7, 5, 2, 11];
//
// const binarySearch = (arr, target) => {
//     // Code here...
// };
/** **************************************************************************************************************** **/
// function makeMemo(fn) {
//     // Code here...
// }
//
// function sum(a, b, c) {
//     console.log("sum()");
//     return a + b + c;
// }
//
// const memoSum = makeMemo(sum);
//
// // ожидание: sum выведется только после первого вызова и последнего
// console.log(memoSum(1, 2, 3)); // sum, 6
// console.log(memoSum(1, 2, 3)); // 6
// console.log(memoSum(1, 2, 3)); // 6
// console.log(memoSum(1, 2, 5)); // sum, 8
/** **************************************************************************************************************** **/
/**
 * REQUIREMENTS:
 *  1. Always deliver the lowest number of possible notes;
 *  2. It's possible to get the amount requested with available notes;
 *  3. The client balance is infinite;
 *  4. Amount of notes is infinite;
 *  5. Available notes 100, 50, 20 10
 */
// function isWantToGet(amountRequired) {
//     // Code here...
// }
//
// console.log(isWantToGet(365)); // [100, 100, 100, 50, 10]
// console.log(isWantToGet(160)); // [100, 50, 10]
// console.log(isWantToGet(0)); // []
/** **************************************************************************************************************** **/
/**
 * Есть строка “a b a b c c e d d d d”
 * Нужно вывести массив уникальных значений, который отсортирован по частоте включения в строке
 */
// function uniqueValues(str) {
//     // Code here...
// }

// console.log(uniqueValues("a b a b c c e d d d d")) // ['d', 'a', 'b', 'c', 'e']