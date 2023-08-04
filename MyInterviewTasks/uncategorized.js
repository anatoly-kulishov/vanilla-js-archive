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
// lex. env: {
//   env record: {inner variable, this}
//   outer: link on outer lex. env
// }
/** ************************************************************************ */
/** Output: 1(i,b) = 2 {j: 1}, 2(i,b) = 2 {j: 1, k: 1}, i = 3 */
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
/** Output: clear.a = null, a = { b:2 }, a.b = 2 */
// var a = {};
//
// function clear(a) {
//   a.b = 2;
//   a = null;
//
//   console.log(a); // null
// }
//
// clear(a);
//
// console.log(a); // { b: 2 }
// console.log(a.b); // 2
