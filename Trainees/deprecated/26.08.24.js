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

// let firstUniqChar = (s) => {
//     // Code here...
// };
//
// console.log(firstUniqChar('leetcode')); // 0
// console.log(firstUniqChar('loveleetcode')); // 2
// console.log(firstUniqChar('aabb')); // -1

/** **************************************************************************************************************** **/

// function isStringRotated(source, test) {
//     // Code here...
// }
//
// console.log(isStringRotated('javascript', 'scriptjava')); // true
// console.log(isStringRotated('javascript', 'iptjavascr')); // true
// console.log(isStringRotated('javascript', 'java')); // false

/** **************************************************************************************************************** **/

// function isUnique(str) {
//     // Code here...
// }
//
// console.log(isUnique('123')); // true
// console.log(isUnique('123456')); // true
// console.log(isUnique('abcABC')); // true
// console.log(isUnique('1231')); // false

/** **************************************************************************************************************** **/

// const lengthOfLastWord = (s) => {
//     // Code here...
// };
//
// console.log(lengthOfLastWord('Hello World')); // 5
// console.log(lengthOfLastWord('   fly me   to   the moon  ')); // 4
// console.log(lengthOfLastWord('luffy is still joyboy')); // 6

/** **************************************************************************************************************** **/
/*
 * AFTER CHANGE
 * promise 1
 * MutationObserver
 * promise 0
 * promise 2
 * promise 6
 * promise 3
 * promise 5
* queueMicrotask
 * promise 4
 * timer
 * */

// const button = document.getElementById('button')
// const header = document.getElementById('header')
//
// let counter = 0
// button.addEventListener('click', ()=>{
//     Promise.resolve().then(()=>{
//         console.log('promise 1') //
//     })
//     counter +=1
//     header.innerText = counter.toString()
//     Promise.resolve().then(()=>{
//         console.log('promise 0')
//     })
//     console.log('AFTER CHANGE')
//     Promise.resolve().then(()=>{
//         console.log('promise 2')
//         Promise.resolve().then(()=>{
//             console.log('promise 3')
//             queueMicrotask(()=>{
//                 console.log('queueMicrotask')
//             })
//             Promise.resolve().then(()=>{
//                 console.log('promise 4')
//             })
//             console.log('promise 5')
//         })
//         console.log('promise 6')
//     })
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

////////////////////////////////////////////////////////////////////////////////////////////////////

// const a = 5
// const b = 10
//
// const func = (a,b) => {
//     return a + b
// }
//
// func(a,b)

////////////////////////////////////////////////////////////////////////////////////////////////////

// const f = new Promise
// {} vs f.then()

////////////////////////////////////////////////////////////////////////////////////////////////////

// const fetchFoo = fetch('https//...')
// const fetchBar = fetch('https//...')
// const fetchBaz = fetch('https//...')
//
// (async () => {
//     const start = performance.now()
//     const fooReady = fetchFoo()
//     const barReady = fetchBar()
//     const bazReady = fetchBaz()
//
//     const foo = await fooReady
//     const bar = await barReady
//     const baz = await bazReady
//
//     console.log(foo, bar, baz, perfomance.now() - start);
// })()
//
// (async () => {
//     const start = performance.now()
//
//     const foo = await fetchFoo()
//     const bar = await fetchBar()
//     const baz = await fetchBaz()
//
//     console.log(foo, bar, baz, perfomance.now() - start);
// })()

