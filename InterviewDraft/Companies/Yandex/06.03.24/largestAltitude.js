const testCase = require("../../../../Helpers/testCase");

let largestAltitude = function(gain) {
    let result = [0];

    for(let i = 0; i < gain.length; i++) {
        let temp = result[i] + gain[i]
        result.push(temp)
    }

    return Math.max(...result)
};


testCase(largestAltitude([-5, 1, 5, 0, -7]), 1, true)
testCase(largestAltitude([-4, -3, -2, -1, 4, 3, 2]), 0)
