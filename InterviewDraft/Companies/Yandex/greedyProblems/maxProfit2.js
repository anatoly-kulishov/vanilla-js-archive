const testCase = require("../../../../Helpers/testCase");

/**
 * O(n)
 * @param prices
 * @returns {number}
 */
let maxProfit2 = (prices) => {
    let result = 0;
    const n = prices.length;

    for (let i = 0; i < n; i++) {
        if (prices[i] > prices[i - 1]) {
            result += prices[i] - prices[i - 1];
        }
    }

    return result;
};


testCase(maxProfit2([7, 1, 5, 3, 6, 4]), 7, true);
testCase(maxProfit2([7, 6, 4, 3, 1]), 0);
