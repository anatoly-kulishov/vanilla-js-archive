const testCase = require("../../../../Helpers/testCase");

function isLetter(str) {
    return /^[a-zA-ZА-Яа-я]+$/.test(str)
}

function reverseOnlyLetters(str) {
    let result = str.split("");

    let left = 0;
    let right = result.length - 1;

    while (left < right) {
        while (left < right && !isLetter(result[left])) {
            left++;
        }
        while (left < right && !isLetter(result[right])) {
            right--;
        }

        if (left < right) {
            let temp = result[left];

            result[left] = result[right];
            result[right] = temp;

            left++;
            right--;
        }
    }

    return result.join("");
}

testCase(reverseOnlyLetters('a-bc'), "c-ba", true);
testCase(reverseOnlyLetters('a-bC-dEf-ghIj'), "j-Ih-gfE-dCba");
testCase(reverseOnlyLetters('Test1ng-Leet=code-Q!'), "Qedo1ct-eeLg=ntse-T!");
