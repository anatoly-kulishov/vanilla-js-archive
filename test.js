// Приходит массив цифр (arr) и число (total)
// Написать функцию, которая вернет массив с первой парой чисел, сумма которых ровна total

// const firstSum = (arr, total) => {
//     arr.sort((a, b) => a - b); // Сортируем массив
//
//     let left = 0;
//     let right = arr.length - 1;
//
//     while (left < right) {
//         const sum = arr[left] + arr[right];
//
//         if (sum === total) {
//             return [arr[left], arr[right]]; // Возвращаем пару
//         } else if (sum < total) {
//             left++; // Сдвигаем левый указатель вправо
//         } else {
//             right--; // Сдвигаем правый указатель влево
//         }
//     }
//
//     return null; // Если пара не найдена, возвращаем null
// }
//
// console.log(firstSum([8, 3, 3, 4, 9, 6, 7, 1, 5], 13)) // [8, 5]

/** **************************************************************************************************************** **/

// function flatten(list) {
//     const res = [];
//
//     for (let i = 0; i < list.length; i++) {
//         const curr = list[i];
//
//         if (Array.isArray(curr)) {
//             const flat = flatten(curr);
//
//             for (let j = 0; j < flat.length; j++) {
//                 res.push(flat[j]);
//             }
//         } else {
//             res.push(curr);
//         }
//
//     }
//
//     return res;
// }

// function flattenLoop(list) {
//     const stack = [...list];
//     const res = [];
//
//     while (stack.length) {
//         const next = stack.pop();
//
//         if (Array.isArray(next)) {
//             stack.push(...next);
//         } else {
//             res.push(next);
//         }
//     }
//
//     return res.reverse();
// }

/** **************************************************************************************************************** **/

// const debounce = (callback, delay) => {
//     let timeoutId
//
//     return (...args) => {
//         clearTimeout(timeoutId);
//         timeoutId = setTimeout(() => {
//             timeoutId = null
//             callback(...args)
//         }, delay)
//     }
// }

/** **************************************************************************************************************** **/

/** (Array.prototype.map) */
// Array.prototype.myMap = function(callback) {
//     const newArray = [];
//
//     for (let i = 0; i < this.length; i++) {
//         // Вызываем переданную функцию обратного вызова для текущего элемента массива
//         // и добавляем результат в новый массив
//         newArray.push(callback(this[i], i, this));
//     }
//
//     return newArray;
// };
/** (Array.prototype.some) */
// Array.prototype.mySome = function(callback) {
//     for (let i = 0; i < this.length; i++) {
//         if (callback(this[i], i, this)) {
//             return true; // Возвращаем true, если элемент удовлетворяет условию
//         }
//     }
//
//     return false; // Если ни один элемент не удовлетворяет условию, возвращаем false
// };
/** (Array.prototype.filter) */
// Array.prototype.myFilter = function(callback) {
//     const filteredArray = [];
//
//     for (let i = 0; i < this.length; i++) {
//         if (callback(this[i], i, this)) {
//             filteredArray.push(this[i]); // Добавляем элемент в новый массив, если он удовлетворяет условию
//         }
//     }
//
//     return filteredArray;
// };
/** (Promise.race) */
// function myPromiseRace(promises) {
//     // Возвращаем новый промис
//     return new Promise((resolve, reject) => {
//         // Функция обратного вызова для обработки успешного выполнения промиса
//         function handleResolve(result) {
//             resolve(result); // Возвращаем результат первого успешно выполненного промиса
//         }
//
//         // Функция обратного вызова для обработки отклонения промиса
//         function handleReject(error) {
//             reject(error); // Возвращаем ошибку первого отклоненного промиса
//         }
//
//         // Итерируемся по всем промисам и навешиваем обработчики на каждый из них
//         for (let i = 0; i < promises.length; i++) {
//             promises[i]
//                 .then(handleResolve)
//                 .catch(handleReject);
//         }
//
//         // Если массив промисов пустой, сразу отклоняем промис с ошибкой
//         if (promises.length === 0) {
//             reject(new Error("No promises provided"));
//         }
//     });
// }
/** (Array.prototype.reduce) */
// // Определяем метод reduce на прототипе Array
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
//     // Инициализируем аккумулятор и начальный индекс для итерации
//     let accumulator;
//     let startIndex;
//
//     // Если предоставлено начальное значение, используем его как аккумулятор и начинаем итерацию с начала массива
//     if (initialValue !== undefined) {
//         accumulator = initialValue;
//         startIndex = 0;
//     } else {
//         // Если начальное значение не предоставлено, используем первый элемент массива как аккумулятор и начинаем итерацию со второго элемента
//         accumulator = this[0];
//         startIndex = 1;
//     }
//
//     // Проходим по массиву, начиная с соответствующего индекса в зависимости от наличия начального значения
//     for (let i = startIndex; i < this.length; i++) {
//         // Проверяем, существует ли текущий индекс в массиве (для обработки разреженных массивов)
//         if (i in this) {
//             // Вызываем переданный колбэк с аккумулятором, текущим элементом, текущим индексом и исходным массивом
//             // Результат колбэка становится новым значением аккумулятора
//             accumulator = callback.call(undefined, accumulator, this[i], i, this);
//         }
//     }
//
//     // Возвращаем окончательное значение аккумулятора после процесса сокращения
//     return accumulator;
// };
/** (Promise.all) */
/**
 * function myPromiseAll(promises) {
 *
 *     return new Promise((resolve, reject) => {
 *         const res = []
 *
 *         promises.map((el) => {
 *             el.then((data) => { res.push(data.json()); })
 *                 .then(() => { if (promises.length === res.length) { resolve() } })
 *                 .catch((err) => { reject(err);})
 *         })
 *         return res
 *    })
 * }
 */
