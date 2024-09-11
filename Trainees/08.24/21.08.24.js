// console.log(5)
// Promise.resolve(1)
//     .then(() => console.log(2))
//     .then(console.log(3))
//     .then(() => console.log(4))
// console.log(6)

/** **************************************************************************************************************** **/

// Promise.resolve(1)
//     .then(() => console.log(2))
//     .then(console.log(3))
//     .then(() => console.log(4))
//
// Promise.resolve(1)
//     .then(() => console.log(200))
//     .then(console.log)
//     .then(() => console.log(400))

/** **************************************************************************************************************** **/

// console.log('start')
//
// async function foo() {
//     console.log(1)
//     await console.log(2)
//     console.log(3)
//     await console.log(4)
//     console.log(5)
// }
//
// foo()
//
// console.log('end')

/** **************************************************************************************************************** **/

// var f = function () {
//     this.x = 5;
//     (function () {
//         this.x = 3
//     })();
//     console.log('1:', this.x)
// }
//
// var obj = {
//     x: 4,
//     m: function () {
//         console.log('2:', this.x)
//     }
// }
//
// f();
// new f();
// obj.m();
// new obj.m();
// f.call(f);
// obj.m.call(f);

/** **************************************************************************************************************** **/

// let value = 100
//
// function worker() {
//     value = 10
//     return;
//     function value() {}
// }
//
// worker()
//
// console.log(value) //

/** **************************************************************************************************************** **/

// import React from "react";
//
// const PleaseReviewMe = () => {
//     const [count, setCount] = React.useState(1);
//     const [items, setItems] = React.useState(() => [{id: 1}]);
//
//     React.useEffect(() => {
//         document.addEventListener("click", setInterval(() => console.log(count), 1000));
//     }, []);
//
//     const click = React.useCallback(() => {
//         setCount(count + 1);
//         setItems([...items, {id: count + 1}]);
//     }, [items, count])
//
//     return (
//         <React.Fragment>
//             <h2>Count: {count}</h2>
//             <ul>
//                 {items.map((item) => (
//                     <li>{item.id}</li>
//                 ))}
//             </ul>
//             <button onClick={() => click()}>add one</button>
//         </React.Fragment>
//     );
// };
//
// export default PleaseReviewMe;

/** **************************************************************************************************************** **/

// import heavyComputations from './util'
//
// const [data, setData] = useState(heavyComputations(props.basedOn)) // heavy computation

// useMemo для 2-й загрузки и последующих
// Асинхронные вычисления с помощью useEffect
// web-worker
// lazy Suspense
// React.memo
// virtualization(IntersectionObserver), pagination
// деление на чанки метода (Promise, setTimeout) основной способ
// Предварительная обработка данных на сервере

/** **************************************************************************************************************** **/

// чистые функций, хок(фун-и высшего порядка), фу-и первого класса(FE), композиция,
// каррирование, частичное применение, рекурсия, замыкание

/** **************************************************************************************************************** **/

// infer
// type guards(typeof, in, instanceOf, is)
// utility types: Omit, Pick, Record etc.
// Exclude vs Omit, declare, type vs interface

// let arr: any = [1, 2, 4, 5, [1, 2], [4, 5, [3, 2, [5, 6], 4], 6]];

// interface Animal { name: string; age: number; }
// function a(obj: any, ...) {}
// a({name: 'alex', age: 2}, 'name', 'age')

/** **************************************************************************************************************** **/

/** countVowels */
// console.log('привет'); // 2

/** unique value */
// console.log(AAAAbbbbcccee332); // 'Abce32'

/** sort by number in the string */
// console.log(['app4le', 'melon2', 'b5anana']); // [ 'melon2', 'app4le', 'b5anana' ]

/** **************************************************************************************************************** **/

/** (Array.prototype.filter) */
// Array.prototype.myFilter = function(callback) {
//    // Code here...
// };

/** **************************************************************************************************************** **/

/** (Promise.all) */
// function myPromiseAll(promises) {
//    // Code here...
// }

/** **************************************************************************************************************** **/

/** (Promise.race) */
// function myPromiseRace(promises) {
//     // Code here...
// }

/** **************************************************************************************************************** **/

// const compare = (obj, first, second) => {
//     // Code here...
// };
//
// const o = {
//     f: {
//         s: "second"
//     },
//     t: {
//         f: {
//             x: "second"
//         }
//     }
// };
//
// console.log(compare(o, "f.s", "t.f.x")); // Output: true


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

// const twoSum = (nums, target) => {
//     // Code here...
// };
//
// console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
// console.log(twoSum([3, 2, 4], 6)); // 1, 2]
// console.log(twoSum([3, 3], 6)); // [0, 1]

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

// function flattenLoop(list) {
//    // Code here...
// }

// console.log(flatten([1, 'any [complex] string', null, function () {}, [1, 2, [3, '4'], 0], [], {a: 1}])); // [1, 'any [complex] string', null, function () {}, 1, 2, 3, '4', 0, {a: 1}]
// console.log(flatten([0, [1, [2, 3]], 4])); // [0, 1, 2, 3, 4]
// console.log(flatten([[1, 5]])); // [1, 5]