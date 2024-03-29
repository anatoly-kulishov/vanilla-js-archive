'use strict';

/**
 * Closure
 */
// Q: What is "closure"?
// A: It's the ability to simply jump to the context above and take on a variable, for example.

for (var i = 0; i < 5; i++) {
    setTimeout(() => {
        // Q: What would be the output and why?
        // A: Operator "var" have only functions scope
        console.log('[Closure]', i + i + '' + i)
    }, i * 10);
}

/**
 * Context
 */
const name = "Go to Bar";

const myObject = {
    getName: function () {
        var name = "Bar Foo";
        return this?.name;
    },
    name: "Foo Bar"
};

const getNameFunc = myObject.getName;

// Q: What is "strict mode" and how does it affect the result?
// A: Strict mode makes it easier to write "secure" JS, also changes previously accepted "bad syntax" into real errors.

// Q: What would be the output and why?
console.log('[Context]', myObject.getName()); // "Foo Bar"
console.log('[Context]', getNameFunc()); // Error if we use "use strict" otherwise will be just undefined

/**
 * Bind
 */
// Q: What is "bind"? How does it work?
// A: Bind - it's just a method which returns a new function that is called as a method on the object,
// setting its execution context (this) to the specified value.

function plus(x, y) {
    return x + y;
}

Function.prototype.fbind = function (context, ...args) {
    return (...rest) => {
        return this.call(context, ...args.concat(rest));
    }
}

const plus4 = plus.fbind(null, 4);
console.log("[Bind]", plus4(4)); // Should return 8

/**
 * Palindrome
 * O(log n) [Logarithmic]
 */
const isPalindrome = (x) => {
    let start = 0;
    let end = x.length - 1;

    while (start < end) {
        if (x[start].toLowerCase() !== x[end].toLowerCase()) {
            return false
        }

        start++;
        end--;
    }

    return true;
}

console.log("[Palindrome]", isPalindrome("level")); // Should return true
console.log("[Palindrome]", isPalindrome("leveL")); // Should return true

/**
 * Run-length encoding
 *
 * Given a string consisting of the letters A-Z:
 * "AABBBCCXYZ"
 * You need to write the RLE function, which will output a string like:
 * "A2B3C2XYZ"
 * (please see "InterviewDraft.spec.JS" for more examples)
 *
 * Explanation:
 * 1. if the symbol occurs 1 time, it remains unchanged
 * 2. if the symbol is repeated more than 1 time, the number of repetitions is added to it
 */
function rle(str) {
    const dictionary = {};
    let result = '';

    for (let char of str) {
        if (dictionary[char] === undefined) {
            dictionary[char] = 1;
        } else {
            dictionary[char] += 1;
        }
    }

    for (let key in dictionary) {
        const value = dictionary[key];

        if (value <= 1) {
            result += key;
        } else {
            result += key + value;
        }
    }

    return result;
}

console.log('[RLE]', rle('AABBBCCXYZ')); // Should return A2B3C2XYZ
