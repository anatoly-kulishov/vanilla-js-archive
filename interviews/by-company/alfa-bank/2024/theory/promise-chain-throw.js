/** Event loop: started with this task */
Promise.resolve(1)
	.then((x) => x + 1)
	.then((x) => {
		throw x;
	})
	.then((x) => console.log(x))
	.catch((err) => console.log(err))
	.then(() => Promise.resolve(1))
	.catch((err) => console.log(err))
	.then((x) => console.log(x));
