/**
 * ThisParameterType<Type>
 * Released: 3.3
 *
 * Extracts the type of the "this: parameter for a function type, or unknown if the function type has no this parameter.
 */

function toHex(this: Number) {
	return this.toString(16);
}

function numberToString(n: ThisParameterType<typeof toHex>) {
	return toHex.apply(n);
}

console.log(numberToString(11)) // b
console.log(numberToString(12)) // c
console.log(numberToString(13)) // d
console.log(numberToString(14)) // e
console.log(numberToString(15)) // f