// var value = 10;
//
// let worker = function() {
//     console.log("Первое значение: " + value); //
//     var value = 20;
//     console.log("Второе значение: " + value); //
// };
//
// worker();
// console.log("Третье значение: " + value); //

/** **************************************************************************************************************** **/

// let a = '42';
// let b = new String(42);

// console.log(a == b) //
// console.log(a === b) //

/** **************************************************************************************************************** **/

// console.log(NaN + 1 + null + 1); //
// console.log(NaN + 1 + null + 1 + ""); //
// console.log("" + NaN + 1 + null + 1 + ""); //

/** **************************************************************************************************************** **/

// console.log("number" + 15 + 3) //
// console.log(true + false) //
// console.log([] + null + 1) //
// console.log("foo" + +"bar") //
// console.log(!!"false" == !!"true") //
// console.log(null == '') //
// console.log([] == ![]) //

/** **************************************************************************************************************** **/

// var a = 5;
//
// setTimeout(function timeout() {
//     console.log(a); //
//     a = 10;
// }, 0);
//
// var p = new Promise(function(resolve, reject) {
//     console.log(a); //
//     a = 25;
//     resolve();
// });
//
// p.then(function(){
//     console.log(a)
//     a = 5
// });
//
// console.log(a); //

/** **************************************************************************************************************** **/

// let randomValue = { name: "Lydia" }
// randomValue = 23
//
// if (!typeof randomValue === "string") {
//     console.log("It's not a string!")
// } else {
//     console.log("Yay it's a string!")
// }