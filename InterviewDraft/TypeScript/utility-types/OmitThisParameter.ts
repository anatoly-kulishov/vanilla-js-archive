/**
 * OmitThisParameter<Type>
 * Released: 3.3
 *
 * Removes the "this" parameter from Type. If Type has no explicitly declared this parameter,
 * the result is simply Type. Otherwise, a new function type with no this parameter is created from Type.
 * Generics are erased and only the last overload signature is propagated into the new function type.
 */

function toHex(this: Number) {
	return this.toString(16);
}

const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);

console.log(fiveToHex()); // 5