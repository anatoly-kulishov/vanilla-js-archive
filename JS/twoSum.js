/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = (nums, target) => {
  const hashtable = {};

  for (let i = 0; i < nums.length; i++) {
    let complement = target - nums[i];

    if (hashtable.hasOwnProperty(complement)) {
      return [hashtable[complement], i]
    }

    hashtable[nums[i]] = i;
  }

  return null;
};

console.log(twoSum([2, 7, 11, 15], 9)) // [0,1]
console.log(twoSum([3, 2, 4], 6)) // [1,2]
console.log(twoSum([3, 3], 6)) // [0,1]
