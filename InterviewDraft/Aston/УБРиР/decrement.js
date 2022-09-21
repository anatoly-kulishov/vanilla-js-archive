function decrement(a) {
	function f() {
		return a - 1;
	}
	return f;
}

console.log( decrement(3)());
