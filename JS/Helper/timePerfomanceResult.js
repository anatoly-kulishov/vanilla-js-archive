const timePerformanceResult = (time) => {
	time = performance.now() - time;
	return time;
	// console.log();
}

module.exports = timePerformanceResult;