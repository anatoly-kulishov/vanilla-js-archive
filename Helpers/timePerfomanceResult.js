const timePerformanceResult = (time) => {
	time = performance.now() - time;
	return time;
}

module.exports = timePerformanceResult;