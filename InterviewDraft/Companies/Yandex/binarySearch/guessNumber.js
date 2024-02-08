const testCase = require("../../../../Helpers/testCase");

/**
 * Forward declaration of guess API.
 * @return  -1 if num is higher than the picked number
 *           1 if num is lower than the picked number
 *           otherwise return 0
 * @param n
 * @param pn
 */
const guessNumber = (n, pn) => {
    let low = 1;
    let high = n;

    while (low <= high) {
        let mid = Math.ceil(low + (high - low) / 2);
        let res = guess(mid, pn);

        if (res === 0) return mid;
        else if (res < 0) high = mid - 1;
        else low = mid + 1;
    }

    return -1;
};

function guess(num, pn) {
    if (num === pn) {
        return 0;
    } else if (num < pn) {
        return 1;
    } else {
        return -1;
    }
}


testCase(guessNumber(10, 6), 6, true);
testCase(guessNumber(2, 1), 1);
testCase(guessNumber(1, 1), 1);