// function myPromiseAll(promises) {
//     // Возвращаем новый промис
//     return new Promise((resolve, reject) => {
//         const results = []; // Массив для хранения результатов промисов
//         let completedPromises = 0; // Счетчик завершенных промисов
//
//         // Функция обратного вызова, которая будет вызвана после выполнения каждого промиса
//         function handleResolve(result, index) {
//             results[index] = result; // Сохраняем результат промиса в массив
//             completedPromises++; // Увеличиваем счетчик завершенных промисов
//
//             // Проверяем, если все промисы завершены
//             if (completedPromises === promises.length) {
//                 resolve(results); // Возвращаем массив с результатами всех промисов
//             }
//         }
//
//         // Функция обратного вызова для обработки отклоненных промисов
//         function handleReject(error) {
//             reject(error); // Если хотя бы один промис отклоняется, возвращаем ошибку
//         }
//
//         // Итерируемся по всем промисам и навешиваем обработчики на каждый из них
//         for (let i = 0; i < promises.length; i++) {
//             promises[i]
//                 .then(result => handleResolve(result, i))
//                 .catch(handleReject);
//         }
//
//         // Если массив промисов пустой, сразу выполняем промис с пустым массивом результатов
//         if (promises.length === 0) {
//             resolve(results);
//         }
//     });
// }

/** **************************************************************************************************************** **/

// setTimeout(() => console.log('setTimeout'), 0);
//
// async function bar() {
//     console.log(10);
//     await Promise.resolve();
//     console.log(20);
//     return 30;
// }
//
// async function foo() {
//     console.log(40);
//     bar();
//     const data1 = await 'other';
//     console.log(data1);
//     await 50;
//     const data2 = await bar();
//     console.log(data2);
// }
//
// foo();
// console.log(60);

// 40 10 60 20 other 10 20 30 setTimeout

/** **************************************************************************************************************** **/

// Promise
//     .resolve()
//     .then(() => { console.log('a1'); })
//     .then(() => { console.log('a2'); })
//     .then(() => { console.log('a3'); });
//
// Promise
//     .resolve()
//     .then(() => { console.log('b1'); })
//     .then(() => { console.log('b2'); })
//     .then(() => { console.log('b3'); });

// a1 b1 a2 b2 a3 b3

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

// 1 2 6 3 4 5