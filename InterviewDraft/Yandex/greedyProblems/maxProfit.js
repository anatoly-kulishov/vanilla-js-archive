const testCase = require("../../../Helpers/testCase");

/**
 * O(n)
 * @param prices
 * @returns {number}
 */
let maxProfit = (prices) => {
    let minPrice = prices[0];
    let maxProfit = 0;

    for (let i = 1; i < prices.length; i++) {
        const current = prices[i];
        if (minPrice > current) {
            minPrice = current;
        }
        if ((current - minPrice) > maxProfit) {
            maxProfit = current - minPrice;
        }
    }

    return maxProfit;
};


testCase(maxProfit([7, 1, 5, 3, 6, 5]), 5, true);
testCase(maxProfit([7, 6, 4, 3, 1]), 0);
