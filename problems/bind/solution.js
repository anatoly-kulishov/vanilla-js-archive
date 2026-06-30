const testCase = require('#shared/testCase');

function myBind(fn, context, ...boundArgs) {
	return (...args) => fn.call(context, ...boundArgs, ...args);
}

function plus(x, y) {
	return x + y;
}

module.exports = { myBind };

const plusFour = myBind(plus, null, 4);
testCase(plusFour(4), 8, true);
testCase(plusFour(6), 10);
