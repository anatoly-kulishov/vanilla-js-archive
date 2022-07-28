const testCase = (arg1, arg2, isStart = false, title = '', time) => {
	let isAnObject = false;

	if (isStart && title === '') {
		console.log(`\nTest Cases: (${time}ms)`);
	}

	if (isStart && title) {
		console.log(`\n${title}(${time ? time + 'ms' : ''})`);
	}

	if (typeof arg1 === 'object' && typeof arg2 === 'object') {
		isAnObject = true;
	}

	logStatus(arg1, arg2, isAnObject)
}

const logStatus = (arg1, arg2, isAnObject) => {
	let flag = arg1 === arg2;
	if(isAnObject) {
		flag = JSON.stringify(arg1) === JSON.stringify(arg2);
		console.log(`[ ${flag ? '✔' : `✘`} ]`, `(${JSON.stringify(arg1)})`, '~', `(${JSON.stringify(arg2)})`)
	} else {
		console.log(`[ ${flag ? '✔' : `✘`} ]`, `(${JSON.stringify(arg1)})`, '~', `(${JSON.stringify(arg2)})`)
	}
}

module.exports = testCase;