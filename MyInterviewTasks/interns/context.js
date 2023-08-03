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
//   console.log(c); // ???
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
//     console.log("F", this.a); // ???
//
//     function getF2() {
//       console.log("F2", this.a); // ???
//     }
//
//     getF3 = () => {
//       console.log("F3", this.a); // ???
//     };
//
//     getF2();
//     getF3();
//   },
//
//   getF4: () => {
//     console.log("F4", this.a); // ???
//   },
//
//   getF5() {
//     console.log("F5", this.a); // ???
//   }
// };
//
// obj.getF();
// obj.getF4();
// obj.getF5();

