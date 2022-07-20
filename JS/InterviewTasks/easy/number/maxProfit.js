/**
 * You are given an array prices where prices[i] is the price of a given stock on the ith day.
 * You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
 * Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.
 *
 * 1 <= prices.length <= 105
 * 0 <= prices[i] <= 104
 */

const testCase = require("../../../Helper/testCase");

/**
 * @param prices
 * @returns {number}
 */
let maxProfit = (prices) => {
    let minPrice = prices[0];
    let maxProfit = 0;

    for (let i = 1; i < prices.length; i++) {
        const current = prices[i];

        if (current < minPrice) {
            minPrice = current;
        }

        if (current - minPrice > maxProfit) {
            maxProfit = current - minPrice;
        }
    }

    return maxProfit;
};


testCase(maxProfit([7, 1, 5, 3, 6, 5]), 5, true);
testCase(maxProfit([7, 6, 4, 3, 1]), 0);