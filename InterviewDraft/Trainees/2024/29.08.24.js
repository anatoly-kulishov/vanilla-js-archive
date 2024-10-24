// Time: O(sort) = O(n log n)
// Memory: O(n + m)
// function mergeNotSortedArrays(nums1, nums2) {
//     // Code here
// }
//
// console.log(mergeNotSortedArrays([-2, 3, 3], [-5, 0])) // [-5, -2, 0, 3, 3]

/** **************************************************************************************************************** **/

/**
 * Есть строка вида a.b.c.d.e
 * Необходимо написать функцию, которая преобразует строку в объект вида
 * {
 *     "a": {
 *         "b": {
 *             "c": {
 *                 "d": {
 *                     "e": {}
 *                 }
 *             }
 *         }
 *     }
 * }
 */

// const strToObj = (str) => {
//    // Code here...
// }
//
// console.log(strToObj("a.b.c.d.e")); // {...}

/** **************************************************************************************************************** **/

// const classNames = [
//     'header', 'menu', 'menu-item', 'menu-item', 'menu-item', 'footer', 'menu', 'link', 'link', 'link', 'link'
// ];
//
// const filterClassNames = (classNames) => {
//     // Code here...
// };
//
// console.log(filterClassNames(classNames)); // ['link', 'menu-item', 'menu', 'header', 'footer']

/** **************************************************************************************************************** **/

// function makeMemo(fn) {
//     // Code here...
// }
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

// // Поиск файлов в IDE
// function search(term, str) {
//     // Code here...
// }
//
// console.log(search('el', 'crocodile')); // false
// console.log(search('le', 'crocodile')); // true
// console.log(search('ccd', 'crocodile')); // true
// console.log(search('ccod', 'crocoodile')); // true
// console.log(search('cdc', 'crocodile')); // false

/** **************************************************************************************************************** **/

// Дан многомерный массив нужно вернуть одномерный,
// где будут только уникальные нечетные числа, отсортированый по возрастанию

// const x = [3, 6, [1, 6], 4, [2], [9, [1, [2, 8, [3], 7], 4], 9, [4]]];
//
// const sortedArr = (arr) => {
//     // Code here...
// }
//
// console.log(sortedArr(x))

/** **************************************************************************************************************** **/

// const operations = [
//     {date: "2019-07-31", amount: "5422"},
//     {date: "2017-06-30", amount: "5220"},
//     {date: "2017-05-31", amount: "5365"},
//     {date: "2017-08-31", amount: "5451"},
//     {date: "2017-09-30", amount: "5303"},
//     {date: "2018-03-31", amount: "5654"},
//     {date: "2017-10-31", amount: "5509"},
//     {date: "2017-12-31", amount: "5567"},
//     {date: "2018-01-31", amount: "5597"},
//     {date: "2017-11-30", amount: "5359"},
//     {date: "2018-02-28", amount: "5082"},
//     {date: "2018-04-14", amount: "2567"}
// ]
//
// const sortOperations = (operations) => {
//     // Code here...
// }
//
// console.log(sortOperations(operations))

/** **************************************************************************************************************** **/

// Приходит массив цифр (arr) и число (total)
// Написать функцию, которая вернет массив с первой парой чисел, сумма которых ровна total

// const firstSum = (arr, total) => {
//     // Code here...
// }
//
// console.log(firstSum([8, 3, 3, 4, 9, 6, 7, 1, 5], 13)) // [8, 5]

/** **************************************************************************************************************** **/

// function flatten(list) {
//     // Code here...
// }

// console.log(flatten([[[1]], [[2, 3]], [[[[4]]]]])); // [1, 2, 3, 4]
// console.log(flatten([0, [1, 2], [[3, 4, [5, [6, 7]]]], 8, [[9], [10]]])); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

/** **************************************************************************************************************** **/

/** (Array.prototype.map) */
// Array.prototype.myMap = function(callback) {
//     // Code here...
// };
/** (Array.prototype.some) */
// Array.prototype.mySome = function(callback) {
//     // Code here...
// };
/** (Array.prototype.filter) */
// Array.prototype.myFilter = function(callback) {
//     // Code here...
// };
/** (Promise.race) */
// function myPromiseRace(promises) {
//     // Code here...
// }
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
//     // Code here...
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

/** **************************************************************************************************************** **/

// Promise.resolve(1)
//     .then(() => console.log('1:', 2))
//     .then(console.log('2:', 3))
//     .then(() => console.log('3:', 4))
//
// Promise.resolve(1)
//     .then(() => console.log('4:', 2))
//     .then(console.log)
//     .then(() => console.log('5:', 4))

/** **************************************************************************************************************** **/

// const button = document.getElementById('button')
// const header = document.getElementById('header')
//
// let counter = 0
//
// button.addEventListener('click', ()=>{
//     Promise.resolve().then(()=>{
//         console.log('promise 1') //
//     })
//
//     counter +=1
//
//     header.innerText = counter.toString()
//
//     Promise.resolve().then(()=>{
//         console.log('promise 0')
//     })
//
//     console.log('AFTER CHANGE')
//
//     Promise.resolve().then(()=>{
//         console.log('promise 2')
//
//         Promise.resolve().then(()=>{
//             console.log('promise 3')
//
//             queueMicrotask(()=>{
//                 console.log('queueMicrotask')
//             })
//
//             Promise.resolve().then(()=>{
//                 console.log('promise 4')
//             })
//
//             console.log('promise 5')
//         })
//
//         console.log('promise 6')
//     })
//
//     setTimeout(()=>{
//         console.log('timer')
//     }, 0)
// })
//
// const observer = new MutationObserver((mutations)=> {
//     console.log('MutationObserver')
// })
//
// observer.observe(header, {
//     subtree: true,
//     attributeOldValue: true,
//     childList: true
// })

/** **************************************************************************************************************** **/

// console.log(1);
//
// setTimeout(() => console.log(2));
//
// Promise.resolve().then(() => console.log(3));
//
// Promise.resolve().then(() => setTimeout(() => console.log(4)));
//
// Promise.resolve().then(() => console.log(5));
//
// setTimeout(() => console.log(6));
//
// console.log(7);
//
// Promise.resolve().then(console.log('123'))
//
// async function wait() {
//     console.log(8)
//     let prom = await new Promise(resolve => {
//         console.log(9)
//         setTimeout(resolve, 1000)
//     });
// }
//
// wait()