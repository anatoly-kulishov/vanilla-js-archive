const testCase = require('#shared/testCase');

function groupAnagrams(strs) {
	const map = {};

	for (const word of strs) {
		const key = word.toLowerCase().split('').sort().join('');

		if (!map[key]) {
			map[key] = [];
		}
		map[key].push(word);
	}

	return Object.values(map).map((group) => group.sort());
}

module.exports = { groupAnagrams };

testCase(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']), [['ate', 'eat', 'tea'], ['nat', 'tan'], ['bat']], true);
testCase(groupAnagrams(['a']), [['a']]);
testCase(groupAnagrams(['']), [['']]);
