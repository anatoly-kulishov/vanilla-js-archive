// 1: [test].split('').reverse() // tset
// 2: [...arg].reverse()

const reverseString = (s) => {
	let a_pointer = 0;
	let b_pointer = s.length - 1;

	while (a_pointer <= b_pointer) {
		let temp = s[a_pointer];

		s[a_pointer] = s[b_pointer];
		s[b_pointer] = temp;

		a_pointer++;
		b_pointer--;
	}

	return s;
};

// const reverseString = (s) => {};

console.log(reverseString(['h', 'e', 'l', 'l', 'o'])) // ['o', 'l', 'l', 'e', 'h']
console.log(reverseString(['H', 'a', 'n', 'n', 'a', 'h'])) // ['h', 'a', 'n', 'n', 'a', 'H']
