const testCase = require("../../../Helper/testCase");

/**
 * @param arr
 * @returns {boolean}
 */
const luckySeven = (arr) => {
    const luckyNumber = 7;
    const n = arr.length;

    if (n <= 1) return false;

    for (let i = 0; i < n - 3; i++) {
        const first = arr[i];
        const second = arr[i + 1];
        const third = arr[i + 2];

        if ((first + second + third) === luckyNumber) {
            return true
        }
    }

    return false;
}

testCase(luckySeven([1, 2, 3, 22, 2, 3, 2, 69, 5]), true);
testCase(luckySeven([1, 2, 3]), false);
testCase(luckySeven([7]), false);
testCase(luckySeven([]), false);