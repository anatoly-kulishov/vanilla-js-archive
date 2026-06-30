// Canonical: problems/debounce/solution.js
const debounce = (callback, delay) => {
    let timeoutId

    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            timeoutId = null
            callback(...args)
        }, delay)
    }
}
