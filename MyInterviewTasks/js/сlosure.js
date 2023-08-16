/** Output: [-2, -2] */
// var i = 10;
// var result = [];
//
// while (i--) {
//     result.push(() => {
//         return i + i
//     })
// }
//
// console.log(
//     result[0](), // ???
//     result[1]() // ???
// );
/** **************************************************** */
/** Output: c = 1 */
// var c = 1;
//
// function a(func) {
//   var c = 2;
//
//   func();
// }
//
// function b() {
//   console.log(c); //
// }
//
// a(b);
/** **************************************************** */
/** wrapper: 3,  showValue: 2 */
// let value = 2;
//
// function showValue() {
//   console.log(`showValue ${value}`); //
// }
//
// function wrapper() {
//   let value = 3;
//   console.log(`wrapper ${value}`); //
//   showValue();
// }
//
// wrapper();
/** ************************************************************************ */
/** Output: clear.a = null, a = { b:2 }, a.b = 2 */
// var a = {};
//
// function clear(a) {
//   a.b = 2;
//   a = null;
//
//   console.log(a); //
// }
//
// clear(a);
//
// console.log(a); //
// console.log(a.b); //
/** ************************************************************************ */
/** Output: baz.bar = 2 */
// let foo = {
//   bar: 1,
// }
//
// const baz = foo;
//
// foo.bar = 2
//
// foo = {
//   bar: 3
// }
//
// console.log (baz.bar); //
/** ************************************************************************ */
/**
 *  let count = 0;
 *  return () => {
 *    return count += 1;
 *  }
 */
function x() {
  // применив замыкание решить задачу
}

const func = x();

console.log(func()); // 1
console.log(func()); // 2
console.log(func()); // 3
console.log(func()); // 4
