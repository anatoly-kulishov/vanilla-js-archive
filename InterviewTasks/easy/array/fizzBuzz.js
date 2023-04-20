const testCase = require("../../../Helpers/testCase");

/**
 * @param {number} n
 * @return {string[]}
 */
const fizzBuzz = (n) => {
    const result = [];

    for (let i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) result.push("FizzBuzz");
        else if (i % 3 === 0 && i % 5 !== 0) result.push("Fizz");
        else if (i % 5 === 0 && i % 3 !== 0) result.push("Buzz");
        else result.push(String(i));
    }

    return result;
}

testCase(fizzBuzz(3), ["1", "2", "Fizz"], true);
testCase(fizzBuzz(5), ["1", "2", "Fizz", "4", "Buzz"]);
testCase(fizzBuzz(15), ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"]);
