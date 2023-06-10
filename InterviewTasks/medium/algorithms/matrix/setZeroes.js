/**
 * Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's.
 * You must do it in place.
 *
 * m == matrix.length
 * n == matrix[0].length
 * 1 <= m, n <= 200
 * -231 <= matrix[i][j] <= 231 - 1
 */
const testCase = require("../../../../Helpers/testCase");

/**
 * @param matrix
 * @returns {*}
 */
const setZeroes = function (matrix) {
	let ROWS = matrix.length;
	let COLS = matrix[0].length;
	let isCol = false;

	for (let i = 0; i < ROWS; i++) {
		if (matrix[i][0] === 0) {
			isCol = true;
		}
		for (let j = 1; j < COLS; j++) {
			if (matrix[i][j] === 0) {
				matrix[i][0] = 0;
				matrix[0][j] = 0;
			}
		}
	}

	for (let i = 1; i < ROWS; i++) {
		for (let j = 1; j < COLS; j++) {
			if (matrix[i][0] === 0 || matrix[0][j] === 0) {
				matrix[i][j] = 0;
			}
		}
	}

	if (matrix[0][0] === 0) {
		for(let j = 0; j < COLS; j++) {
			matrix[0][j] = 0;
		}
	}

	if (isCol) {
		for(let i = 0; i < ROWS; i++) {
			matrix[i][0] = 0;
		}
	}

	return matrix;
};

testCase(setZeroes([[1, 1, 1], [1, 0, 1], [1, 1, 1]]), [[1, 0, 1], [0, 0, 0], [1, 0, 1]], true, 'setZeroes');
testCase(setZeroes([[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]), [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]]);
