const removeDuplicates = (nums) => {
  const res = [];
  const doubles = [];

  for (el of nums) {
    if (!res.includes(el)) {
      res.push(el);
    } else {
      doubles.push('_');
    }
  }

  return {
    count: doubles.length + 1,
    nums: [...res, ...doubles]
  };
};

console.log(removeDuplicates([1, 1, 2])) // { count: 2, nums: [ 1, 2, '_' ] }
console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4])) // { count: 6, nums: [0, 1, 2, 3, 4, '_', '_', '_', '_', '_']}