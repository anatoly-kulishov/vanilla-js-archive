const testCase = require("../../../../Helpers/testCase");

const isLetter = (char) => {
    return char.toLowerCase() !== char.toUpperCase()
}

const findAnagram = (str) => {
    let startIndex = 0;
    let endIndex = str.length - 1;

    while (startIndex < endIndex) {
        const startChar = str[startIndex]
        const endChar = str[endIndex]

        if(!isLetter(startChar)) {
            startIndex += 1;
            continue;
        }

        if(!isLetter(endChar)) {
            endIndex -= 1;
            continue;
        }

        if (startChar.toLowerCase() !== endChar.toLowerCase()) {
            return false
        }

        startIndex++;
        endIndex--;
    }

    return true;
}

testCase(findAnagram("Казак"), true, true)
testCase(findAnagram("А роза упала на лапу Азора"), true)
testCase(findAnagram("Do geese see God?"), true)
testCase(findAnagram("Madam, I'm Adam"), true)
testCase(findAnagram("not_anagram"), false)
