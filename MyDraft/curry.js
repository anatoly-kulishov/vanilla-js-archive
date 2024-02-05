function sum(a, b, c) {
    return a + b + c;
}

function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }

        return curried.bind(this, ...args);
    }
}

curridSum = curry(sum)

console.log(curridSum(2)(3)(4)) // 9
console.log(curridSum(2, 3)(4)) // 9
console.log(curridSum(2, 3, 4)) // 9
