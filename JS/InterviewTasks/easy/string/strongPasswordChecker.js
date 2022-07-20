/**
 * /**
 *  * A password is said to be strong if it satisfies all the following criteria:
 *  *
 *  * It has at least 8 characters.
 *  * It contains at least one lowercase letter.
 *  * It contains at least one uppercase letter.
 *  * It contains at least one digit.
 *  * It contains at least one special character. The special characters are the characters in the following string: "!@#$%^&*()-+".
 *  * It does not contain 2 of the same character in adjacent positions (i.e., "aab" violates this condition, but "aba" does not).
 *  * Given a string password, return true if it is a strong password. Otherwise, return false.
 *  *
 *  * Constraints:
 *  * 1 <= password.length <= 100
 *  * password consists of letters, digits, and special characters: "!@#$%^&*()-+".
 *  */

const testCase = require("../../../Helper/testCase");

/**
 * @param {string} password
 * @return {boolean}
 */

const strongPasswordChecker = (password) => {
    const specialCharacters = "\"!@#$%^&*()-+\"";
    const n = password.length;

    // Rules
    const isNotOneSymbol = /[a-z]/i.test(password);
    const minCharacters = n < 8;
    const rules = {
        oneUpperCase: false,
        oneLowerCase: false,
        oneDigit: false,
        oneSpecialCharacter: false,
        repeatingCharacterInAdjacentPositions: true
    }

    // Checks
    if (!isNotOneSymbol) return false;
    if (minCharacters) return false;

    for (let i = 0; i < n; i++) {
        const currentChar = password[i];
        const nextChar = password[i + 1];
        const itIsLetter = /[a-z]/i.test(currentChar);

        if (itIsLetter && currentChar === currentChar.toUpperCase()) rules.oneUpperCase = true;
        if (itIsLetter && currentChar === currentChar.toLowerCase()) rules.oneLowerCase = true;
        if (!isNaN(+currentChar)) rules.oneDigit = true;
        if (specialCharacters.includes(currentChar)) rules.oneSpecialCharacter = true;
        if (currentChar === nextChar) rules.repeatingCharacterInAdjacentPositions = false;
    }

    for (let key in rules) {
        const value = rules[key];
        if (!value) return false;
    }

    return true;
};

testCase(strongPasswordChecker('zd!&1w!rod7&x+6t(c+^hb2+dgp$@40by0#l#7^v960f%(h8e@aw39jz2ml&5h!)s0^$jfqmwx9'), false, true);
testCase(strongPasswordChecker('&3@396+&532#1)5^*^*56$269)(-54(3)7&)@1^)8)(@*@23#-%3189)45+6&8%0756!6+!+6'), false);
testCase(strongPasswordChecker('IloveLe3tcode!'), true);
testCase(strongPasswordChecker('Me+You--IsMyDream'), false);
testCase(strongPasswordChecker('0Aa!a!a!'), true);
testCase(strongPasswordChecker('11A!A!Aa'), false);
testCase(strongPasswordChecker('1aB!'), false);
