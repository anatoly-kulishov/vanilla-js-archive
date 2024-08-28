/**
 * Given two strings s and t, return true if t is an anagram of s, and false otherwise.
 * An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.
 */

const testCase = require("../../../../Helpers/testCase");

const anagram = (strA, strB) => {
	const aCharObj = buildCharObject(strA);
	const bCharObj = buildCharObject(strB);

	if(Object.keys(aCharObj).length !== Object.keys(bCharObj).length) {
		return false;
	}

	for(let char in aCharObj) {
		if(aCharObj[char] !== bCharObj[char]) {
			return false;
		}
	}

	return true;
}

const buildCharObject = (str) => {
	const charObj = {};
	str = str.toLowerCase().replace(/[^\w]/g);

	for (let char of str) {
		charObj[char] = charObj[char] + 1 | 1;
	}

	return charObj;
}

testCase(anagram('friend', 'Finder'), true, true);
testCase(anagram('anagram', 'nagaram'), true);
testCase(anagram('hello', 'buy'), false);
testCase(anagram('WoW', 'GTA'), false);
testCase(anagram('lol', 'lo'), false);
testCase(anagram('', ''), true);
