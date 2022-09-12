/**
 * Parameters<Type>
 * Released: 3.1
 *
 * Constructs a tuple type from the types used in the parameters of a function type "Type".
 */
const myFunction = (a: string, b: string) => {
	return a + b;
}

type myType = Parameters<typeof myFunction>

let myArray:myType = [ 'a', 'b'];

console.log(myFunction(...myArray)) // ab
