const testCase = require('#shared/testCase');

const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);
const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);

module.exports = { pipe, compose };

const addOne = (x) => x + 1;
const double = (x) => x * 2;

testCase(pipe(addOne, double)(3), 8, true);
testCase(compose(double, addOne)(3), 8);
