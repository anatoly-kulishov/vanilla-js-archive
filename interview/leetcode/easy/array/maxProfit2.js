/**
 * You are given an integer array prices where prices[i] is the price of a given stock on the ith day.
 * On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can buy it then immediately sell it on the same day.
 * Find and return the maximum profit you can achieve.
 *
 * 1 <= prices.length <= 3 * 104
 * 0 <= prices[i] <= 104
 */

const testCase = require("../../../../Helpers/testCase");

/**
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
