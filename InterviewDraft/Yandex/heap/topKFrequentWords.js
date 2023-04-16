/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
const topKFrequent = function(words, k) {
    const result = [];
    const map = {};

    for(let word of words) {
        if(map[word] !== undefined) {
            map[word] += 1;
        } else {
            map[word] = 1;
        }
    }

    const sortedMap = Object.entries(map)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .sort((a, b) =>  b[1] - a[1])

    for(let i = 0; k > i; i++) {
        result.push(sortedMap[i][0]);
    }

    return result;
};