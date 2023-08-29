/** Output: [ReferenceError: Cannot access 'a' before initialization] */
// let a = a + 1;
// console.log(a);
/** **************************************************** */
/** Output: [ReferenceError: Cannot access 'a' before initialization */
// function foo(a) {
//   if (a > 0) {
//     let a = a + 10;
//     return a;
//   }
//   return a;
// }
//
// console.log(foo(15));
/** **************************************************** */
/** Output: [x is not defined] */
// function giveMeX(showX) {
//   if (showX) {
//     let x = 5;
//   }
//   return x;
// }
//
// console.log(giveMeX(false));
// console.log(giveMeX(true));
