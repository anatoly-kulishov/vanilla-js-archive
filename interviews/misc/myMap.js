function myMap(arr, mapCallback) {
	if (!Array.isArray(arr) || !arr.length || typeof mapCallback !== 'function') {
		return []
	} else {
		let result = []
		for (let i = 0, len = arr.length; i < len; i++) {
			result.push(mapCallback(arr[i], i, arr))
		}
		return result
	}
}

Array.prototype.myMap = function (callback) {
	const arr = [];
	for (let i = 0; i < this.length; i++) {
		arr.push(callback(this[i], i, this));
	}
	return arr;
};

console.log(myMap([1, 2, 3], (el) => el + 10)); // [ 11, 12, 13 ]
console.log([1, 2, 3].myMap((el) => el + 10)); // [ 11, 12, 13 ]