const testCase = require("../../../Helpers/testCase");

/**
 * @return {number}
 */
const argumentsLength = function (args) {
    let count = 0;

    for (let i = 0; i < args.length; i++) {
        if (args[i] !== undefined) {
            count++;
        }
    }

    return count;
};

testCase(argumentsLength([5]), 1, true);
testCase(argumentsLength([{}, null, "3"]), 3);
testCase(argumentsLength([53, 535, 3, 214, 24, 25, 6, 2, [3, 2]]), 9);
