/** Output: [1(i,b) = 2 {j: 1}, 2(i,b) = 2 {j: 1, k: 1}, i = 3] */
// var i = 1;
// var b = {};
//
// (function() {
//   i++;
//   b.j = 1;
// })();
//
// console.log(i, b); //
//
// (function(i, b) {
//   i++;
//   b.k = 1;
//   console.log(i); //
// })(i, b);
//
// console.log(i, b); //
/** ************************************************************************ */
/** Output: [foo: undefined] */
// let foo = 1;
//
// (function f() {
//   console.log(foo);
//
//   if (foo) {
//     var foo = 2;
//   }
//
//   console.log(foo);
// })();
