const testCase = require("../../../Helper/testCase");
const timePerformanceStart = require("../../../Helper/timePerfomanceStart");
const timePerformanceResult = require("../../../Helper/timePerfomanceResult");

const time = timePerformanceStart();

const classNames = [
	'header', 'menu', 'menu-item', 'menu-item', 'menu-item', 'footer', 'menu', 'link', 'link', 'link', 'link'
];

const correctAnswer = ['link', 'menu-item', 'menu', 'header', 'footer'];

const filterClassNames = (classNames) => {
	const classNamesCount = {};
	const arrayUniq = [];

	for (let i = 0; i < classNames.length; i++) {
		const current = classNames[i];
		if (classNamesCount[current]) {
			classNamesCount[current] += 1;
		} else {
			classNamesCount[current] = 1;
			arrayUniq.push(current);
		}
	}

	return arrayUniq.sort((a, b) => classNamesCount[b] - classNamesCount[a]);
};

testCase(filterClassNames(classNames), correctAnswer, true, 'filterClassNames', timePerformanceResult(time));


