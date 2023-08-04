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
/** ************************************************************************ */
/** Output: F = 10, F2 = undefined, F3 = 10, F4 = undefined, F5 = 10 */
// var a = 404;
//
// const obj = {
//   a: 10,
//   getF() {
//     console.log("F", this.a); //
//
//     function getF2() {
//       console.log("F2", this.a); //
//     }
//
//     getF3 = () => {
//       console.log("F3", this.a); //
//     };
//
//     getF2();
//     getF3();
//   },
//
//   getF4: () => {
//     console.log("F4", this.a); //
//   },
//
//   getF5() {
//     console.log("F5", this.a); //
//   }
// };

// obj.getF();
// obj.getF4();
// obj.getF5();
/** ************************************************************************ */
/** Output: foo = a, F2 = bar = window, c = window, a.foo = window */
// let a = {
//   foo: function() {
//     console.log(this) //
//   },
//   bar: () => {
//     console.log(this);
//   }
// }
//
// a.foo(); // a
// a.bar(); // window
//
// let c = a.foo;
//
// c(); // window
//
// const fn = (cb) => cb()
// fn(a.foo); // window
