const testCase = require("../../Helper/testCase");

let maxProfit2 = (prices) => {
  let result = 0;

  for (let i = 0; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      result += prices[i] - prices[i - 1];
    }
  }

  return result;
};


testCase(maxProfit2([7, 1, 5, 3, 6, 4]), 7, true);
testCase(maxProfit2([7, 6, 4, 3, 1]), 0);