/**
 * Given two strings s and t, return true if t is an anagram of s, and false otherwise.
 * An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.
 */

const testCase = require("../../../../Helpers/testCase");

const anagram = (strA, strB) => {
	if(strA.length !== strB.length) {
		return false;
	}

	const aCharObj = buildCharObject(strA);
	const bCharObj = buildCharObject(strB);

	for(let char in aCharObj) {
		if(aCharObj[char] !== bCharObj[char]) {
			return false;
		}
	}

	return true;
}

const buildCharObject = (str) => {
	const charObj = {};
	str = str.toLowerCase();

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
