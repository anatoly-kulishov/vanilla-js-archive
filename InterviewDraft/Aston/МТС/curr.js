function curr(fn, ...args) {
  return function(...newArgs) {
    // if (newArgs.length === 0) {
    //   return fn(...args);
    // } else {
    //   return curr(fn, ...args, ...newArgs);
    // }
  };
}

const sum = (a) => a + a;

const res = curr(sum);

console.log(res(1)(2)(3)()); // Output: 6
