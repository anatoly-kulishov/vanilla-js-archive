/**
 * REQUIREMENTS:
 *  1. Always deliver the lowest number of possible notes;
 *  2. It's possible to get the amount requested with available notes;
 *  3. The client balance is infinite;
 *  4. Amount of notes is infinite;
 *  5. Available notes 100, 50, 20 10
 */

const testCase = require("../../../../Helpers/testCase");

function isWantToGet(amountRequired) {
	const availableNotes = [100, 50, 20, 10];
	const result = [];

	if (amountRequired > 0) {
		for (let note of availableNotes) {
			while (amountRequired - note >= 0) {
				amountRequired -= note;
				result.push(note);
			}
		}
	}

	return result;
}

testCase(isWantToGet(365), [100, 100, 100, 50, 10], true);
testCase(isWantToGet(160), [100, 50, 10]);
testCase(isWantToGet(0), []);
