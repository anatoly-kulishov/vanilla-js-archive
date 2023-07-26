// var c = 1;
//
// function a(func) {
//   var c = 2;
//
//   func();
// }
//
// function b() {
//   console.log(c); // 1
// }
//
// a(b);
/** ************************************************************************ */
// let a = 404;
// const obj = {
// 	a: 10,
// 	getF() {
// 		console.log("F", this.a); // 10
//
// 		function getF2() {
// 			console.log("F2", this.a); // undefined
// 		}
//
// 		getF3 = () => {
// 			console.log("F3", this.a); // 10
// 		};
//
// 		getF2();
// 		getF3();
// 	},
//
// 	getF4: () => {
// 		console.log("F4", this.a); // undefined
// 	},
//
// 	getF5() {
// 		console.log("F5", this.a); // 10
// 	},
// };
//
// obj.getF();
// obj.getF4();
// obj.getF5();

