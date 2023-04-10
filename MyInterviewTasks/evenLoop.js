/**
 * #1
 */
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

// Result: ? ? ? ? ? ?

/**
 * #2
 */
function doSmth() {
	return Promise.resolve("123");
}

doSmth()
	.then(function (a) {
		console.log("1", a); // ???
		return a;
	})
	.then(function (b) {
		console.log("2", b); // ???
		return Promise.reject("321");
	})
	.catch(function (err) {
		console.log("3", err); // ???
		return '321'
	})
	.then(function (c) {
		console.log("4", c); // ???
		return c;
	});

/**
 * #3
 */
let promise = new Promise((resolve) => {
    setTimeout(() => resolve("a"), 0)
});

promise
    .then((res) => {
        const value = res + "b";
        console.log("1 = " + value); // ???
        return value;
    })
    .then((res) => {
        const value = res + "c";
        console.log("2 = " + value); // ???
        return value;
    })
    .finally((res) => { 	// .finally isn't having props
        const value = res + "!!!!!!!";
        console.log("3 = " + value); // ???
        return value;
    })
    .catch((res) => {
        console.log(res); // ???
        return res + "d";
    })
    .then((res) => {
        console.log("5 = " + res); // ???
    });
