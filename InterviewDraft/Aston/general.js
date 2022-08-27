function doSmth() {
	return Promise.resolve("123");
}

doSmth()
	.then(function (a) {
		console.log("1", a); // 123
		return a;
	})
	.then(function (b) {
		console.log("2", b); // 123
		return Promise.reject("321");
	})
	.catch(function (err) {
		console.log("3", err); // 321
		return '321'
	})
	.then(function (c) {
		console.log("4", c); // 321
		return c;
	});

/*******************************************************/

let promise = new Promise((resolve, reject) => {
	resolve("a");
});

promise
	.then((res) => {
    const value = res + "b";
    console.log("1 = " + value); // ab
    return value;
	})
	.then((res) => {
    const value = res + "c";
    console.log("2 = " + value); // abc
		return value;
	})
	.finally((res) => {
    const value = res + "!!!!!!!";
    console.log("3 = " + value); // undefined!!!!!!!
		return value;
	})
	.catch((res) => {
    console.log(res); // Will not be executed
    return res + "d";
	})
	.then((res) => {
    console.log("5 = " + res); // abc
	});

/*******************************************************/

console.log(1);

setTimeout(function () {
	console.log(2);
	Promise.resolve('7').then(console.log);
});


Promise.resolve('3').then(console.log);

console.log(4);

setTimeout(function () {
	console.log(5);
}, 0);

console.log(6);

// Result: 1 4 6 3 2 7 5

/*******************************************************/

var a = 500;

const obj = {
	a: 10,
	getF() {
		console.log("F", this.a); // 10

		function getF2() {
			console.log("F2", this.a); // undefined
		}

		getF3 = () => {
			console.log("F3", this.a); // 10
		};

		getF2();
		getF3();
	},

	getF4: () => {
		console.log("F4", this.a); // undefined
	},

	getF5() {
		console.log("F5", this.a); // 10
	},
};

obj.getF();
obj.getF4();
obj.getF5();