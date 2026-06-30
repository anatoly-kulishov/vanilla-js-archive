const testCase = require('#shared/testCase');

function promiseAll(promises) {
	return new Promise((resolve, reject) => {
		if (promises.length === 0) {
			resolve([]);
			return;
		}

		const results = new Array(promises.length);
		let settled = 0;

		promises.forEach((promise, index) => {
			Promise.resolve(promise)
				.then((value) => {
					results[index] = value;
					settled += 1;
					if (settled === promises.length) {
						resolve(results);
					}
				})
				.catch(reject);
		});
	});
}

module.exports = { promiseAll };

promiseAll([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]).then((result) => {
	testCase(result, [1, 2, 3], true);
});
