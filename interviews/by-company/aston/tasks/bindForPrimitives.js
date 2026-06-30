const myF = (num) => {
	console.log(this, num)
}

const test = myF.bind(4)(); // {} || "undefined"
