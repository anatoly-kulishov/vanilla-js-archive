const testCase = require("../../../Helpers/testCase");

const isAnagram = function (s, t) {
    if (s.length !== t.length) return false;

    return s.split('').sort().join('') === t.split('').sort().join('');
};

const isAnagram2 = function (s, t) {
    if (s.length !== t.length) return false;
    const count = {};

    for (let i = 0; i < s.length; i++) {
        if (!count[s[i]]) count[s[i]] = 0;
        if (!count[t[i]]) count[t[i]] = 0;
        count[s[i]]++;
        count[t[i]]--;
    }

    for (let chr in count) {
        if (count[chr] !== 0) return false;
    }

    return true;
};

testCase(isAnagram2('anagram', 'nagaram'), true, true);
testCase(isAnagram2('rat', 'car'), false);
