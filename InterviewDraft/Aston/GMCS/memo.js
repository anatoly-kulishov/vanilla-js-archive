function makeMemo(fn) {
  const cache = {};

  return function memoized(...args) {
    const key = JSON.stringify(args);

    if (cache[key] === undefined) {
      cache[key] = fn(...args);
    }

    return cache[key];
  };
}

function sum(a, b, c) {
  console.log("sum()");
  return a + b + c;
}

const memoSum = makeMemo(sum);

// ожидание: sum выведется только после первого вызова и последнего
console.log(memoSum(1, 2, 3)); // sum, 6
console.log(memoSum(1, 2, 3)); // 6
console.log(memoSum(1, 2, 3)); // 6
console.log(memoSum(1, 2, 5)); // sum, 8

/** ************************************************************************ */
function makeMemo2(fn) {
  const cache = {};

  return function memoized(...args) {

    if (cache[args]) {
      return cache[args]; // {'1.2.3'}
    }

    return cache[args] = fn(...args);
  };
}

const memoSum2 = makeMemo2(sum);

// ожидание: sum выведется только после первого вызова и последнего
console.log(memoSum2(1, 2, 3)); // sum, 6
console.log(memoSum2(1, 2, 3)); // 6
console.log(memoSum2(1, 2, 3)); // 6
console.log(memoSum2(1, 2, 5)); // sum, 8
