/**
 * const a = 1; //  Cannot access 'a' before initialization
 * let b = 2; //  Cannot access 'b' before initialization
 * var c = 3; // undefined
 */
// console.log(a, b, c); // ? ? ?
//
// const a = 1;
// let b = 2;
// var c = 3;
/** **************************************************** */
/**
 * Output: [ReferenceError: Cannot access 'a' before initialization]
 * А если var? --> NaN
 */
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
