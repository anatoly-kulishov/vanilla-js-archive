[1, 2, 3].map(el => el * 2); // [ 2, 4, 6 ]
[1, 2, 3].filter(el => el % 2 === 0); // [ 2 ]
[1, 2, 3].reduce((previousValue, currentValue) => {
	return currentValue + previousValue
}, 0); // 6

[0, 0, 0].every(el => el === 0);
[1, 2, 3].every(el => el === 1);
[1, 2, 3].some(el => el === 1);
[1, 2, 3].some(el => el === 0);

[1, 2, 3, 4, 3, 6, 3].find((el, index) => el === 3); // 3
[1, 2, 3, 4, 3, 6, 3].findIndex((el, index) => el === 3); // 2

Array(5).fill(0); // [ 0, 0, 0, 0, 0 ]
[0, 0, 0, 0, 0].fill(1, 0, 3); // [ 1, 1, 1, 0, 0 ]
[1, 2, 3, 4, 5, 6].copyWithin(0, 3); // [ 4, 5, 6, 4, 5, 6 ]
[0, 1, 2, 3, 4, 5].copyWithin(0, 3, 4); // [ 3, 1, 2, 3, 4, 5 ]