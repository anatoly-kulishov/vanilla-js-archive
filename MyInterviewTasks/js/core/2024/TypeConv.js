/** Output: [NaN, "NaN", "NaN1null1"] */
console.log(NaN + 1 + null + 1); // NaN
console.log(NaN + 1 + null + 1 + ""); // "NaN"
console.log("" + NaN + 1 + null + 1 + ""); // "NaN1null1"

/** Output: ["number153", 1, null1, "fooNaN", true, false, true] */
console.log("number" + 15 + 3) //
console.log(true + false) //
console.log([] + null + 1) //
console.log("foo" + +"bar") //
console.log(!!"false" == !!"true") //
console.log(null == '') //
console.log([] == ![]) //