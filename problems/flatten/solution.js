const testCase = require('#shared/testCase');

function flatten(list) {
	const stack = [...list];
	const result = [];

	while (stack.length > 0) {
		const next = stack.pop();

		if (Array.isArray(next)) {
			stack.push(...next);
		} else {
			result.push(next);
		}
	}

	return result.reverse();
}

module.exports = { flatten };

testCase(
	flatten([1, 'any [complex] string', null, function () {}, [1, 2, [3, '4'], 0], [], { a: 1 }]),
	[1, 'any [complex] string', null, function () {}, 1, 2, 3, '4', 0, { a: 1 }],
	true,
);
testCase(flatten([0, [1, [2, 3]], 4]), [0, 1, 2, 3, 4]);
testCase(flatten([[1, 5]]), [1, 5]);
