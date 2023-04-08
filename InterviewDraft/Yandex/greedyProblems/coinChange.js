const testCase = require("../../../Helpers/testCase");

const coinChange = function (coins, amount) {
  let dp = Array.from({length: amount + 1}, () => amount + 1);
  dp[0] = 0;

  for (let a = 1; a <= amount; a++) {
    for (let c of coins) {
      if (a - c >= 0) {
        dp[a] = Math.min(dp[a], 1 + dp[a - c])
      }
    }
  }

  return (dp[amount] !== amount + 1) ? dp[amount] : -1;
};

testCase(coinChange([1, 2, 5], 11), 3, true);
testCase(coinChange([1, 3, 4, 5], 7), 2);
testCase(coinChange([2], 3), -1);
testCase(coinChange([1], 0), 0);
