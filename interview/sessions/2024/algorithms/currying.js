function currying(fn, ...args) {
  return (...nextArgs) => {
    const allArgs = [...args, ...nextArgs];

    if (allArgs.length >= fn.length) {
      return fn(...allArgs);
    } else {
      return currying(fn, ...allArgs);
    }
  };
}

let curriedSum = (a, b, c) => a + b + c;

let res = currying(curriedSum);

console.log(res(1, 2)(3)); // 6
console.log(res(1)(2, 3)); // 6
