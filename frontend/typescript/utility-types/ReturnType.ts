/**
 * ReturnType<Type>
 * Released: 2.8
 *
 * Constructs a type consisting of the return type of function Type.
 */

type T0 = ReturnType<() => string>;

function f1(): T0 {
	return "String"
}
