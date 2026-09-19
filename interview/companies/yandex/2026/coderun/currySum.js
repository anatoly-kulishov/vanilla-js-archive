function sum(a, b, c) {
    return a + b + c;
}

function curry(fn) {
    // collectArgs — именованная функция, чтобы вызывать себя изнутри
    return function collectArgs(...args) {
        // fn.length = сколько аргументов ждёт fn (у sum = 3)
        if (args.length >= fn.length) {
            return fn(...args);
        }

        // мало аргументов → вернуть функцию и ждать ещё
        // curry(sum)(1)(2) → args=[1], потом [1,2], потом [1,2,3] → sum
        return function (...nextArgs) {
            return collectArgs(...args, ...nextArgs);
        };
    };
}

console.log(curry(sum)(1, 2, 3)); // 6
console.log(curry(sum)(1, 2)(3)); // 6
console.log(curry(sum)(1)(2)(3)); // 6
