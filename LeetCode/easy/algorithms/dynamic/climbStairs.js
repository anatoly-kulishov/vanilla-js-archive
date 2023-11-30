const testCase = require("../../../../Helpers/testCase");

const climbStairs = (n) => {
    const memo = {};

    const count = function (k) {
        if (memo[k]) return memo[k];
        if (k === 2) return 2;
        if (k <= 1) return 1;
        memo[k] = count(k - 1) + count(k - 2);
        return memo[k]
    }

    return count(n)
};

testCase(climbStairs(2), 2, true);
testCase(climbStairs(3), 3);
testCase(climbStairs(5), 8);
testCase(climbStairs(1), 1);
testCase(climbStairs(2), 2);
