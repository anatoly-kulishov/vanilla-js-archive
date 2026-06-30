const testCase = require('#shared/testCase');

function deepCopy(value) {
	if (typeof value !== 'object' || value === null) {
		return value;
	}

	if (Array.isArray(value)) {
		return value.map((item) => deepCopy(item));
	}

	return Object.fromEntries(
		Object.entries(value).map(([key, item]) => [key, deepCopy(item)]),
	);
}

module.exports = { deepCopy };

testCase(deepCopy([{ a: { b: [{ c: 1 }] } }, [1, 2, 3]]), [{ a: { b: [{ c: 1 }] } }, [1, 2, 3]]);
testCase(deepCopy([[1, '2', null], undefined, true]), [[1, '2', null], undefined, true]);
testCase(deepCopy({ a: [{ b: [] }] }), { a: [{ b: [] }] });
testCase(deepCopy([{}, {}, {}]), [{}, {}, {}]);
