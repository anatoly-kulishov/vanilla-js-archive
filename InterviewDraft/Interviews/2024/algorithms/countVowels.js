/**
 * Важно отметить, что регулярное выражение [aeiouаеёиоуыюя] указано с флагами gi,
 * чтобы учесть гласные буквы в разных регистрах (заглавных и строчных).
 */
function countVowels(str) {
    const vowelsRegex = /[aeiouаеёиоуыюя]/gi; // Регулярное выражение для поиска гласных (буквы могут быть в разных регистрах)
    const matches = str.match(vowelsRegex);
    return matches ? matches.length : 0;
}

const text = "привет";
const vowelCount = countVowels(text);
console.log(vowelCount); // Output: 2

/** **************************************************************************************************************** **/
/**
 Второе решение использует метод includes(), чтобы проверить,
 содержится ли символ в строке с гласными буквами vowels.
 */
function countVowels2(str) {
    const vowels = "aeiouаеёиоуыюя"; // Гласные буквы
    let count = 0;

    for (let char of str.toLowerCase()) {
        if (vowels.includes(char)) {
            count++;
        }
    }

    return count;
}

const text2 = "здравствуйте";
const vowelCount2 = countVowels2(text2);

console.log(vowelCount2); // Output: 3
/** **************************************************************************************************************** **/
const countVowels3 = (str) => str.match(/[aeiouаеёиоуыюя]/gi).length;

const text3 = "много_гласное_слово";
const vowelCount3 = countVowels3(text3);

console.log(vowelCount3); // Output: 7
