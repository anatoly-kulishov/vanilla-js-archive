// Promise.myAll = function (promises) {
//     return new Promise((resolve, reject) => {
//         const results = []; // Массив для хранения результатов промисов
//         let completedPromises = 0; // Счетчик завершенных промисов
//
//         if (promises.length === 0) {
//             resolve(results);
//         }
//
//         for (let i = 0; i < promises.length; i++) {
//             promises[i]
//                 .then(result => {
//                     results[i] = result; // Сохраняем результат промиса в массив
//                     completedPromises++; // Увеличиваем счетчик завершенных промисов
//
//                     if (completedPromises === promises.length) {
//                         resolve(results);
//                     }
//                 })
//                 .catch(error => reject(error));
//         }
//     });
// }
//
// const x = Promise.myAll([
//     new Promise((r) => setTimeout(r, 100, 'Success 1')),
//     new Promise((r) => setTimeout(r, 1200, 'Success 2')),
//     new Promise((r) => setTimeout(r, 500, 'Success 3')),
// ])
//
// x
//     .then((res) => {
//         console.log('res', res)
//     })
//     .catch((err) => {
//         console.log('err', err)
//     })

/** **************************************************************************************************************** **/

/** (Array.prototype.reduce) */
// Array.prototype.myReduce = function(callback, initialValue) {
//     // Проверяем, является ли переданный колбэк действительно функцией
//     if (typeof callback !== "function") {
//         throw new TypeError("Колбэк должен быть функцией");
//     }
//
//     // Проверяем, является ли массив пустым, и нет ли начального значения
//     if (this.length === 0 && initialValue === undefined) {
//         throw new TypeError("Пустой массив без начального значения для reduce");
//     }
//
//     // Начальный аккумулятор и индекс
//     let accumulator = initialValue !== undefined ? initialValue : this[0];
//     let startIndex = initialValue !== undefined ? 0 : 1;
//
//     // Проходим по массиву и обновляем аккумулятор
//     for (let i = startIndex; i < this.length; i++) {
//         accumulator = callback(accumulator, this[i], i, this);
//     }
//
//     // Возвращаем итоговый результат
//     return accumulator;
// };

/** **************************************************************************************************************** **/

// const x = [4, 3, 7, 2, 6, 1, 5, 8, 9]
//
// // Отсортировать только нечетные
// function sortOddArr(arr) {
//     const oddSorted = arr
//         .filter(n => n % 2 !== 0)  // [3, 7, 1, 5, 9]
//         .sort((a, b) => a - b); // [1, 3, 5, 7, 9]
//
//     let oddIndex = 0;
//     return arr.map(n => n % 2 !== 0 ? oddSorted[oddIndex++] : n);
// }
//
// console.log(sortOddArr(x)) // [4, 1, 3, 2, 6, 5, 7, 8, 9]

/** **************************************************************************************************************** **/

// function foo() {
//     const x = 10;
//     return {
//         x: 20,
//         bar: () => {
//             console.log(this.x)
//         },
//         baz: function () {
//             console.log(this.x)
//         }
//     }
// }
//
// const obj1 = foo();
//
// obj1.bar(); // und
// obj1.baz(); // 20
//
// const obj2 = foo.call({x: 30})
//
// let y = obj2.bar; // 30
// let z = obj2.baz; // und
//
// y();
// z();
//
// obj2.bar(); // 30
// obj2.baz(); // 20

/** **************************************************************************************************************** **/

// function checkOrder() {
//     console.log('1');
//
//     async function asyncFn() {
//         console.log('2');
//         await Promise.resolve(null);
//         console.log('3');
//     }
//
//     asyncFn();
//
//     new Promise((resolve) => {
//         setTimeout(() => {
//             resolve();
//             console.log('4');
//         }, 0);
//     }).then(() => {
//         console.log('5');
//     });
//
//     console.log('6');
// }
//
// checkOrder();