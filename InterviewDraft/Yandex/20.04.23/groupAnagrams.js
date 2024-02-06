const testCase = require("../../../Helpers/testCase");

/**
 * Дан массив строк, необходимо сгруппировать анаграммы.
 * Слово X является анаграммой слова Y, если одно может быть получено из другого перестановкой букв.
 * В итоговом массиве каждый массив анаграмм должен быть отсортирован в лексикографическом порядке.
 * Все слова в исходном массиве состоят только из строчных латинских букв
 */
function groupAnagrams(strs) {
    const map = {};

    for (let i = 0; i < strs.length; i++) {
        const curr = strs[i].split('').sort().reverse().join('').toLowerCase();

        if (map[curr]) {
            map[curr].push(strs[i]);
        } else {
            map[curr] = [strs[i]];
        }
    }

    for(arr of Object.values(map)) {
        arr.sort()
    }

    return Object.values(map);
}

testCase(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]), [["ate", "eat", "tea"], ["nat", "tan"], ["bat"]], true, 'groupAnagrams');
testCase(groupAnagrams(["a"]), [["a"]]);
testCase(groupAnagrams([""]), [[""]]);
