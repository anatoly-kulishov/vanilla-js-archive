/** Output: [a: 4, b: 2] */
// var a = 1;
// var b = 2;
//
// (function() {
//   var b = 3;
//   a += b;
// })();
//
// console.log(a); //
// console.log(b); //
/** **************************************************** */
/** Output: [undefined, 1, undefined, 1] */
// console.log(x); //
//
// var x = 1;
//
// console.log(x); //
//
// function car() {
//   if (false) {
//     var x = 2;
//   }
//   console.log(x); //
// }
//
// car();
// console.log(x); //
/** **************************************************** */
/** Output: [yes!] */
// function getClosure() {
//   var canYouSeeMe = "here I am";
//   return (function theClosure() {
//     return { canYouSeeIt: canYouSeeMe ? "yes!" : "no" };
//   });
// }
//
// var closure = getClosure();
// console.log(closure().canYouSeeIt); //
