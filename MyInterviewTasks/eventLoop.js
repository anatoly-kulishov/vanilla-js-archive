/**
 * #1 (async/await)
 * Hint: [start, 1, 2, end, 3]
 */
// const timeout = ms => new Promise(resolve => {
//   setTimeout(() => {
//     console.log('2')
//     resolve()
//   }, ms)
// });
//
// console.log('start')
//
// async function foo() {
//   console.log('1')
//   await timeout(0);
//   console.log('3')
// }
//
// foo();
// console.log('end')

// Output: ???
/**
 * #2 (no name)
 * Hint: [10, 35, 35, 40]
 */
// let a = 10;
// setTimeout(function timeout() {
//   console.log(a); //
//   a = 30;
// }, 0);
//
// let p = new Promise(function(resolve, reject) {
//   console.log(a); //
//   a = 35;
//   resolve();
// });
//
// p.then(function(){
//   console.log(a); //
//   a = 40
// });
//
// console.log(a); //

// Output: ???
/**
 * #3 (no name)
 * Hint: [1, 6, 5, 2, name, 4, 3]
 */
// console.log(1);
//
// const p = Promise.resolve(() => {
//   console.log(2);
//
//   setTimeout(() => console.log(3));
// });
//
// let z = new Promise(() => console.log(6));
//
// setTimeout(() => console.log(4));
//
// p.then((res) => {
//   res();
//   console.log("name");
// });
//
// console.log(5);

// Output: ???
/**
 * #4 (no name)
 * Hint: [1, 2, 1, 1, 1∞...]
 */
// function a() {
//   console.log("1");
//   Promise.resolve().then(a);
// }
//
// function b() {
//   console.log("2");
//   setTimeout(b);
// }
//
// a();
// b();

// Output: ???
/**
 * #5 (no name)
 * Hint: [1, 2, 1, 2]
 */
// Promise.resolve()
//   .then(() => console.log(1))
//   .then(() => console.log(1));
// Promise.resolve()
//   .then(() => console.log(2))
//   .then(() => console.log(2));

// Output: ???
