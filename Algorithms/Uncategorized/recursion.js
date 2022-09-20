// Factorial = n! = n * (n - 1) * (n - 2) * (n-3) * ... * 3 * 2 * 1 = n * (n -1)
// Example: 5! = 5 * 4 * 3 * 2 * 1 = 5 * 24 = 120

const factorial = (n) => {
  if (n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
};

// Fibonacci numbers - elements of a numerical sequence
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, …

const fibonachi = (n) => {
  if (n === 1 || n === 2) {
    return 1;
  }
  return fibonachi(n - 1) + fibonachi(n - 2);
};

console.log("factorial", factorial(5));
console.log("fibonachi", fibonachi(8));
