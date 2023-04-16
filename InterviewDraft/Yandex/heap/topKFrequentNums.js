/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const topKFrequent = function(nums, k) {
    const result = [];
    const map = {};

    for(let num of nums) {
        if(map[num] !== undefined) {
            map[num] += 1;
        } else {
            map[num] = 1;
        }
    }

    const sortedMap = Object.entries(map)
        .sort((a, b) =>  b[1] - a[1])

    for(let i = 0; k > i; i++) {
        result.push(sortedMap[i][0]);
    }

    return result;
};