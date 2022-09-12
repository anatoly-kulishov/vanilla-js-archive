/**
 * Awaited<Type>
 * Released: 4.5
 *
 * This type is meant to model operations like await in async functions,
 * or the .then() method on Promises - specifically,
 * the way that they recursively unwrap Promises.
 */
type A = Awaited<Promise<string>>;

// @ts-ignore
const awaitedExample = new Promise<A>((resolve, reject) => {
	const random = Math.round(Math.random());
	if(random === 1) {
		resolve("resolve()");
	} else {
		reject("reject()");
	}
});

awaitedExample
	.then(() => console.log("then()"))
	.catch(() => console.log("catch()"))