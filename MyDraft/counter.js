function makeCounter() {
	let count = 0;
	return () => ++count;
}

const counter1 = makeCounter();
const counter2 = makeCounter();

counter1(); // 1
console.log(counter1()); // 2

counter2(); // 1
counter2(); // 2
console.log(counter2()); // 3

function makeNegativeCounter() {
	let count = 0;
	return () => --count;
}

const counter3 = makeNegativeCounter();
const counter4 = makeNegativeCounter();

counter3(); // -1
console.log(counter3()); // -2

counter4(); // -1
counter4(); // -2
console.log(counter4()); // -3
